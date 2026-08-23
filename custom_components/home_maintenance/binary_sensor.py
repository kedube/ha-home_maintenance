"""Support for Home Maintenance binary sensors."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

from homeassistant.components.binary_sensor import BinarySensorEntity
from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.event import async_track_point_in_time
from homeassistant.util import dt as dt_util

from . import const
from .store import task_event_data
from .triggers import get_trigger

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import CALLBACK_TYPE, HomeAssistant
    from homeassistant.helpers.device_registry import DeviceInfo
    from homeassistant.helpers.entity_platform import AddEntitiesCallback

    from .store import HomeMaintenanceTask, TaskStore

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Home Maintenance binary sensor platform."""
    store: TaskStore = entry.runtime_data.store

    async_add_entities(
        HomeMaintenanceSensor(hass, store, task.id) for task in store.tasks.values()
    )

    @callback
    def handle_task_added(task: HomeMaintenanceTask, labels: list[str]) -> None:
        async_add_entities([HomeMaintenanceSensor(hass, store, task.id, labels=labels)])

    @callback
    def handle_task_removed(task_id: str) -> None:
        registry = er.async_get(hass)
        entity_id = registry.async_get_entity_id("binary_sensor", const.DOMAIN, task_id)
        if entity_id:
            registry.async_remove(entity_id)

    entry.async_on_unload(
        async_dispatcher_connect(hass, const.SIGNAL_TASK_ADDED, handle_task_added)
    )
    entry.async_on_unload(
        async_dispatcher_connect(hass, const.SIGNAL_TASK_REMOVED, handle_task_removed)
    )


class HomeMaintenanceSensor(BinarySensorEntity):
    """
    A maintenance task, on while the task is due.

    The entity is a thin view over the task object in the TaskStore — it holds
    no task state of its own. Updates are pushed via dispatcher signals, and
    time-based tasks additionally schedule a wall-clock callback at their due
    moment so the state flips exactly on time.
    """

    _attr_should_poll = False

    def __init__(
        self,
        hass: HomeAssistant,
        store: TaskStore,
        task_id: str,
        labels: list[str] | None = None,
    ) -> None:
        """Initialize the Home Maintenance sensor."""
        self.hass = hass
        self._store = store
        self._task_id = task_id
        self._labels = labels or []
        self._due_timer: CALLBACK_TYPE | None = None
        self._attr_unique_id = task_id
        self._update_state()

    @property
    def task(self) -> HomeMaintenanceTask | None:
        """Return the task backing this sensor."""
        return self._store.tasks.get(self._task_id)

    @property
    def device_info(self) -> DeviceInfo:
        """Return device information for this sensor."""
        return const.device_info()

    @property
    def icon(self) -> str | None:
        """Return the icon for the task."""
        task = self.task
        return (task.icon if task else None) or "mdi:calendar-check"

    def _update_state(self) -> None:
        """Recompute state and attributes from the store's task object."""
        task = self.task
        if task is None:
            return

        trigger = get_trigger(task.trigger_type)
        self._attr_name = task.title
        self._attr_is_on = trigger.is_due(self.hass, task)
        attributes = {
            "trigger_type": trigger.type,
            "last_performed": task.last_performed or "",
            "description": task.description,
            **trigger.extra_attributes(self.hass, task),
        }
        if task.tag_id:
            attributes["tag_id"] = task.tag_id
        self._attr_extra_state_attributes = attributes

    def _fire_due_event(self) -> None:
        """Announce the task turning due, for event-triggered automations."""
        task = self.task
        if task is None:
            return
        self.hass.bus.async_fire(
            const.EVENT_TASK_DUE, task_event_data(task, self.entity_id)
        )

    @callback
    def _refresh_state(self) -> None:
        """Recompute and publish state, announcing a not-due → due flip."""
        was_due = bool(self._attr_is_on)
        self._update_state()
        self.async_write_ha_state()
        if not was_due and self._attr_is_on:
            self._fire_due_event()

    @callback
    def _handle_task_updated(self) -> None:
        self._refresh_state()
        self._schedule_due_refresh()

    def _schedule_due_refresh(self) -> None:
        """Schedule a state refresh at the moment a time-based task comes due."""
        if self._due_timer is not None:
            self._due_timer()
            self._due_timer = None

        task = self.task
        if task is None:
            return
        due = get_trigger(task.trigger_type).next_due(self.hass, task)
        if due is None or due <= dt_util.now():
            return

        @callback
        def _refresh(_now: object) -> None:
            self._due_timer = None
            self._refresh_state()

        self._due_timer = async_track_point_in_time(self.hass, _refresh, due)

    async def async_added_to_hass(self) -> None:
        """Run when entity is added to Home Assistant."""
        registry = er.async_get(self.hass)
        entry = registry.async_get(self.entity_id)
        if self._labels and entry:
            registry.async_update_entity(self.entity_id, labels=set(self._labels))
        task = self.task
        # Apply the task's area only when the entity has no area yet (initial
        # creation). On later startups the registry already holds an area,
        # which the user may have changed via the entity settings — do not
        # revert that on every restart.
        if task and task.area_id and entry and entry.area_id is None:
            registry.async_update_entity(self.entity_id, area_id=task.area_id)

        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                const.signal_task_updated(self._task_id),
                self._handle_task_updated,
            )
        )
        self._schedule_due_refresh()

    async def async_will_remove_from_hass(self) -> None:
        """Cancel the scheduled due refresh."""
        if self._due_timer is not None:
            self._due_timer()
            self._due_timer = None
