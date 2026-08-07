---
name: run-dev-ha
description: Launch the Home Assistant dev instance with this integration and drive the panel in a browser — for verifying frontend changes, reproducing UI bugs, or taking screenshots. Use when asked to run the app, test the panel, or confirm a UI change works.
---

# Run the dev Home Assistant and drive the panel

## Quick smoke test (preferred for "does it work?")

`scripts/e2e_smoke.py` boots a throwaway HA on port 8129, onboards via the
API, logs in with headless Chrome, adds a task, and creates a group:

```bash
# Needs playwright available; HASS_PYTHON points at the venv that has HA.
HASS_PYTHON=.venv/bin/python /path/to/python-with-playwright scripts/e2e_smoke.py
```

If no env has playwright: `python3 -m venv /tmp/pwenv && /tmp/pwenv/bin/pip
install playwright` (uses system Chrome via `channel="chrome"`, no browser
download needed on this Mac).

Screenshot lands at `/tmp/hm_smoke_panel.png` — look at it.

## Persistent dev instance (for interactive driving / screenshots)

```bash
./scripts/develop          # runs HA on http://localhost:8123 (foreground)
```

- The `config/` dir persists. Onboarding is already done: login **dev** /
  **devpass123** (in `config/.storage`, gitignored). If `.storage` was
  deleted, re-onboard via the API (see `onboard()` in scripts/e2e_smoke.py)
  and re-add the integration via the config-flow API.
- Rebuild the frontend first when testing UI changes:
  `cd custom_components/home_maintenance/panel && npm run build`
- Bundle URLs carry `?v=<VERSION from const.py>`; a fresh headless browser
  has no cache, so no cache busting needed in automation.

Drive it with playwright (pierces shadow DOM with plain CSS selectors):

- Login page: `input[name="username"]`, `input[name="password"]`, Enter,
  then `wait_for_url("**/home/**")`.
- Panel: `page.goto("http://localhost:8123/home-maintenance")`, wait for
  `hm-task-form`.
- Task form fields: `hm-task-form .field.<name> input` (e.g. `.field.title`,
  `.field.interval_value`); submit via `hm-task-form .add-button`.
- Groups card: `hm-group-manager ha-selector input`, `hm-group-manager
  ha-button`.
- Row actions: `hm-task-table hm-task-menu ha-icon-button` then
  `ha-dropdown-item[value='edit'|'move'|'delete']`.
- Confirm dialogs: `hm-confirm-dialog ha-dialog`, buttons inside (cancel
  first, confirm second); Escape closes.
- Ignore the benign `Transition was skipped` pageerror.

## Gotchas

- Never run bare `hass` — entrypoint shebangs break when the repo folder is
  renamed; `scripts/develop` already uses `.venv/bin/python -m homeassistant`.
- The dev venv's HA (2026.2.3) predates `ha-dialog-footer`; dialog footer
  buttons only render there because hm-confirm-dialog falls back to direct
  action slots. Production (HA 2026.3+) uses the footer path.
- Backend changes need an HA restart; frontend changes only need
  `npm run build` + page reload.
