"""Support for Home Maintenance platform."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import TYPE_CHECKING

from homeassistant.components.binary_sensor import DOMAIN as BINARY_SENSOR_PLATFORM
from homeassistant.components.calendar import DOMAIN as CALENDAR_PLATFORM
from homeassistant.components.tag.const import EVENT_TAG_SCANNED
from homeassistant.core import Event, HomeAssistant, ServiceCall, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.util import dt as dt_util

from . import const
from .notifications import NotificationManager
from .panel import (
    async_register_panel,
    async_unregister_panel,
)
from .store import TaskStore
from .triggers import UNAVAILABLE_STATES, get_trigger
from .websocket import async_register_websockets

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import CALLBACK_TYPE
    from homeassistant.helpers.typing import ConfigType

    from .store import HomeMaintenanceTask

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = const.CONFIG_SCHEMA

PLATFORMS = [BINARY_SENSOR_PLATFORM, CALENDAR_PLATFORM]


@dataclass
class HomeMaintenanceData:
    """Runtime data for the Home Maintenance config entry."""

    store: TaskStore
    notifications: NotificationManager | None = None
    unsub_watchers: list[CALLBACK_TYPE] = field(default_factory=list)
    watched_entities: frozenset[str] = frozenset()


type HomeMaintenanceConfigEntry = ConfigEntry[HomeMaintenanceData]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:  # noqa: ARG001
    """Track states and offer events for sensors."""
    return True


async def async_setup_entry(
    hass: HomeAssistant, entry: HomeMaintenanceConfigEntry
) -> bool:
    """Set up the Home Maintenance config entry."""
    # Initialize and load stored tasks
    task_store = TaskStore(hass)
    await task_store.async_load()

    # Register Device
    device_registry = dr.async_get(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(const.DOMAIN, const.DEVICE_KEY)},
        name=const.NAME,
        model=const.NAME,
        sw_version=const.VERSION,
        manufacturer=const.MANUFACTURER,
    )

    data = HomeMaintenanceData(store=task_store)
    entry.runtime_data = data
    # Websocket handlers and the panel are not entry-scoped; give them a
    # typed handle to the same runtime data.
    hass.data[const.DOMAIN] = data

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Register the panel (frontend)
    await async_register_panel(hass, entry)

    # Websocket support
    await async_register_websockets(hass)

    # Register custom services
    register_services(hass)

    # Per-task notifications
    data.notifications = NotificationManager(hass, task_store)
    for unsub in data.notifications.async_setup():
        entry.async_on_unload(unsub)

    @callback
    def handle_tag_scanned_event(event: Event) -> None:
        """Handle when a tag is scanned."""
        tag_id = event.data.get("tag_id")  # Actually tag UUID

        tasks = task_store.get_by_tag_uuid(tag_id)
        if not tasks:
            return

        _LOGGER.debug("Tag scanned: %s", tag_id)

        for task in tasks:
            task_store.update_last_performed(task["id"])

    entry.async_on_unload(
        hass.bus.async_listen(EVENT_TAG_SCANNED, handle_tag_scanned_event)
    )

    # Watch the entities referenced by count- and runtime-based tasks, and
    # re-evaluate the watch list whenever tasks change.
    _async_setup_watchers(hass, data)

    @callback
    def handle_tasks_changed() -> None:
        if _watched_entities(data.store) != data.watched_entities:
            _async_setup_watchers(hass, data)

    entry.async_on_unload(
        async_dispatcher_connect(hass, const.SIGNAL_TASKS_CHANGED, handle_tasks_changed)
    )

    @callback
    def unsub_all_watchers() -> None:
        for unsub in data.unsub_watchers:
            unsub()
        data.unsub_watchers.clear()

    entry.async_on_unload(unsub_all_watchers)

    return True


async def async_unload_entry(
    hass: HomeAssistant, entry: HomeMaintenanceConfigEntry
) -> bool:
    """Unload Home Maintenance config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if not unload_ok:
        return False

    async_unregister_panel(hass)
    for service in (
        const.SERVICE_RESET,
        const.SERVICE_INCREMENT_COUNT,
        const.SERVICE_RESET_COUNT,
        const.SERVICE_SNOOZE_TASK,
        const.SERVICE_SEND_TASK_NOTIFICATION,
    ):
        hass.services.async_remove(const.DOMAIN, service)
    hass.data.pop(const.DOMAIN, None)
    return True


