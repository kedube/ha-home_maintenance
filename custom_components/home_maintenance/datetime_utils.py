"""
Shared date/time helpers.

`last_performed` and `snooze_until` are stored as local-midnight ISO strings
with a fixed UTC offset. Parsing them back consistently — treating a naive
value as local, and re-resolving the offset against the current zone so
interval arithmetic survives DST transitions — is subtle enough that every
call site must use the same helper rather than re-deriving it.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.util import dt as dt_util

if TYPE_CHECKING:
    from datetime import datetime


def parse_local_datetime(value: str | None) -> datetime | None:
    """
    Parse a stored ISO datetime into an aware local datetime, or None.

    A naive value is taken as local time (not UTC). An aware value is
    converted to the local zone. The result is re-anchored to the current
    local zone so that later interval arithmetic (add days/weeks/months,
    then floor to local midnight) does not carry a stale fixed offset across
    a DST boundary — which would otherwise shift the due date by a day.
    """
    if not value:
        return None
    parsed = dt_util.parse_datetime(value)
    if parsed is None:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=dt_util.get_default_time_zone())
    return dt_util.as_local(parsed)
