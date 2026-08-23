# Architecture

How the integration is put together, for contributors. User-facing documentation lives in the [README](../README.md).

## Overview

The backend is organized around a single source of truth with event-driven consumers:

```
                        ┌─────────────────────┐
  websocket API ──────▶ │      TaskStore      │ ──▶ HA storage (delayed save)
  HA services ────────▶ │  (single source of  │
  NFC tag scans ──────▶ │    truth for tasks)  │
  state watchers ─────▶ └──────────┬──────────┘
                                   │ dispatcher signals
             ┌─────────────────────┼─────────────────────┐
             ▼                     ▼                     ▼
     binary_sensor           state watchers         panel subscription
     entities (push)         (rebuild watch list)   (live UI updates)
```

Nothing holds a copy of task data. Entities and the panel read from the store (directly or via the serialized API) and react to its signals.

## Backend modules

### `store.py` — TaskStore

Owns the `HomeMaintenanceTask` attrs objects, persists them with HA's `Store` helper using `async_delay_save` (writes coalesce over ~1s), and announces every mutation via dispatcher signals:

| Signal | Payload | Fired on |
| --- | --- | --- |
| `SIGNAL_TASK_ADDED` | `(task, labels)` | task created |
| `SIGNAL_TASK_UPDATED` | `(task_id,)` | any change to one task |
| `SIGNAL_TASK_REMOVED` | `(task_id,)` | task deleted |
| `SIGNAL_TASKS_CHANGED` | — | catch-all, after any of the above |

`update_task` applies only fields in `ALLOWED_UPDATE_FIELDS` — managed fields (`id`, `current_count`, `runtime_baseline`, `history`) cannot be set through the API. (`labels` is deliberately not in the whitelist: labels live in the entity registry, and `update_task` applies them there instead.) Both `add` and `update_task` run the trigger's `validate` before mutating anything, so no write path can produce a task whose trigger can never fire (e.g. a count task without an entity). Switching a task's `trigger_type` re-runs the new trigger's `initialize` (counter reset / baseline capture). `rename_group` refuses to rename onto an existing group rather than silently merging the two. Storage loads tolerate data written by other versions: unknown task fields are dropped, missing ones fall back to the attrs defaults, and a migrate hook accepts old major/minor layouts. Failures raise `RuntimeError`, which the websocket layer maps to clean API errors.

`serialize(task)` extends the raw task dict with computed trigger state — `due`, `next_due`, `progress_current`, `progress_target` — which is what the websocket API returns. The panel renders these values and never reimplements trigger semantics.

Every completion path funnels through `_apply_completion`, which also appends a capped completion-history entry (`performed`, `recorded_at`, optional `note`) and is followed by a `home_maintenance_task_completed` bus event; `binary_sensor.py` fires `home_maintenance_task_due` when an entity's state flips to due.

### `triggers.py` — trigger strategies

All per-trigger-type behavior lives here, one strategy class per type (`time`, `date`, `count`, `runtime`), sharing a uniform interface:

| Method | Responsibility |
| --- | --- |
| `is_due` / `next_due` / `progress` | when the task is due and how close it is |
| `upcoming` | future due-date projection (used by the calendar) |
| `validate` | required trigger fields, enforced by the store on add and update |
| `initialize` | state setup on create or trigger-type switch |
| `on_complete` | effects of completing (reset counter, re-baseline) |
| `watched_entity` | which entity the trigger monitors, if any |
| `extra_attributes` | trigger-specific entity attributes |

The `date` trigger anchors occurrences to `anchor_date + k * interval` and never shifts them: `next_due` is the first occurrence strictly after the last completion, located analytically (not by looping day by day) so a daily anchor set years ago stays O(1)-ish.

Day-boundary math (a task is due on a calendar day, not at an instant) goes through `dt_util.start_of_local_day` everywhere — store, triggers, and the websocket layer share the same flooring.

The store, entities, and websocket serialization all call through `get_trigger(trigger_type)` — changing trigger semantics is a one-file edit.

### `binary_sensor.py` — push entities

Entities are thin views over the store's task objects (`_attr_should_poll = False`). They subscribe to `SIGNAL_TASK_UPDATED` and rewrite their state when their task changes. Time-based tasks additionally schedule an `async_track_point_in_time` callback at their due moment so the state flips exactly on time rather than on a poll. The platform (not the store) listens for `SIGNAL_TASK_ADDED`/`_REMOVED` to create entities and clean up the entity registry.

### `__init__.py` — setup, watchers, services

