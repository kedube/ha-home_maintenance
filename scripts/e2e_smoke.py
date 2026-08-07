#!/usr/bin/env python3
"""
Browser smoke test for the Home Maintenance panel.

Boots a throwaway Home Assistant instance with the integration installed,
completes onboarding via the API, then drives the real panel in a headless
browser: adds a task, creates a group, and asserts both appear. This catches
the class of breakage pytest cannot see — Home Assistant removing or
changing frontend components so parts of the panel stop rendering (as
happened with mwc-button in #122 and ha-textfield in 1.5.16).

Usage: python scripts/e2e_smoke.py [--port 8129] [--keep]
Requires: homeassistant and playwright installed in the current environment,
plus a chromium (``playwright install chromium``) or system Chrome. Set
HASS_PYTHON to launch Home Assistant from a different interpreter than the
one running playwright.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import TYPE_CHECKING

from playwright.sync_api import sync_playwright

if TYPE_CHECKING:
    from playwright.sync_api import Browser, Playwright

REPO = Path(__file__).resolve().parent.parent
USERNAME = "smoke"
PASSWORD = "smoke-test-password"
SCREENSHOT = "/tmp/hm_smoke_panel.png"


def request(
    method: str,
    url: str,
    data: dict | None = None,
    token: str | None = None,
    *,
    form: bool = False,
) -> dict | list | None:
    """Make a JSON (or form-encoded) HTTP request and decode the response."""
    headers = {}
    body = None
    if data is not None:
        if form:
            body = urllib.parse.urlencode(data).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            body = json.dumps(data).encode()
            headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
    return json.loads(raw) if raw else None


def wait_for_ha(base: str, timeout: int = 420) -> None:
    """Poll until the Home Assistant HTTP server responds."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            urllib.request.urlopen(base + "/", timeout=5)
        except Exception:  # noqa: BLE001 - retry until the server is up
            time.sleep(2)
        else:
            return
    msg = f"Home Assistant did not come up within {timeout}s"
    raise TimeoutError(msg)


def onboard(base: str) -> str:
    """Complete onboarding and return a bearer token."""
    client = base + "/"
    result = request(
        "POST",
        f"{base}/api/onboarding/users",
        {
            "client_id": client,
            "name": "Smoke",
            "username": USERNAME,
            "password": PASSWORD,
            "language": "en",
        },
    )
    token_resp = request(
        "POST",
        f"{base}/auth/token",
        {
            "grant_type": "authorization_code",
            "code": result["auth_code"],
            "client_id": client,
        },
        form=True,
    )
    token = token_resp["access_token"]
    request("POST", f"{base}/api/onboarding/core_config", {}, token)
    request("POST", f"{base}/api/onboarding/analytics", {}, token)
    request(
        "POST",
        f"{base}/api/onboarding/integration",
        {"client_id": client, "redirect_uri": client + "?auth_callback=1"},
        token,
    )
    return token


def add_integration(base: str, token: str) -> None:
    """Create the home_maintenance config entry via the config flow API."""
    flow = request(
        "POST",
        f"{base}/api/config/config_entries/flow",
        {"handler": "home_maintenance", "show_advanced_options": False},
        token,
    )
    result = request(
        "POST",
        f"{base}/api/config/config_entries/flow/{flow['flow_id']}",
        {"admin_only": True, "sidebar_title": "Home Maintenance"},
        token,
    )
    if result.get("type") != "create_entry":
        msg = f"Config flow did not create an entry: {result}"
        raise RuntimeError(msg)


def launch_browser(p: Playwright) -> Browser:
    """Prefer the bundled chromium (CI); fall back to system Chrome (local)."""
    try:
        return p.chromium.launch(headless=True)
    except Exception:  # noqa: BLE001 - bundled browser not installed
        return p.chromium.launch(channel="chrome", headless=True)


