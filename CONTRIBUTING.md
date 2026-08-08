# Contribution guidelines

Contributing to this project should be as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Github is used for everything

Github is used to host code, to track issues and feature requests, as well as accept pull requests.

Pull requests are the best way to propose changes to the codebase.

1. Fork the repo and create your branch from `main`.
2. If you've changed something, update the documentation (including [docs/architecture.md](docs/architecture.md) if the design changed).
3. Add a line describing your change under `## Unreleased` in [CHANGELOG.md](CHANGELOG.md) — it becomes part of the next release's notes.
4. If you changed the panel sources (`custom_components/home_maintenance/panel/src/`), rebuild the committed bundle: `cd custom_components/home_maintenance/panel && npm ci && npm run build`. CI fails if the committed bundle drifts from the sources.
5. Make sure your code lints (using `scripts/lint`).
6. Run the tests: `pip install -r requirements_test.txt && python -m pytest` (CI enforces an 85% coverage gate). Add tests for new behavior.
7. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](../../issues)

GitHub issues are used to track public bugs.
Report a bug by [opening a new issue](../../issues/new/choose); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style

Use [ruff](https://docs.astral.sh/ruff/) to make sure the code follows the style — `scripts/lint` runs `ruff format` and `ruff check --fix` for you, and CI enforces both on every pull request.

## Frontend guidelines

- Build UI only from current Home Assistant components — `ha-selector`, `ha-form`, `ha-button`, `ha-dialog`, `ha-dropdown`. Legacy elements (`mwc-*`, `ha-textfield`, `ha-formfield`, `ha-md-*`, `paper-*`) break silently when Home Assistant deletes them, and CI fails if they appear in `panel/src/`.
- User feedback goes through toasts (`src/toast.ts`) and the shared `hm-confirm-dialog` — never browser-native `alert()`/`confirm()`, which the companion apps can suppress.
- Form fields render as bare `ha-selector`s with a uniform label above each input (see `task-form.ts`); follow that pattern so inputs stay aligned.
- New user-facing strings go into both `localize/languages/en.json` and `de.json`.

## Test your code modification

This custom component is based on [integration_blueprint template](https://github.com/ludeeus/integration_blueprint).

It comes with development environment in a container, easy to launch
if you use Visual Studio Code. With this container you will have a stand alone
Home Assistant instance running and already configured with the included
[`configuration.yaml`](./config/configuration.yaml)
file.

Outside the container, `scripts/develop` runs the same standalone Home Assistant
with the integration symlinked in. For UI changes, the browser smoke test drives
the real panel headlessly (CI runs it on every pull request):

```sh
pip install homeassistant colorlog playwright
python -m playwright install chromium
python scripts/e2e_smoke.py --install-deps
```

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