async def async_remove_entry(
    hass: HomeAssistant,
    entry: HomeMaintenanceConfigEntry,  # noqa: ARG001
) -> None:
    """Remove Home Maintenance config entry."""
    async_unregister_panel(hass)
    hass.data.pop(const.DOMAIN, None)


async def async_migrate_entry(
    hass: HomeAssistant,  # noqa: ARG001
    entry: HomeMaintenanceConfigEntry,  # noqa: ARG001
) -> bool:
    """Handle migration of config entry."""
    return True


def _task_id_for_entity(hass: HomeAssistant, entity_id: str) -> str | None:
    """Resolve an entity_id to its task id via the entity registry."""
    entry = er.async_get(hass).async_get(entity_id)
    if entry is None or entry.platform != const.DOMAIN:
        return None
    return entry.unique_id


@callback
def register_services(hass: HomeAssistant) -> None:
    """Register services used by home maintenance component."""

    async def async_srv_reset(call: ServiceCall) -> None:
        entity_id = call.data["entity_id"]
        performed_date_str = call.data.get("performed_date")

        performed_date = None
        if performed_date_str is not None:
            parsed_date = dt_util.parse_date(performed_date_str)
            if parsed_date is None:
                msg = f"Could not parse performed_date: {performed_date_str}"
                raise ValueError(msg)
            # Midnight of the given calendar date in the *local* timezone —
            # naive-datetime + as_local would have treated the date as UTC.
            performed_date = dt_util.start_of_local_day(parsed_date)

        task_id = _task_id_for_entity(hass, entity_id)
        if task_id is None:
            return

        data: HomeMaintenanceData = hass.data[const.DOMAIN]
        data.store.update_last_performed(task_id, performed_date)

    hass.services.async_register(
        const.DOMAIN,
        const.SERVICE_RESET,
        async_srv_reset,
        schema=const.SERVICE_RESET_SCHEMA,
    )

    async def async_srv_increment_count(call: ServiceCall) -> None:
        task_id = _task_id_for_entity(hass, call.data["entity_id"])
        if task_id is None:
            return
        data: HomeMaintenanceData = hass.data[const.DOMAIN]
        data.store.increment_count(task_id)

    hass.services.async_register(
        const.DOMAIN,
        const.SERVICE_INCREMENT_COUNT,
        async_srv_increment_count,
        schema=const.SERVICE_INCREMENT_COUNT_SCHEMA,
    )

    async def async_srv_reset_count(call: ServiceCall) -> None:
        task_id = _task_id_for_entity(hass, call.data["entity_id"])
        if task_id is None:
            return
        data: HomeMaintenanceData = hass.data[const.DOMAIN]
        data.store.reset_count(task_id)

    hass.services.async_register(
        const.DOMAIN,
        const.SERVICE_RESET_COUNT,
        async_srv_reset_count,
        schema=const.SERVICE_RESET_COUNT_SCHEMA,
    )

    async def async_srv_snooze_task(call: ServiceCall) -> None:
        task_id = _task_id_for_entity(hass, call.data["entity_id"])
        if task_id is None:
            return
        data: HomeMaintenanceData = hass.data[const.DOMAIN]
        if data.notifications:
            data.notifications.snooze_task(task_id, call.data["days"])

    hass.services.async_register(
        const.DOMAIN,
        const.SERVICE_SNOOZE_TASK,
        async_srv_snooze_task,
        schema=const.SERVICE_SNOOZE_TASK_SCHEMA,
    )

    async def async_srv_send_task_notification(call: ServiceCall) -> None:
        task_id = _task_id_for_entity(hass, call.data["entity_id"])
        if task_id is None:
            return
        data: HomeMaintenanceData = hass.data[const.DOMAIN]
        if data.notifications:
            await data.notifications.async_send_notification(task_id, force=True)

    hass.services.async_register(
        const.DOMAIN,
        const.SERVICE_SEND_TASK_NOTIFICATION,
        async_srv_send_task_notification,
        schema=const.SERVICE_SEND_TASK_NOTIFICATION_SCHEMA,
    )