def drive_panel(base: str) -> list[str]:
    """Exercise the panel in a real browser. Returns collected errors."""
    errors: list[str] = []
    with sync_playwright() as p:
        browser = launch_browser(p)
        page = browser.new_page(viewport={"width": 1400, "height": 950})
        # "Transition was skipped" is benign HA view-transition noise that
        # fires on stock pages too; everything else is a real failure.
        page.on(
            "pageerror",
            lambda e: (
                None
                if "Transition was skipped" in str(e)
                else errors.append(f"pageerror: {e}")
            ),
        )

        page.goto(base, wait_until="networkidle")
        page.fill('input[name="username"]', USERNAME, timeout=30000)
        page.fill('input[name="password"]', PASSWORD)
        page.keyboard.press("Enter")
        page.wait_for_url("**/home/**", timeout=60000)

        page.goto(f"{base}/home-maintenance", wait_until="networkidle")
        page.wait_for_selector("hm-task-form", timeout=30000)
        time.sleep(2)

        # Every input the panel depends on must actually render.
        for name, selector, minimum in [
            ("task form fields", "hm-task-form ha-selector", 5),
            ("task title input", "hm-task-form ha-selector input", 1),
            ("group name input", "hm-group-manager ha-selector input", 1),
            ("group create button", "hm-group-manager ha-button", 1),
        ]:
            count = page.locator(selector).count()
            if count < minimum:
                errors.append(
                    f"{name}: expected >= {minimum} of {selector}, found {count}"
                )

        # Add a task through the real form.
        page.locator("hm-task-form .field.title input").first.fill("Smoke Test Task")
        page.locator("hm-task-form .field.interval_value input").first.fill("30")
        page.locator("hm-task-form .add-button").first.click()
        try:
            page.wait_for_selector(
                "hm-task-table >> text=Smoke Test Task", timeout=15000
            )
        except Exception:  # noqa: BLE001 - absence is the failure being recorded
            errors.append("added task did not appear in the task table")

        # Create a group through the Groups card.
        page.locator("hm-group-manager ha-selector input").first.fill("Smoke Group")
        page.locator("hm-group-manager ha-button").first.click()
        try:
            page.wait_for_selector(
                "hm-group-manager >> text=Smoke Group", timeout=15000
            )
        except Exception:  # noqa: BLE001 - absence is the failure being recorded
            errors.append("created group did not appear in the group list")

        page.screenshot(path=SCREENSHOT, full_page=True)
        browser.close()
    return errors


def main() -> int:
    """Run the smoke test and return a process exit code."""
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8129)
    parser.add_argument("--keep", action="store_true", help="keep the temp config dir")
    args = parser.parse_args()
    base = f"http://localhost:{args.port}"

    config_dir = Path(tempfile.mkdtemp(prefix="hm-smoke-"))
    # Deliberately minimal: default_config would pip-install requirements
    # for dozens of integrations on a cold CI environment and blow the boot
    # timeout. frontend + config are all the panel and config-flow need.
    (config_dir / "configuration.yaml").write_text(
        f"frontend:\nconfig:\nhttp:\n  server_port: {args.port}\n"
    )
    (config_dir / "custom_components").symlink_to(REPO / "custom_components")

    # HASS_PYTHON lets a local run pair a playwright env with the project's
    # Home Assistant venv; in CI both live in the same interpreter.
    hass_python = os.environ.get("HASS_PYTHON", sys.executable)
    log_path = config_dir / "hass-output.log"
    errors: list[str] = []
    with log_path.open("wb") as log_file:
        proc = subprocess.Popen(
            [hass_python, "-m", "homeassistant", "--config", str(config_dir)],
            stdout=log_file,
            stderr=subprocess.STDOUT,
        )
        try:
            print("waiting for Home Assistant to boot...")
            wait_for_ha(base)
            print("onboarding...")
            token = onboard(base)
            print("adding the home_maintenance integration...")
            add_integration(base, token)
            time.sleep(3)
            print("driving the panel...")
            errors = drive_panel(base)
        except Exception as err:  # noqa: BLE001 - report, dump logs, fail the run
            errors.append(f"{type(err).__name__}: {err}")
        finally:
            proc.terminate()
            try:
                proc.wait(timeout=30)
            except subprocess.TimeoutExpired:
                proc.kill()

    if errors:
        print("SMOKE TEST FAILED:")
        for e in errors:
            print(f"  - {e}")
        print("---- Home Assistant output (tail) ----")
        tail = log_path.read_text(errors="replace").splitlines()[-100:]
        print("\n".join(tail))
    if not args.keep:
        shutil.rmtree(config_dir, ignore_errors=True)
    if errors:
        return 1
    print("Smoke test passed: panel rendered, task added, group created.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
