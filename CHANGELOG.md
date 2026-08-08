# Changelog

Notable changes to the Home Maintenance integration. The Unreleased section
is rotated into a versioned section by the release workflow and becomes the
Highlights block of the GitHub release notes.

## 1.5.18 — 2026-08-08

- Fixed: the `reset_last_performed` service recorded the wrong day for
  timezones west of UTC when `performed_date` was given (the date was
  interpreted as UTC midnight); it now lands on the given calendar day in
  Home Assistant's timezone. All day-boundary math (store, triggers,
  websocket API) is consolidated on HA's `start_of_local_day`.
- Fixed: editing a task can no longer switch it into a state where it
  silently never becomes due — trigger-specific required fields (count/
  runtime entity and threshold) are now validated by the store on every
  write path, not just when adding.
- Fixed: renaming a group to the name of an existing group irreversibly
  merged the two; it is now rejected with a clear error, and the Groups
  card warns before even calling the backend.
- Fixed: task mutations on a missing task (update, complete, remove,
  increment, reset) now return a clean websocket error instead of an
  unhandled exception; the same applies to any command called while the
  integration is not loaded.
- Fixed: stored data written by a newer version of the integration no
  longer aborts setup (unknown task fields are dropped on load, and a
  storage migrate hook accepts other schema versions), and the
  integration's services are properly removed when the entry unloads.
- Fixed: dates shown in the panel and todo card are now parsed as calendar
  days — previously `new Date(iso)` could shift last-performed/next-due a
  day in browser timezones that differ from Home Assistant's.
- Performance: runtime sensors that update every few seconds no longer
  rewrite entity state and reload every open panel on each tick — updates
  push only when the due state flips or progress advances a whole unit.
  The panel loads static data (HA components, tags, config) once instead
  of on every push, the todo card no longer reloads twice after
  complete/remove, and group rename/delete sends one change signal instead
  of one per member task.
- The todo card's interval labels ("Every 5 uses") are now localized
  (English and German) like the rest of the UI.
- Internal cleanup: task completion uses the shared confirmation dialog
  (one dialog implementation instead of two), all dialogs work on both
  newer and older Home Assistant footer styles, the add form and edit
  dialog share one field renderer, shared frontend helpers replace
  triplicated debounce/date/interval code, and dead code was removed
  (`async_reload_entry`, `get_by_tag_id`, unused websocket wrappers, the
  unused device id).
- Documentation refresh: the README now describes the redesigned panel
  layout, documents the todo card's `group` option in the YAML example, and
  gains a Troubleshooting section (stale frontend after upgrades, component
  conflicts, admin-only panel visibility) plus browser-smoke-test
  instructions; docs/architecture.md covers the current frontend (three
  bundles, uniform ha-selector field rendering, shared confirm dialog and
  toasts, cache-busted serving, component-compatibility policy, smoke
  test); CONTRIBUTING.md adds frontend guidelines matching what CI
  enforces.

## 1.5.17 — 2026-08-08

- HA-native feedback everywhere: all browser-native alert()/confirm()
  dialogs (which look foreign and can be silently suppressed by the
  companion apps) are replaced with toast notifications and a shared
  ha-dialog confirmation — task removal, group deletion, task completion in
  the todo card, and all validation/error messages. Adding a task from the
  panel now shows a confirmation toast, and creating a group that already
  exists says so instead of silently clearing the field.
- Edit dialog fields now use the same uniform label-above-input rendering
  as the add form, so all inputs line up.
- Browser smoke test (scripts/e2e_smoke.py + CI job): boots a throwaway
  Home Assistant, logs in with a headless browser, adds a task, and creates
  a group — catching frontend component removals that pytest cannot see.
  Also runs against HA pre-releases in the weekly HA-next job.
- CI now fails if legacy Home Assistant components (mwc-*, ha-textfield,
  ha-formfield, ha-md-*, paper-*) reappear in the panel sources.
- Faster panel loads: static bundles are served with long-lived cache
  headers, safe now that URLs are version-stamped.
- scripts/develop now launches Home Assistant via the venv's python -m
  homeassistant, surviving repository moves/renames that break entrypoint
  shebangs.
- All three README screenshots recaptured in a consistent dark theme: the
  redesigned single-column panel (with an overdue task highlighted), the
  integration device page, and the entity attributes dialog.

## 1.5.16 — 2026-08-07

- Fixed: the Groups card's name fields did not render on Home Assistant
  builds that removed the legacy `ha-textfield` component, making it
  impossible to type a group name or create a group. The create and rename
  fields now use `ha-selector` (the same component as the task forms), and
  the todo/add-task card config editors were moved from hand-rolled
  `ha-textfield`/`ha-formfield` markup to schema-driven `ha-form`.

## 1.5.15 — 2026-08-07

- Groups card: the Create action now reads the group name directly from the
  text field as a fallback (guarding against environments where another
  frontend resource registers a conflicting ha-textfield and input events
  are lost) and shows an alert if the backend call fails instead of failing
  silently.

## 1.5.14 — 2026-08-07

- Create New Task form: all fields now render with a uniform label above the
  input, so fields line up horizontally regardless of selector style (the
  Tag and Label(s) pickers previously drew their own label above the input,
  pushing it lower than the neighboring fields).

## 1.5.13 — 2026-08-07

- Compact task forms, restoring the density of the original design while
  keeping trigger types, groups, and all optional fields: the panel now
  stacks its cards in a single full-width column with Create New Task on
  top, whose main fields (title, trigger type, trigger fields, last
  performed) and the Add Task button sit on one line. Optional settings
  expand onto a second line, with description on its own line below. The
  edit dialog and Add Task Lovelace card use the same responsive grid,
  fitting as many fields per line as their width allows.
- Cache busting: the panel and card bundles are served with a `?v=<version>`
  query string tied to the installed integration version, so browsers fetch
  the matching frontend after an upgrade instead of reusing stale cached
  modules.

## 1.5.11 — 2026-08-07

- Add Task Lovelace card (`custom:home-maintenance-add-task-card`): the
  panel's full task-creation form — trigger types, groups, and all optional
  fields — on any dashboard, with a confirmation toast. Auto-registered like
  the todo card, and included in the example dashboard.

## 1.5.9 — 2026-08-07

- Todo card: new `group` option pins a card to a single task group and hides
  the group dropdown — one card per room or system
- Example dashboard: documented copy-paste view in `docs/example-dashboard.md`,
  also loaded as a live dashboard in the development environment

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
