"""Websocket commands for the Home Maintenance integration."""

from __future__ import annotations

import uuid
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import connection, messages
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    SIGNAL_TASKS_CHANGED,
    VERSION,
)
from .store import HomeMaintenanceTask

if TYPE_CHECKING:
    from .store import TaskStore

TRIGGER_TYPES = ["time", "count", "runtime"]
INTERVAL_TYPES = ["days", "weeks", "months"]

# Explicit whitelist schema for task updates: the API cannot touch managed
# fields (id, current_count, runtime_baseline) or unknown attributes.
UPDATES_SCHEMA = vol.Schema(
    {
        vol.Optional("title"): str,
        vol.Optional("trigger_type"): vol.In(TRIGGER_TYPES),
        vol.Optional("interval_value"): int,
        vol.Optional("interval_type"): vol.In(INTERVAL_TYPES),
        vol.Optional("last_performed"): vol.Any(str, None),
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("labels"): [str],
        vol.Optional("tag_id"): vol.Any(str, None),
        vol.Optional("area_id"): vol.Any(str, None),
        vol.Optional("description"): vol.Any(str, None),
        vol.Optional("count_entity_id"): vol.Any(str, None),
        vol.Optional("count_threshold"): vol.Coerce(int),
        vol.Optional("runtime_entity_id"): vol.Any(str, None),
        vol.Optional("runtime_threshold"): vol.Coerce(float),
    }
)


def _get_store(hass: HomeAssistant) -> TaskStore:
    return hass.data[DOMAIN].store


def _normalize_last_performed(last_str: str | None) -> str | None:
    """Return a midnight-floored local ISO date, or None if unparseable."""
    if last_str:
        parsed = dt_util.parse_datetime(last_str)
        if parsed is None:
            return None
        parsed_local = dt_util.as_local(parsed)
    else:
        parsed_local = dt_util.now()
    return parsed_local.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()


def _validate_trigger_fields(msg: dict[str, Any]) -> str | None:
    """Server-side validation of trigger-specific required fields."""
    trigger_type = msg.get("trigger_type", "time")
    if trigger_type == "count":
        if not msg.get("count_entity_id") or msg.get("count_threshold", 0) <= 0:
            return "count tasks require count_entity_id and a positive threshold"
    elif trigger_type == "runtime" and (
        not msg.get("runtime_entity_id") or msg.get("runtime_threshold", 0) <= 0
    ):
        return "runtime tasks require runtime_entity_id and a positive threshold"
    return None


