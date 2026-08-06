"""Tests for the release automation scripts in .github/scripts."""

import importlib.util
import subprocess
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent.parent / ".github" / "scripts"

CONST_TEMPLATE = 'VERSION = "{version}"\n'
MANIFEST_TEMPLATE = (
    '{{\n  "domain": "home_maintenance",\n  "version": "{version}"\n}}\n'
)


def load_script(name: str):
    """Load a release script as a module."""
    spec = importlib.util.spec_from_file_location(name, SCRIPTS_DIR / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_version_fixtures(tmp_path: Path, version: str) -> tuple[Path, Path]:
    component = tmp_path / "custom_components" / "home_maintenance"
    component.mkdir(parents=True)
    const = component / "const.py"
    manifest = component / "manifest.json"
    const.write_text(CONST_TEMPLATE.format(version=version))
    manifest.write_text(MANIFEST_TEMPLATE.format(version=version))
    return const, manifest


def run_bump(tmp_path, monkeypatch, capsys, *args: str) -> str:
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(sys, "argv", ["bump_version.py", *args])
    load_script("bump_version").main()
    return capsys.readouterr().out.strip()


def test_bump_patch_updates_const_and_manifest(tmp_path, monkeypatch, capsys) -> None:
    const, manifest = write_version_fixtures(tmp_path, "1.5.5")
    assert run_bump(tmp_path, monkeypatch, capsys) == "1.5.6"
    assert 'VERSION = "1.5.6"' in const.read_text()
    assert '"version": "1.5.6"' in manifest.read_text()


def test_bump_minor_and_major(tmp_path, monkeypatch, capsys) -> None:
    write_version_fixtures(tmp_path, "1.5.5")
    assert run_bump(tmp_path, monkeypatch, capsys, "--bump", "minor") == "1.6.0"
    assert run_bump(tmp_path, monkeypatch, capsys, "--bump", "major") == "2.0.0"


def test_bump_print_current_modifies_nothing(tmp_path, monkeypatch, capsys) -> None:
    const, manifest = write_version_fixtures(tmp_path, "1.5.5")
    assert run_bump(tmp_path, monkeypatch, capsys, "--print-current") == "1.5.5"
    assert 'VERSION = "1.5.5"' in const.read_text()
    assert '"version": "1.5.5"' in manifest.read_text()


def test_update_changelog_rotates_unreleased(tmp_path, monkeypatch, capsys) -> None:
    changelog = tmp_path / "CHANGELOG.md"
    changelog.write_text(
        "# Changelog\n\n## Unreleased\n\n- something new\n\n"
        "## 1.5.5 — 2026-08-01\n\n- old\n"
    )
    monkeypatch.setattr(sys, "argv", ["update_changelog.py", "1.5.6", str(changelog)])
    load_script("update_changelog").main()
    assert capsys.readouterr().out.strip() == "rotated"

    text = changelog.read_text()
    assert "## Unreleased" not in text
    assert "## 1.5.6 — " in text
    assert "- something new" in text


def test_update_changelog_skips_empty_unreleased(tmp_path, monkeypatch, capsys) -> None:
    changelog = tmp_path / "CHANGELOG.md"
    original = "# Changelog\n\n## Unreleased\n\n## 1.5.5 — 2026-08-01\n\n- old\n"
    changelog.write_text(original)
    monkeypatch.setattr(sys, "argv", ["update_changelog.py", "1.5.6", str(changelog)])
    load_script("update_changelog").main()
    assert capsys.readouterr().out.strip() == "skipped"
    assert changelog.read_text() == original


def _git(cwd: Path, *args: str) -> None:
    subprocess.run(
        ["git", "-c", "user.email=t@t", "-c", "user.name=t", *args],
        cwd=cwd,
        check=True,
        capture_output=True,
    )


def test_generate_release_notes(tmp_path, monkeypatch, capsys) -> None:
    _git(tmp_path, "init", "-q")
    (tmp_path / "file").write_text("a")
    _git(tmp_path, "add", "-A")
    _git(tmp_path, "commit", "-qm", "initial commit")
    _git(tmp_path, "tag", "v1.5.5")
    (tmp_path / "file").write_text("b")
    _git(tmp_path, "add", "-A")
    _git(tmp_path, "commit", "-qm", "fix: a real change")
    (tmp_path / "file").write_text("c")
    _git(tmp_path, "add", "-A")
    _git(tmp_path, "commit", "-qm", "chore(release): v1.5.6 [skip ci]")

    (tmp_path / "CHANGELOG.md").write_text(
        "# Changelog\n\n## 1.5.6 — 2026-08-06\n\n- highlight entry\n"
    )

    monkeypatch.chdir(tmp_path)
    monkeypatch.setenv("GITHUB_REPOSITORY", "kedube/ha-maintenance_tracker")
    monkeypatch.setattr(sys, "argv", ["generate_release_notes.py", "1.5.6", "notes.md"])
    load_script("generate_release_notes").main()
    capsys.readouterr()

    notes = (tmp_path / "notes.md").read_text()
    assert "## Highlights" in notes
    assert "- highlight entry" in notes
    assert "fix: a real change" in notes
    assert "chore(release)" not in notes
    assert "https://github.com/kedube/ha-maintenance_tracker/compare/v1.5.5...v1.5.6" in notes
