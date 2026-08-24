# Home Maintenance Tracker for Home Assistant

A custom Home Assistant integration for tracking recurring home maintenance tasks — changing air filters, cleaning gutters, testing smoke alarms — directly inside Home Assistant. Each task gets its own entity that turns on when the task is due, a built-in sidebar panel (with task groups) manages everything, a bundled Lovelace card surfaces due tasks on any dashboard, and a native todo list entity makes the tasks available to the built-in todo card, the companion apps, and voice assistants. Tasks can recur on a schedule, on fixed calendar dates, after a number of uses, or once a monitored sensor accumulates enough runtime, and every completion is recorded in a per-task history.

Originally created by [@TJPoorman](https://github.com/TJPoorman/home_maintenance); this fork adds count- and runtime-based triggers, area support, task groups, task descriptions, a dashboard card, Home Assistant 2026.3 compatibility, and automated releases — incorporating contributions from [@Seidlm](https://github.com/Seidlm), [@select-star-from](https://github.com/select-star-from), and [@csteamengine](https://github.com/csteamengine).

[![CI](https://github.com/kedube/ha-home_maintenance/actions/workflows/ci.yml/badge.svg)](https://github.com/kedube/ha-home_maintenance/actions/workflows/ci.yml)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)

## Contents

- [Installation](#installation)
- [Configuration](#configuration)
  - [Options](#options)
- [Using the Panel](#using-the-panel)
  - [Trigger types](#trigger-types)
  - [Optional task fields](#optional-task-fields)
  - [Task groups](#task-groups)
  - [Search and label filtering](#search-and-label-filtering)
  - [Template library and CSV import/export](#template-library-and-csv-importexport)
  - [NFC tags](#nfc-tags)
- [Dashboard card](#dashboard-card)
- [Entities](#entities)
- [Services](#services)
- [Events](#events)
- [Automation ideas](#automation-ideas)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Project scope](#project-scope)
- [Development](#development)
- [Need help?](#need-help)
- [License](#license)

## Installation

> Requires Home Assistant **2026.3.2** or newer.

### Method 1: HACS custom repository

1. In Home Assistant, open **HACS**.
2. Open the menu in the top-right corner (**⋮**) and select **Custom repositories**.
3. Paste this repository's URL: `https://github.com/kedube/ha-home_maintenance`
4. Set the category to **Integration** and click **Add**.
5. Search for **Home Maintenance** in HACS, open it, and click **Download**.
6. Restart Home Assistant.

After restart, add the integration from Home Assistant:

[![Open your Home Assistant instance and start setting up a new Home Maintenance integration instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_maintenance)

### Method 2: Manual installation

1. Download `home_maintenance.zip` from the [latest release](https://github.com/kedube/ha-home_maintenance/releases) and extract it into `config/custom_components/home_maintenance`.
2. Restart Home Assistant.
3. Add the integration from **Settings → Devices & Services → Add Integration**, searching for **Home Maintenance** — or use the badge above.

Once added, the **Home Maintenance** panel appears in the sidebar.

## Configuration

Setup asks for two options; both can be changed later without removing the integration:

- **Admin only** — restrict the sidebar panel to admin users (default: **on**). Non-admin users don't see the panel, but task entities remain visible to everyone.
- **Sidebar title** — the name shown for the panel in the sidebar (default: *Home Maintenance*).

A third option is available from the **Configure** dialog after setup:

- **Completion-history entries kept per task** — how many [completion history](#completion-history) entries each task retains (default 50; `0` keeps them all).

Only a **single instance** of the integration can be added — all tasks live under that one entry.

### Options

To change these settings after setup:

1. Go to **Settings → Devices & Services**.
2. On the **Integrations** tab, find the **Home Maintenance** card (or click the badge below to jump straight there).
3. Click **Configure** on the Home Maintenance entry, adjust the options, and click **Submit**.

[![Open your Home Assistant instance and show the Home Maintenance integration.](https://my.home-assistant.io/badges/integration.svg)](https://my.home-assistant.io/redirect/integration/?domain=home_maintenance)

Submitting reloads the integration automatically, so changes — including a new sidebar title — take effect without restarting Home Assistant.

> 💡 **Configure vs. Add.** Use **Configure** (the button on the *existing* entry) to change these options. The **Add integration** flow is only for the initial setup — a second entry can't be added.

## Using the Panel

Open **Home Maintenance** from the sidebar. The panel stacks three cards in a single column:

- **Create New Task** — the main fields (title, trigger type, the trigger's two fields) and the **Add Task** button sit on one line; everything else — including **Last performed**, which defaults to today when left blank — lives behind the collapsed **Optional settings** row. On narrow screens the fields wrap automatically.
- **Current Tasks** — every task with its interval, last-performed date, and next due date (overdue dates highlighted), one section per [group](#task-groups). A toolbar above the table offers [search and label filtering](#search-and-label-filtering) plus the [template library and CSV import/export](#template-library-and-csv-importexport). Each row has a ✓ button to mark the task complete (after a confirmation, since completing resets the schedule or counter) and a menu for editing (including the title), moving the task to a group, or deleting it.
- **Groups** — create, rename, and delete [task groups](#task-groups).

Actions confirm with toast notifications, destructive actions ask first in a dialog, and the panel updates live: changes made outside it — an NFC tag scan, a service call, an automation incrementing a counter, a runtime sensor ticking over — appear immediately without a refresh.

### Trigger types

Every task has a trigger type that controls when it becomes due:

| Trigger | Due when… | Completing the task… |
| --- | --- | --- |
| **Time-based** (default) | the interval (days, weeks, months, or years) since the last-performed date has elapsed | resets the last-performed date |
| **Fixed date** | a fixed calendar date arrives: an anchor date plus interval repetitions (e.g. every year on October 1) | rolls to the next anchored date |
| **Count-based** | a monitored entity has turned on a threshold number of times | resets the counter to zero |
| **Runtime-based** | a numeric sensor has accumulated a threshold amount since the last completion (e.g. hours of runtime, liters of consumption) | records the sensor's current value as the new baseline |

- **Fixed-date** tasks are for seasonal work: pick an **anchor date** and a repeat interval, and the due dates stay anchored to the calendar — "winterize the sprinklers every year on October 1" stays October 1 no matter when you actually completed it last. A missed date stays due until you complete the task, after which the next anchored date takes over. (Completing *before* an anchor date does not skip it — the schedule never shifts.) When you create a fixed-date task and leave **Last performed** blank, the anchor date itself counts as pending, so a past anchor is due immediately; set **Last performed** explicitly if you already did the work this cycle.
- **Time-based** tasks can be made **seasonal** by picking **active months** (e.g. April–October for lawn care): a due date that would land out of season moves to the first day of the next active month, and the task is never flagged due outside its months — an occurrence left uncompleted when the season ends resurfaces when the next season starts, instead of nagging all winter.
- **Count-based** tasks watch an entity you pick and count each `off → on` transition — e.g. "descale the coffee machine every 60 brews" counting a power switch. The panel shows progress as `current / threshold`. The counter can also be adjusted by [service call](#services).
- **Runtime-based** tasks watch a numeric sensor and compare its growth against a threshold — e.g. "service the generator every 50 running hours" using a runtime counter sensor. If the source sensor is reset externally (its value drops below the recorded baseline), the baseline resets automatically so progress keeps making sense.

### Optional task fields

- **Last performed** — defaults to today when omitted.
- **Active months** — restricts a time-based task to a season (see [trigger types](#trigger-types)); empty means year-round.
- **Icon** — any Material Design icon (default `mdi:calendar-check`).
- **Labels** — Home Assistant labels applied to the task's entity.
- **NFC tag** — scanning the tag marks the task complete (see [NFC tags](#nfc-tags)).
- **Area** — assigns the task's entity to a Home Assistant area.
- **Description** — free-form notes, shown as an entity attribute.
- **Group** — organizes the task into a named [group](#task-groups); pick an existing group or type a new name to create one on the fly.

### Task groups

Tasks can be organized into named groups — *Kitchen*, *HVAC*, *Outdoors* — and the task table renders one section per group (with ungrouped tasks first). Groups are managed three ways:

- The **Groups** card in the panel creates, renames, and deletes groups. Renaming a group moves all its tasks along; deleting a group moves its tasks back to *Ungrouped* (the tasks themselves are never deleted).
- The **Group** field in the add/edit forms assigns a task to a group — typing a new name there creates the group implicitly.
- **Move to group** in a task's row menu quickly reassigns a single task.

### Notifications

Each task can send its own push notifications — enable them in the **Notifications** section of the add/edit forms:

- **Notify service** — any `notify.*` service (for example `notify.mobile_app_your_phone`); leave empty to use `notify.notify`.
- **Notify when** — send on *due*, *overdue*, or both. Count- and runtime-based tasks notify while due; time-based and fixed-date tasks distinguish the due day from overdue days.
- **Days before due** — optional early reminder for time-based and fixed-date tasks (e.g. 3 days ahead).
- **Time of day** — when the automatic notification is sent (default 09:00).
- **Open URL** — optional link attached to the notification's **Open** action (e.g. the appliance manual).

At most one notification per task and state is sent per day. Notifications sent to the Home Assistant mobile apps include **Mark complete** and **Snooze** action buttons — snoozing silences the task's notifications for a day (see [`home_maintenance.snooze_task`](#home_maintenancesnooze_task) for longer). Completing a task (by any means) dismisses its outstanding companion-app notification automatically. The edit dialog has a **Send test notification** button that fires the task's notification immediately using its last saved settings.

### Search and label filtering

The toolbar above the task table filters the list live:

- The **search box** matches task titles and descriptions (case-insensitive).
- **Label chips** appear for every Home Assistant label in use by a task. Click one or more to show tasks carrying *any* selected label (OR logic); click again to deselect, or use **Clear filters** to reset everything.

While a filter is active, groups with no matching tasks are hidden.

### Template library and CSV import/export

- **Browse templates** opens a searchable library of 90+ pre-built maintenance tasks — HVAC, plumbing, electrical, appliances, interior, exterior, yard, safety, and vehicles — each with a sensible interval and icon. Picking one prefills the add-task form so you can adjust anything (including translating the text) before saving. Template titles and descriptions are currently English-only; category names follow your language.
- **Import from CSV** (inside the template dialog) bulk-creates tasks from a `.csv` file. The header row must name a `title` column; `description`, `interval_value` (default 30), `interval_type` (`days`/`weeks`/`months`/`years`, default days), `last_performed` (`YYYY-MM-DD`, default today), `icon`, and `group_id` are optional. The dialog previews every importable row and reports per-line problems — a bad line is skipped, never the whole file. This is also the migration path from other maintenance trackers: export or transcribe their data into these columns and import.
- **Export CSV** downloads all tasks as `home_maintenance_tasks.csv` with the same columns, so an export re-imports cleanly (count/runtime trigger details aren't part of the CSV format; exported count/runtime tasks re-import as time-based).

Example CSV:

```csv
title,description,interval_value,interval_type,last_performed,icon,group_id
Replace HVAC filter,MERV 13,90,days,2026-01-15,mdi:air-filter,HVAC
Clean gutters,Front and back,6,months,,mdi:home-roof,Exterior
```

### NFC tags

Assign an NFC tag to a task and scanning that tag marks the task complete. Assign the same tag to several tasks to complete them all with one scan — handy for a "furnace room" tag that resets every filter task at once.

## Dashboard card

The integration bundles a **Home Maintenance Todo** Lovelace card that mirrors the panel on any dashboard: tasks bucketed into **Overdue**, **Due soon**, and **Upcoming**, with a search box, a group filter, quick complete/remove actions, and expandable details (description, last performed, count/runtime progress). The card is registered automatically — no manual resource setup — and appears in the card picker once the integration is loaded, or add it via YAML:

```yaml
type: custom:home-maintenance-todo-card
title: Home Maintenance      # optional header (omit for none)
due_soon_days: 14            # window for the "Due soon" bucket
max_items: 0                 # cap the list (0 = no limit)
show_search: true            # search box + group filter
# group: Kitchen             # pin to one task group (hides the dropdown)
```

The card updates live over the same push channel as the panel, and its header links back to the full panel for editing. Set `group: Kitchen` to pin a card to a single [task group](#task-groups) (this hides the group dropdown) — handy for one card per room or system.

An **Add Task** card is bundled too — the panel's full add-task form (trigger types, groups, and all optional fields) on any dashboard, so tasks can be created without opening the panel:

```yaml
type: custom:home-maintenance-add-task-card
title: Add Maintenance Task   # optional header (empty for none)
```

For a complete view combining the cards with templated summaries and core cards, see the [example dashboard](docs/example-dashboard.md).

## Entities

Each task is a `binary_sensor` (grouped under one *Home Maintenance* device) that is **on** while the task is due. Attributes depend on the trigger type:

| Attribute | Time | Date | Count | Runtime |
| --- | :-: | :-: | :-: | :-: |
| `trigger_type`, `last_performed`, `description` | ✓ | ✓ | ✓ | ✓ |
| `tag_id` (when an NFC tag is assigned) | ✓ | ✓ | ✓ | ✓ |
| `interval_value`, `interval_type`, `next_due`, `days_until_due` | ✓ | ✓ | | |
| `anchor_date` | | ✓ | | |
| `active_months` (when a season is set) | ✓ | | | |
| `current_count`, `count_threshold`, `count_entity_id` | | | ✓ | |
| `runtime_entity_id`, `runtime_threshold`, `runtime_baseline`, `runtime_current`, `runtime_delta` | | | | ✓ |

`days_until_due` counts calendar days to the next due date — `0` means due today, negative values count overdue days — which keeps automation conditions simple (`{{ state_attr('binary_sensor.clean_gutters', 'days_until_due') <= 3 }}`).

### Any task due sensor

A single aggregate `binary_sensor.any_task_due` is **on** while *any* task is due, with `due_count`, `due_tasks` (the due tasks' titles), and `task_count` attributes — one automation hook for "does anything need attention" without templating over every task entity.

### Todo list

A `todo.home_maintenance` entity mirrors the tasks as a native todo list: due tasks are **pending**, everything else shows as completed, and each dated task carries its next due date. That means the built-in [todo card](https://www.home-assistant.io/dashboards/todo-list/), the companion apps' todo widgets, and voice assistants ("what's on my home maintenance list?") work out of the box. Checking an item off completes the task — same as the panel's ✓ — and renaming an item or editing its description updates the task. Items can't be created, deleted, or reopened from the todo list (tasks need trigger configuration, and due state is computed from the schedule), so use the panel for those.

### Calendar

A single `calendar.home_maintenance` entity shows **all-day events for every time-based and fixed-date task**: the real next due date plus projected recurrences up to a year ahead, so upcoming maintenance appears in the Calendar dashboard, calendar cards, and [calendar-trigger automations](https://www.home-assistant.io/docs/automation/trigger/#calendar-trigger), and can be queried with `calendar.get_events`. Count- and runtime-based tasks have no due date and are not shown. Projections assume each task is completed on its due date (they re-flow whenever a task is completed); overdue tasks stay on their original due date. The event on a task's *actual* next due date keeps the task id as its uid, so uid-matching automations keep working.

### Completion history

Every completion — from the panel, a card, a service call, a tag scan, a notification action, or the todo list — is recorded in the task's history with the performed date, the actual completion time, and an optional note (the panel's complete dialog has a note field, and the services accept one). The last entries are shown in the edit dialog and the todo card's expanded view, history is included in the websocket task payloads for automations and templates, and the edit dialog shows the full record in a scrollable list. Each task keeps its most recent 50 entries by default — raise, lower, or lift the cap with the **Completion-history entries kept per task** [option](#options) (`0` = unlimited).

## Services

### `home_maintenance.reset_last_performed`

Marks a task as completed and updates its `last_performed` and `next_due`. Optionally back-date the completion with `performed_date` and record a `note` in the task's [completion history](#completion-history).

```yaml
action: home_maintenance.reset_last_performed
data:
  entity_id: binary_sensor.clean_gutters
  performed_date: "2026-06-19"  # optional; defaults to today
  note: "Hired the crew from Main St"  # optional history note
```

### `home_maintenance.increment_count`

Increments the usage counter of a count-based task — useful when the usage you want to count isn't a single entity turning on.

```yaml
action: home_maintenance.increment_count
data:
  entity_id: binary_sensor.descale_coffee_machine
```

### `home_maintenance.reset_count`

Resets a count-based task's counter to zero **without** marking the task complete.

```yaml
action: home_maintenance.reset_count
data:
  entity_id: binary_sensor.descale_coffee_machine
```

### `home_maintenance.snooze_task`

Silences a task's [notifications](#notifications) for a number of days (default 1) without completing it.

```yaml
action: home_maintenance.snooze_task
data:
  entity_id: binary_sensor.change_hvac_filter
  days: 3  # optional; defaults to 1
```

### `home_maintenance.send_task_notification`

Sends the task's notification immediately using its configured notify service, regardless of due state, snooze, or schedule — useful for testing and custom automations.

```yaml
action: home_maintenance.send_task_notification
data:
  entity_id: binary_sensor.change_hvac_filter
```

### `home_maintenance.create_task`

Creates a new maintenance task — so automations, scripts, and voice assistants can add tasks without the panel. `title` and `interval_value` are required; `interval_type` defaults to `days` and `last_performed` to today. All the other task fields (`trigger_type`, `anchor_date`, `active_months`, `description`, `icon`, `group_id`, `labels`, count/runtime fields, notification settings) are accepted too, with the same validation as the panel. With `response_variable`, the call returns the new task's id.

```yaml
action: home_maintenance.create_task
data:
  title: Replace HVAC filter
  interval_value: 90
  description: MERV 13
  icon: mdi:air-filter
  group_id: HVAC
response_variable: new_task  # optional; new_task.task_id holds the id
```

### `home_maintenance.mark_overdue`

Forces a task into the due state by backdating its trigger progress — useful for testing due-state automations and notification flows without waiting for a real due date. Time-based tasks get a last-performed date one interval before yesterday; fixed-date tasks return to their most recent past occurrence; count tasks jump to their threshold; runtime tasks re-baseline a full threshold below the sensor's current value. The call fails (rather than silently doing nothing) when the task cannot currently be due: a fixed-date task whose first occurrence is still in the future, a [seasonal](#trigger-types) task outside its active months, or a runtime task whose sensor is unavailable.

```yaml
action: home_maintenance.mark_overdue
data:
  entity_id: binary_sensor.change_hvac_filter
```

## Events

Two bus events are fired for event-triggered automations:

- **`home_maintenance_task_completed`** — on every completion (panel, card, service, tag scan, notification action, todo list). Data: `task_id`, `entity_id`, `title`, `trigger_type`, `group_id`, `performed` (date), `note`.
- **`home_maintenance_task_due`** — when a task's entity flips to due while Home Assistant is running (a task already due at startup does not re-fire). Data: `task_id`, `entity_id`, `title`, `trigger_type`, `group_id`.

```yaml
automation:
  - alias: "Log completed maintenance"
    triggers:
      - trigger: event
        event_type: home_maintenance_task_completed
    actions:
      - action: logbook.log
        data:
          name: "{{ trigger.event.data.title }}"
          message: "completed{{ ' — ' + trigger.event.data.note if trigger.event.data.note }}"
```

## Automation ideas

**Get notified when a task becomes due.** Built-in per-task [notifications](#notifications) cover the common case. For full control — custom copy, conditions, or other actions — every task is a binary sensor, so a state trigger is all it takes (or use the [`home_maintenance_task_due` event](#events)):

```yaml
automation:
  - alias: "Maintenance: HVAC filter due"
    triggers:
      - trigger: state
        entity_id: binary_sensor.change_hvac_filter
        to: "on"
    actions:
      - action: notify.mobile_app_your_phone
        data:
          title: "Home maintenance due"
          message: "Time to change the HVAC filter."
```

**A weekly digest of everything due.** Group your task entities with a template that lists the ones currently on, and send it on Saturday morning.

**Count usage that isn't an on/off entity.** Call `home_maintenance.increment_count` from any automation — for example, increment a "clean the grill" task each time a temperature sensor shows the grill was used.

## Screenshots

![Task Panel](screenshots/task-panel.PNG)
![Integration Page](screenshots/integration-page.PNG)
![Entity Attributes](screenshots/entity-attributes.PNG)

## Troubleshooting

**The panel or cards look outdated after an upgrade.** The frontend bundles are served under version-stamped URLs (`…/main.js?v=1.5.x`), so after Home Assistant restarts a normal page reload fetches the matching frontend — no cache clearing needed. If you still see an old UI, check **Settings → Dashboards → Resources** for manually added `/home_maintenance_static/…` entries left over from before the cards were auto-registered, and remove them.

**A field doesn't render, or a button does nothing.** This is usually a frontend component conflict — either another custom card bundling outdated Home Assistant components, or a Home Assistant release removing a legacy element. Try a private/incognito window first (rules out cached resources); if it persists, open the browser console (F12) and [file an issue](https://github.com/kedube/ha-home_maintenance/issues) with the console output and your Home Assistant version.

**Non-admin users can't see the panel.** That's the **Admin only** option (on by default) — turn it off via **Configure** on the integration entry. Task entities are visible to everyone either way.

**A counter or runtime task stopped advancing, or notifications stopped arriving.** Check **Settings → System → Repairs** — the integration raises an issue when a task's watched entity no longer exists or its notify service is gone, and clears it automatically once the reference is valid again.

**Filing an issue?** Attach the integration's diagnostics (Settings → Devices & Services → Home Maintenance → ⋮ → **Download diagnostics**) — task descriptions, notes, URLs, and tag ids are redacted automatically.

## Project scope

This integration fills a simple gap: recurring tasks without stacks of helpers and automations. It is intentionally minimal — focused on task tracking. Home Assistant already provides powerful dashboards, automations, and alerts; this integration complements them rather than replacing them, so feature requests that duplicate native functionality may be declined.

## Development

The repo ships a devcontainer (Python 3.14, Node 20) and helper scripts:

- `scripts/setup` — create a `.venv` and install requirements.
- `scripts/develop` — run a local Home Assistant instance with the integration symlinked in.
- `scripts/lint` — run ruff over the codebase (CI enforces `ruff check` and `ruff format --check`).
- `scripts/e2e_smoke.py` — browser smoke test (see below).

Run the test suite (coverage gate: 85%) with:

```sh
pip install -r requirements_test.txt
python -m pytest
```

The sidebar panel is a Lit + TypeScript app in `custom_components/home_maintenance/panel/` (dependencies are exact-pinned via the committed `package-lock.json`). After changing panel sources, rebuild the committed bundles:

```sh
cd custom_components/home_maintenance/panel
npm ci
npm run build   # regenerates dist/main.js, todo-card.js, add-task-card.js
npm test        # vitest unit tests: date math, bucketing, form validation, translations
```

The panel and cards are translated via `panel/localize/languages/*.json` and the config flow via `custom_components/home_maintenance/translations/*.json` (currently English, German, French, Spanish, Italian, Dutch, Polish, and Brazilian Portuguese). To add a language, copy both `en.json` files, translate every key, and register the panel file in `panel/localize/localize.ts` — the vitest suite fails if any language's keys drift from English.

The panel only uses current Home Assistant components (`ha-selector`, `ha-form`, `ha-button`, `ha-dialog`) — legacy elements (`mwc-*`, `ha-textfield`, `ha-formfield`, `ha-md-*`, `paper-*`) break silently when Home Assistant removes them, and CI rejects them.

The **browser smoke test** catches what pytest can't: it boots a throwaway Home Assistant with the integration, completes onboarding via the API, then logs in with headless Chrome, adds a task, and creates a group — failing if any form field stops rendering or any flow breaks:

```sh
pip install homeassistant colorlog playwright
python -m playwright install chromium
python scripts/e2e_smoke.py --install-deps
```

`--install-deps` adds the manifest-pinned packages the HA frontend needs on a bare pip install; set `HASS_PYTHON=/path/to/venv/bin/python` to run Home Assistant from a different environment than playwright.

For a tour of how the pieces fit together — the task store, dispatcher signals, trigger strategies, push entities, the websocket API, and the panel components — see [docs/architecture.md](docs/architecture.md).

### CI and releases

Every push and pull request runs the **CI** workflow: HACS validation, hassfest, ruff, pytest on Python 3.13 and 3.14 (with an 85% coverage gate), a panel type-check, vitest unit-test run, and build that fails if the committed bundles drift from the sources or if legacy Home Assistant components reappear, and the browser smoke test driving the real panel headlessly (its screenshot is uploaded as a run artifact). A weekly, non-blocking **HA next** job additionally runs the pytest suite *and* the smoke test against the newest Home Assistant pre-release as an early warning for upstream breaking changes, and dependabot keeps the panel's npm dependencies fresh (its PRs get the bundle rebuilt automatically). When CI passes on `main`, the **Release** workflow automatically bumps the patch version (in `const.py` and `manifest.json` together), rotates the `Unreleased` section of [CHANGELOG.md](CHANGELOG.md) into the release notes, tags `vX.Y.Z`, and publishes a GitHub release with the HACS zip attached. Minor/major bumps (or a re-release) can be triggered manually from the workflow's **Run workflow** menu.

When contributing, add a line describing your change under `## Unreleased` in [CHANGELOG.md](CHANGELOG.md) — it becomes the *Highlights* section of the next release's notes. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guidelines.

## Need help?

Open an [issue](https://github.com/kedube/ha-home_maintenance/issues) here on GitHub, or ask in the [Home Assistant community thread](https://community.home-assistant.io/t/new-integration-home-maintenance-track-recurring-tasks-in-home-assistant/897324) for the upstream project.

## License

[MIT](LICENSE) — free to use, share, and improve.