@callback
def websocket_get_tasks(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Get all tasks."""
    connection.send_result(msg["id"], _get_store(hass).get_all())


@callback
def websocket_get_task(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Get single tasks."""
    result = _get_store(hass).get(msg["task_id"])
    if result is None:
        connection.send_error(msg["id"], "not_found", "Task not found")
        return
    connection.send_result(msg["id"], result)


@callback
def websocket_add_task(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Add a new task."""
    store = _get_store(hass)

    last_performed = _normalize_last_performed(msg.get("last_performed"))
    if last_performed is None:
        connection.send_error(
            msg["id"], "invalid_date", f"Could not parse date: {msg['last_performed']}"
        )
        return

    if (error := _validate_trigger_fields(msg)) is not None:
        connection.send_error(msg["id"], "invalid_input", error)
        return

    new_task = HomeMaintenanceTask(
        id=f"home_maintenance_{uuid.uuid4().hex}",
        title=msg["title"],
        interval_value=msg["interval_value"],
        interval_type=msg["interval_type"],
        last_performed=last_performed,
        tag_id=msg.get("tag_id"),
        icon=msg.get("icon"),
        trigger_type=msg.get("trigger_type", "time"),
        count_entity_id=msg.get("count_entity_id"),
        count_threshold=msg.get("count_threshold", 0),
        runtime_entity_id=msg.get("runtime_entity_id"),
        runtime_threshold=float(msg.get("runtime_threshold") or 0),
        area_id=msg.get("area_id"),
        description=msg.get("description"),
    )

    new_id = store.add(new_task, msg.get("labels", []))
    connection.send_result(msg["id"], {"success": True, "id": new_id})


@callback
def websocket_update_task(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Update a tasks values."""
    store = _get_store(hass)
    updates = dict(msg.get("updates", {}))

    if "last_performed" in updates:
        last_performed = _normalize_last_performed(updates["last_performed"])
        if last_performed is None:
            connection.send_error(
                msg["id"],
                "invalid_date",
                f"Could not parse date: {updates['last_performed']}",
            )
            return
        updates["last_performed"] = last_performed

    store.update_task(msg["task_id"], updates)
    connection.send_result(msg["id"], {"success": True})


@callback
def websocket_complete_task(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Mark a task as completed."""
    _get_store(hass).update_last_performed(msg["task_id"])
    connection.send_result(msg["id"], {"success": True})


@callback
def websocket_remove_task(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Remove a task."""
    _get_store(hass).delete(msg["task_id"])
    connection.send_result(msg["id"], {"success": True})


@callback
def websocket_increment_count(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Increment the count for a count-based task."""
    _get_store(hass).increment_count(msg["task_id"])
    connection.send_result(msg["id"], {"success": True})


@callback
def websocket_reset_count(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Reset the count for a count-based task."""
    _get_store(hass).reset_count(msg["task_id"])
    connection.send_result(msg["id"], {"success": True})


@callback
def websocket_subscribe_updates(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Push an event to the subscriber whenever tasks change."""

    @callback
    def forward_update() -> None:
        connection.send_message(
            websocket_api.event_message(msg["id"], {"event": "tasks_changed"})
        )

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_TASKS_CHANGED, forward_update
    )
    connection.send_result(msg["id"])


@callback
def websocket_get_config(
    hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Retrieve integration configuration."""
    entries = hass.config_entries.async_entries(DOMAIN)

    if not entries:
        connection.send_error(
            msg["id"], "not_found", "No config entry found for home_maintenance"
        )
        return

    entry = entries[0]

    connection.send_result(
        msg["id"],
        {
            "data": dict(entry.data),
            "options": dict(entry.options),
            "version": VERSION,
        },
    )


async def async_register_websockets(hass: HomeAssistant) -> None:
    """Register websocket commands."""
    websocket_api.async_register_command(
        hass,
        "home_maintenance/get_tasks",
        websocket_get_tasks,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "home_maintenance/get_tasks"}
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/get_task",
        websocket_get_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/get_task",
                vol.Required("task_id"): str,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/add_task",
        websocket_add_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/add_task",
                vol.Required("title"): str,
                vol.Required("interval_value"): int,
                vol.Required("interval_type"): vol.In(INTERVAL_TYPES),
                vol.Optional("last_performed"): str,
                vol.Optional("tag_id"): str,
                vol.Optional("icon"): str,
                vol.Optional("labels"): [str],
                vol.Optional("trigger_type"): vol.In(TRIGGER_TYPES),
                vol.Optional("count_entity_id"): str,
                vol.Optional("count_threshold"): int,
                vol.Optional("runtime_entity_id"): str,
                vol.Optional("runtime_threshold"): vol.Coerce(float),
                vol.Optional("area_id"): vol.Any(str, None),
                vol.Optional("description"): vol.Any(str, None),
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/update_task",
        websocket_update_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/update_task",
                vol.Required("task_id"): str,
                vol.Required("updates"): UPDATES_SCHEMA,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/complete_task",
        websocket_complete_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/complete_task",
                vol.Required("task_id"): str,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/remove_task",
        websocket_remove_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/remove_task",
                vol.Required("task_id"): str,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/increment_count",
        websocket_increment_count,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/increment_count",
                vol.Required("task_id"): str,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/reset_count",
        websocket_reset_count,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/reset_count",
                vol.Required("task_id"): str,
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/subscribe_updates",
        websocket_subscribe_updates,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/subscribe_updates",
            }
        ),
    )

    websocket_api.async_register_command(
        hass,
        "home_maintenance/get_config",
        websocket_get_config,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "home_maintenance/get_config",
            }
        ),
    )