`async_setup_entry` builds a typed `HomeMaintenanceData` dataclass (store, device id, watcher unsubscribes) stored on `entry.runtime_data` and mirrored at `hass.data[DOMAIN]` for non-entry-scoped consumers (websocket handlers, panel).

Count/runtime tasks are served by **targeted** state listeners: `async_track_state_change_event` subscribed to exactly the entity ids the triggers report via `watched_entity`, rebuilt (via `SIGNAL_TASKS_CHANGED`) only when the watched set actually changes. The count watcher increments on `off → on` transitions; the runtime watcher persists a baseline reset when the sensor's value drops below the recorded baseline, and pushes a `SIGNAL_TASK_UPDATED` only when the change is worth announcing — a due-state flip or a whole-unit progress change — so a sensor ticking every few seconds doesn't rewrite entity state and reload every open panel on each tick.

Services (`reset_last_performed`, `increment_count`, `reset_count`, `snooze_task`, `send_task_notification`) resolve the target task id through the entity registry and delegate to the store; they are deregistered again when the entry unloads.

### Other backend modules

- `calendar.py` — one calendar entity; per dated task it renders the trigger's `upcoming` projection (next due date + recurrences up to a one-year horizon, capped per task), cached until a task change invalidates it. The first event keeps the task id as uid; projections get per-date uids.
- `todo.py` — one todo list entity mirroring the store (due → `needs_action`); checking an item off completes through the store, summary/description edits map to `update_task`, and reopening is rejected because due state is computed, not stored.
- `repairs.py` — keeps Repairs issues in sync for missing watched entities and missing notify services; re-checks on task changes, HA start, notify service (de)registration, and the flagged entities' first state.
- `diagnostics.py` — config entry diagnostics with free-text fields (descriptions, notes, URLs, tag ids) redacted.
- `notifications.py` — the per-task notification manager (send-time gates, once-per-day bookkeeping, mobile action handling).

### `websocket.py` — API

| Command | Purpose |
| --- | --- |
| `home_maintenance/get_tasks` / `get_task` | serialized tasks including computed trigger state |
| `home_maintenance/add_task` | create (validates trigger-specific required fields server-side) |
| `home_maintenance/update_task` | update via a whitelisted `updates` schema |
| `home_maintenance/complete_task` | mark complete (applies trigger `on_complete`) |
| `home_maintenance/remove_task` | delete |
| `home_maintenance/increment_count` / `reset_count` | counter management |
| `home_maintenance/subscribe_updates` | push channel — an event per `SIGNAL_TASKS_CHANGED` |
| `home_maintenance/get_config` | config entry data/options plus the integration version |

Every store-touching handler is wrapped by a decorator that maps `RuntimeError` (missing task, group collision, invalid trigger fields, integration not loaded) to an `invalid_input` websocket error instead of an unhandled exception.

## Frontend (`panel/`)

A Lit + TypeScript app bundled with esbuild into three committed bundles under `dist/`: `main.js` (the sidebar panel) plus `todo-card.js` and `add-task-card.js` (Lovelace cards, injected on every dashboard via `add_extra_js_url`). `panel.py` serves them from a static path with long-lived cache headers; the URLs carry a `?v=<VERSION>` query string, so every release is a fresh URL and browsers never reuse a stale bundle after an upgrade.

- `src/main.ts` — orchestrator: subscribes to `subscribe_updates` with a short debounce so **any** change — panel action, NFC scan, service call, automation — refreshes the UI live, and wires the components together. Static data (HA components, tags, config) loads once; the push path refetches only what mutations can change (tasks, groups, registries). Task removal and completion confirm through the shared confirm dialog; feedback surfaces as toasts.
- `src/components/task-table.ts` — the task list; renders backend-computed `due`/`next_due`/`progress` values, memoizes rows/columns so `ha-data-table` gets stable references across the frequent `hass` re-renders. Emits `task-complete` / `task-menu-action`.
- `src/components/task-form.ts` — the Add New Task card, rendered through the shared task-field renderer in a responsive grid (all main fields on one line on a wide card).
- `src/components/edit-dialog.ts` — the edit dialog (open via `open(taskId)`); same shared field rendering as the add form.
- `src/components/task-fields.ts` — the shared field renderer: every field is a bare `ha-selector` with a uniform label above the input, so inputs line up regardless of whether a selector draws its own label inside or above the input.
- `src/components/group-manager.ts` — the Groups card (create, rename, delete — deletion confirmed via the shared dialog).
- `src/components/confirm-dialog.ts` — generic `ha-dialog` confirmation used for every destructive or consequential action (removal, group deletion, completion).
- `src/components/move-dialog.ts` — the move-to-group dialog.
- `src/components/hm-task-menu.ts` — the per-row actions dropdown (HA 2026.3 `ha-dropdown` based).
- `src/toast.ts` — `hass-notification` helper. All user feedback goes through toasts and dialogs — never browser-native `alert()`/`confirm()`, which look foreign and can be silently suppressed by the companion apps.
- `src/util.ts` — shared helpers: TZ-safe parsing of the backend's stored dates (`parseStoredDate` — `new Date(iso)` would shift local midnights through the browser timezone), localized interval/progress labels, the reload `Debouncer`, and `dialogFooter`, which renders dialog buttons through `ha-dialog-footer` on newer HA and falls back to direct action slots on older HA (used by every dialog).
- `src/schema.ts` — the single home for form field definitions, validation, and websocket payload construction, shared by the add form and edit dialog.
- `src/todo-card.ts` / `src/add-task-card.ts` — the Lovelace cards; their config editors are schema-driven `ha-form`, and `add-task-card` reuses `hm-task-form` wholesale.
- `src/data/websockets.ts` — typed websocket calls.
- `localize/` — translations (English and German), bundled at build time.

