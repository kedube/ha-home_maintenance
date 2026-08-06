"""Bump the integration version in const.py and manifest.json, print it."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

CONST_PATH = Path("custom_components/home_maintenance/const.py")
MANIFEST_PATH = Path("custom_components/home_maintenance/manifest.json")
VERSION_RE = re.compile(r'^(VERSION\s*=\s*")(\d+)\.(\d+)\.(\d+)(")', re.MULTILINE)
MANIFEST_VERSION_RE = re.compile(r'("version"\s*:\s*")([^"]+)(")')


def main() -> int:
    """Update const.py in place and print the resulting version."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--bump",
        choices=("patch", "minor", "major"),
        default="patch",
        help="Bump type: patch (default, the automatic release path), minor, or major",
    )
    parser.add_argument(
        "--print-current",
        action="store_true",
        help="Print the current version without modifying anything",
    )
    args = parser.parse_args()

    text = CONST_PATH.read_text(encoding="utf-8")
    match = VERSION_RE.search(text)
    if match is None:
        msg = f"Could not locate VERSION in {CONST_PATH}"
        raise ValueError(msg)

    major, minor, patch = int(match[2]), int(match[3]), int(match[4])
    if args.print_current:
        print(f"{major}.{minor}.{patch}")
        return 0

    if args.bump == "major":
        major, minor, patch = major + 1, 0, 0
    elif args.bump == "minor":
        minor, patch = minor + 1, 0
    else:
        patch += 1

    new_version = f"{major}.{minor}.{patch}"
    updated = VERSION_RE.sub(rf"\g<1>{new_version}\g<5>", text, count=1)
    CONST_PATH.write_text(updated, encoding="utf-8")

    manifest_text = MANIFEST_PATH.read_text(encoding="utf-8")
    manifest_updated, replacements = MANIFEST_VERSION_RE.subn(
        rf"\g<1>{new_version}\g<3>", manifest_text, count=1
    )
    if replacements != 1:
        msg = f"Could not locate the version field in {MANIFEST_PATH}"
        raise ValueError(msg)
    MANIFEST_PATH.write_text(manifest_updated, encoding="utf-8")

    print(new_version)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