def _watched_entities(store: TaskStore) -> frozenset[str]:
    """Return the set of entity ids the tasks' triggers monitor."""
    return frozenset(
        entity_id
        for task in store.tasks.values()
        if (entity_id := get_trigger(task.trigger_type).watched_entity(task))
    )


def _runtime_change_is_meaningful(
    task: HomeMaintenanceTask, old_value: float | None, new_value: float
) -> bool:
    """
    Whether a runtime sensor tick warrants a refresh push.

    Runtime sensors can update every few seconds; pushing every tick rewrites
    the entity state and reloads every open panel each time. Only a due-state
    flip or a whole-unit progress change is worth announcing.
    """
    baseline = task.runtime_baseline
    if old_value is None or old_value < baseline:
        return True
    old_delta = old_value - baseline
    new_delta = new_value - baseline
    threshold = task.runtime_threshold
    if threshold > 0 and (old_delta >= threshold) != (new_delta >= threshold):
        return True
    return int(old_delta) != int(new_delta)


@callback
def _async_setup_watchers(hass: HomeAssistant, data: HomeMaintenanceData) -> None:
    """
    (Re)subscribe targeted state listeners for count/runtime tasks.

    Uses async_track_state_change_event keyed to the exact entities the tasks
    reference, so unrelated state changes never reach these callbacks.
    """
    for unsub in data.unsub_watchers:
        unsub()
    data.unsub_watchers.clear()

    store = data.store
    data.watched_entities = _watched_entities(store)

    count_map: dict[str, list[str]] = {}
    runtime_map: dict[str, list[str]] = {}
    for task in store.tasks.values():
        entity_id = get_trigger(task.trigger_type).watched_entity(task)
        if not entity_id:
            continue
        if task.trigger_type == "count":
            count_map.setdefault(entity_id, []).append(task.id)
        elif task.trigger_type == "runtime":
            runtime_map.setdefault(entity_id, []).append(task.id)

    if count_map:

        @callback
        def handle_count_event(event: Event) -> None:
            old_state = event.data.get("old_state")
            new_state = event.data.get("new_state")
            if old_state is None or new_state is None:
                return
            # Only count transitions to "on" state
            if new_state.state != "on" or old_state.state == "on":
                return
            for task_id in count_map.get(event.data["entity_id"], []):
                _LOGGER.debug("Count increment for task %s", task_id)
                store.increment_count(task_id)

        data.unsub_watchers.append(
            async_track_state_change_event(hass, list(count_map), handle_count_event)
        )

    if runtime_map:

        @callback
        def handle_runtime_event(event: Event) -> None:
            new_state = event.data.get("new_state")
            if new_state is None or new_state.state in UNAVAILABLE_STATES:
                return
            try:
                value = float(new_state.state)
            except (ValueError, TypeError):
                return
            old_state = event.data.get("old_state")
            old_value: float | None = None
            if old_state is not None and old_state.state not in UNAVAILABLE_STATES:
                try:
                    old_value = float(old_state.state)
                except (ValueError, TypeError):
                    old_value = None
            for task_id in runtime_map.get(event.data["entity_id"], []):
                task = store.tasks.get(task_id)
                if task is None:
                    continue
                if value < task.runtime_baseline:
                    # External sensor reset — persist a fresh baseline
                    _LOGGER.debug("Runtime reset detected for task %s", task_id)
                    store.update_runtime_baseline(task_id, 0)
                elif _runtime_change_is_meaningful(task, old_value, value):
                    # Push the new delta to the entity and panel
                    async_dispatcher_send(hass, const.SIGNAL_TASK_UPDATED, task_id)

        data.unsub_watchers.append(
            async_track_state_change_event(
                hass, list(runtime_map), handle_runtime_event
            )
        )