Dependencies are exact-pinned with a committed `package-lock.json`; CI builds with `npm ci` and fails if the committed bundles drift from the sources.

### Component compatibility

Home Assistant is deleting its legacy (Material Web Components era) elements release by release — `mwc-button`/`ha-md-menu` went in 2026.3 (#122), `ha-textfield` after that — and each removal silently blanks whatever still renders one. The panel therefore builds exclusively on current components (`ha-selector`, `ha-form`, `ha-button`, `ha-dialog`, `ha-dropdown`), and CI greps the sources for banned legacy elements (`mwc-*`, `ha-textfield`, `ha-formfield`, `ha-md-*`, `paper-*`) so they cannot creep back. The browser smoke test (below) exists to catch the next removal before users do.

## Versioning and releases

The version lives in `const.py` (`VERSION`) and `manifest.json`, kept in lockstep by `.github/scripts/bump_version.py`. On every green CI run on `main`, the Release workflow bumps the patch version, rotates `CHANGELOG.md`'s `Unreleased` section into a versioned section, commits `chore(release): vX.Y.Z [skip ci]`, generates release notes (changelog highlights + commit list + compare link), tags `vX.Y.Z`, and attaches the HACS zip. Minor/major bumps and re-releases run from the workflow's manual dispatch. The panel shows the version reported by `get_config` — there is no frontend copy to keep in sync.

## Tests

`tests/` runs on `pytest-homeassistant-custom-component` (see `requirements_test.txt`) with an enforced coverage gate (see `pytest.ini`), on Python 3.13 and 3.14 in CI:

- `test_triggers.py` — trigger semantics, including runtime external-reset handling
- `test_store.py` — persistence round-trip, update whitelist, completion effects, delayed-save flush
- `test_binary_sensor.py` — push updates and the due-moment timer (time travel via `freezer` + `async_fire_time_changed`)
- `test_websocket.py` — the full API surface, including the subscription push
- `test_init.py` — setup, watchers, services, entity lifecycle
- `test_config_flow.py` — config and options flows
- `test_release_scripts.py` — the release automation scripts

The panel registration is stubbed in the `setup_entry` fixture (`tests/conftest.py`) so backend tests don't need the HTTP stack; `home-assistant-frontend` is still installed because the manifest's `panel_custom` dependency makes HA import it during setup. A weekly non-blocking CI job (`ha-next`) reruns the suite against the newest Home Assistant pre-release as an early warning for upstream breaking changes.

### Browser smoke test

pytest cannot see the class of breakage where Home Assistant removes a frontend component and part of the panel silently stops rendering. `scripts/e2e_smoke.py` covers that gap and runs as a blocking CI job: it boots a throwaway Home Assistant with a minimal config (`frontend:` + `config:` — deliberately not `default_config`, which would pip-install dozens of integration requirements on a cold environment), completes onboarding through the REST API, then drives the real UI with headless chromium — logs in, asserts every form input renders, adds a task, and creates a group. `--install-deps` resolves the packages the HA frontend needs on a bare `pip install homeassistant` by walking the installed HA's own component manifests, so the pins are always correct for the HA version under test (including the pre-releases the `ha-next` job feeds it). Only real JavaScript errors (`TypeError`, `ReferenceError`, …) and failed assertions fail the run; HA-core promise-rejection noise is printed as warnings. On failure the job log includes the Home Assistant output tail, and the panel screenshot is uploaded as a run artifact either way.
