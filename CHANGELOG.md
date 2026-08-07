# Changelog

Notable changes to the Home Maintenance integration. The Unreleased section
is rotated into a versioned section by the release workflow and becomes the
Highlights block of the GitHub release notes.

## 1.5.8 — 2026-08-07

- Task groups: organize tasks into named groups. The panel gains a Groups
  card (create, rename, delete), a group picker in the add/edit forms, a
  "Move to group" task action, and the task table renders one section per
  group. Groups persist in storage and survive renames/deletes with member
  tasks reassigned. Ported from @select-star-from's fork.
- Completion confirmation: marking a task complete now asks for confirmation
  (with the recalculation consequences spelled out) and shows a toast on
  success, replacing the silent one-click ✓. Ported from @select-star-from's
  fork.
- Home Maintenance Todo Lovelace card (`custom:home-maintenance-todo-card`):
  a dashboard card showing tasks bucketed into Overdue / Due soon / Upcoming
  with search, group filter, quick complete/remove actions, and expandable
  details. Auto-registered — no manual resource setup needed. Ported from
  @csteamengine's fork and adapted to backend-computed trigger state.

## 1.5.7 — 2026-08-07

- Bundled brand icons (`brand/icon.png`, `brand/icon@2x.png`) — a house with
  hammer and wrench — so HACS shows the integration's own icon instead of
  falling back to the brands repository

## 1.5.6 — 2026-08-06

- Home Assistant 2026.3 compatibility: replaced removed `ha-md-menu` and
  `mwc-button` components with `ha-dropdown`-based `hm-task-menu` and
  `ha-button` (#122)
- Count-based task triggers: tasks can fire after a number of events on a
  monitored entity (#115)
- Runtime-based task triggers: tasks can fire when a sensor value delta
  crosses a threshold (#116)
- Area support: tasks can be assigned to a Home Assistant area (#117)
- Task description field in the add and edit dialogs (#101)
- Task titles can be edited from the edit dialog (#100)
- Trigger-type dropdown and all new form fields localized (English and German)
- Performance: state listeners no longer copy every task on each state change,
  storage writes are coalesced, and the task table no longer rebuilds on
  unrelated state updates
- Fixed: edit dialog validates count/runtime fields, description is no longer
  dropped on edit, and count/runtime sensors now expose the description
  attribute
- CI overhaul (HACS, hassfest, ruff, pytest, panel build with bundle drift
  check) and automatic releases with generated notes on every green build of
  main
- Architecture: the task store is now the single source of truth (entities no
  longer keep task copies); per-trigger-type logic consolidated into one
  strategy module shared by entities, API, and panel; entities are push-based
  and time-based tasks flip due exactly at their due moment; count/runtime
  sensors are watched with targeted state listeners
- The panel updates live via a websocket subscription (changes from NFC scans,
  services, and automations appear without a refresh), renders backend-computed
  due/progress state, and is split into focused components
- Task updates are validated against an explicit field whitelist server-side;
  switching a task's trigger type resets the counter or captures a fresh
  runtime baseline
- German panel translations are now actually loaded
- Test suite added (pytest-homeassistant-custom-component) covering triggers,
  store, websocket API, watchers, services, entities, config flow, and the
  release scripts, with an enforced 85% coverage gate, run on Python 3.13 and
  3.14
- Fixed: the options (Configure) dialog crashed on recent Home Assistant
  versions that made OptionsFlow.config_entry read-only
- CI hardening: all actions pinned to commit SHAs, a weekly non-blocking
  "HA next" job runs the suite against the newest Home Assistant pre-release
  for early breakage warning, and dependabot now maintains the panel's npm
  dependencies with an automatic bundle rebuild on its PRs
