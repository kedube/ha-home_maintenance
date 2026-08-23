"""
Single source of truth for user-settable task fields.

The websocket add/update schemas and the store's update whitelist are all
generated from TASK_FIELDS so adding a field is a one-line change here rather
than five coordinated edits across the schemas, the whitelist, and the
add-task constructor.
"""

from __future__ import annotations

import voluptuous as vol

from .const import MAX_STRING_LENGTH, NOTIFICATION_URL_SCHEMES, NOTIFY_WHEN_OPTIONS

TRIGGER_TYPES = ["time", "date", "count", "runtime"]
INTERVAL_TYPES = ["days", "weeks", "months", "years"]

# Shared length-bounded string validators; also reused by the websocket
# layer for free-text fields outside the task-field map (e.g. history notes).
bounded_str = vol.All(vol.Coerce(str), vol.Length(max=MAX_STRING_LENGTH))
bounded_str_or_none = vol.Any(None, bounded_str)


def _notification_url(value: object) -> str | None:
    """Validate an optional notification URL: http(s) only, length-bounded."""
    if value in (None, ""):
        return None
    text = str(value)
    if len(text) > MAX_STRING_LENGTH:
        msg = f"notification_url exceeds {MAX_STRING_LENGTH} characters"
        raise vol.Invalid(msg)
    scheme = text.split(":", 1)[0].lower() if ":" in text else ""
    if scheme not in NOTIFICATION_URL_SCHEMES:
        msg = "notification_url must be an http(s) URL"
        raise vol.Invalid(msg)
    return text


# Each entry maps a task field to its voluptuous validator. This drives the
# add_task schema, UPDATES_SCHEMA, and ALLOWED_UPDATE_FIELDS. "labels" is
# handled separately (it lives on the entity registry, not the task).
TASK_FIELD_VALIDATORS: dict[str, object] = {
    "title": bounded_str,
    "trigger_type": vol.In(TRIGGER_TYPES),
    "interval_value": vol.Coerce(int),
    "interval_type": vol.In(INTERVAL_TYPES),
    "last_performed": vol.Any(str, None),
    "anchor_date": bounded_str_or_none,
    "icon": bounded_str_or_none,
    "tag_id": bounded_str_or_none,
    "area_id": bounded_str_or_none,
    "description": bounded_str_or_none,
    "count_entity_id": bounded_str_or_none,
    "count_threshold": vol.Coerce(int),
    "runtime_entity_id": bounded_str_or_none,
    "runtime_threshold": vol.Coerce(float),
    "group_id": bounded_str_or_none,
    "notifications_enabled": bool,
    "notification_target": bounded_str_or_none,
    "notification_time": bounded_str,
    "notification_url": _notification_url,
    "notify_when": vol.In(NOTIFY_WHEN_OPTIONS),
    "notify_days_before_due": vol.Any(None, vol.Coerce(int)),
}

# Fields the store's update_task may write. Everything else (id, current_count,
# runtime_baseline, notification bookkeeping) is integration-managed.
ALLOWED_UPDATE_FIELDS = frozenset(TASK_FIELD_VALIDATORS)

# The subset a client provides when constructing a new task (last_performed
# is normalized separately in websocket_add_task).
ADD_TASK_FIELDS = tuple(
    field for field in TASK_FIELD_VALIDATORS if field != "last_performed"
)
