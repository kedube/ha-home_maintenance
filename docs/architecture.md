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

`update_task` applies only fields in `ALLOWED_UPDATE_FIELDS` — managed fields (`id`, `current_count`, `runtime_baseline`) cannot be set through the API. Switching a task's `trigger_type` re-runs the new trigger's `initialize` (counter reset / baseline capture).

`serialize(task)` extends the raw task dict with computed trigger state — `due`, `next_due`, `progress_current`, `progress_target` — which is what the websocket API returns. The panel renders these values and never reimplements trigger semantics.

### `triggers.py` — trigger strategies

All per-trigger-type behavior lives here, one strategy class per type (`time`, `count`, `runtime`), sharing a uniform interface:

| Method | Responsibility |
| --- | --- |
| `is_due` / `next_due` / `progress` | when the task is due and how close it is |
| `initialize` | state setup on create or trigger-type switch |
| `on_complete` | effects of completing (reset counter, re-baseline) |
| `watched_entity` | which entity the trigger monitors, if any |
| `extra_attributes` | trigger-specific entity attributes |

The store, entities, and websocket serialization all call through `get_trigger(trigger_type)` — changing trigger semantics is a one-file edit.

### `binary_sensor.py` — push entities

Entities are thin views over the store's task objects (`_attr_should_poll = False`). They subscribe to `SIGNAL_TASK_UPDATED` and rewrite their state when their task changes. Time-based tasks additionally schedule an `async_track_point_in_time` callback at their due moment so the state flips exactly on time rather than on a poll. The platform (not the store) listens for `SIGNAL_TASK_ADDED`/`_REMOVED` to create entities and clean up the entity registry.

### `__init__.py` — setup, watchers, services

`async_setup_entry` builds a typed `HomeMaintenanceData` dataclass (store, device id, watcher unsubscribes) stored on `entry.runtime_data` and mirrored at `hass.data[DOMAIN]` for non-entry-scoped consumers (websocket handlers, panel).

Count/runtime tasks are served by **targeted** state listeners: `async_track_state_change_event` subscribed to exactly the watched entity ids, rebuilt (via `SIGNAL_TASKS_CHANGED`) only when the watched set actually changes. The count watcher increments on `off → on` transitions; the runtime watcher persists a baseline reset when the sensor's value drops below the recorded baseline, and otherwise pushes a `SIGNAL_TASK_UPDATED` so entity and panel refresh.

Services (`reset_last_performed`, `increment_count`, `reset_count`) resolve the target task id through the entity registry and delegate to the store.

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

## Frontend (`panel/`)

A Lit + TypeScript app bundled with esbuild into the committed `dist/main.js` (served by `panel.py` as a sidebar panel).

- `src/main.ts` — orchestrator: loads data (in parallel), subscribes to `subscribe_updates` with a short debounce so **any** change — panel action, NFC scan, service call, automation — refreshes the UI live, and wires the components together.
- `src/components/task-table.ts` — the task list; renders backend-computed `due`/`next_due`/`progress` values, memoizes rows/columns so `ha-data-table` gets stable references across the frequent `hass` re-renders. Emits `task-complete` / `task-menu-action`.
- `src/components/task-form.ts` — the Add New Task card.
- `src/components/edit-dialog.ts` — the edit dialog (open via `open(taskId)`).
- `src/components/hm-task-menu.ts` — the per-row actions dropdown (HA 2026.3 `ha-dropdown` based).
- `src/schema.ts` — the single home for form schemas, validation, and websocket payload construction, shared by add and edit.
- `src/data/websockets.ts` — typed websocket calls.
- `localize/` — translations (English and German), bundled at build time.

Dependencies are exact-pinned with a committed `package-lock.json`; CI builds with `npm ci` and fails if the committed bundle drifts from the sources.

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
