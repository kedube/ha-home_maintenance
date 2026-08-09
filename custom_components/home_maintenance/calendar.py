"""
Calendar of upcoming Home Maintenance due dates.

A single calendar entity exposes one all-day event per time-based task on its
next due date. Count- and runtime-based tasks have no date and are excluded,
matching the panel's Next Due column. Only the next occurrence per task is
shown — future recurrences shift whenever a task is completed, so projecting
them would put mostly-wrong dates on the calendar.
"""

from __future__ import annotations

from datetime import timedelta
from typing import TYPE_CHECKING

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.util import dt as dt_util

from . import const
from .triggers import get_trigger

if TYPE_CHECKING:
    from datetime import datetime

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddEntitiesCallback

    from .store import TaskStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Home Maintenance calendar platform."""
    async_add_entities([HomeMaintenanceCalendar(hass, entry.runtime_data.store)])


class HomeMaintenanceCalendar(CalendarEntity):
    """All-day due-date events for every time-based task."""

    _attr_should_poll = False
    _attr_icon = "mdi:calendar-check"

    def __init__(self, hass: HomeAssistant, store: TaskStore) -> None:
        """Initialize the calendar entity."""
        self.hass = hass
        self._store = store
        self._attr_unique_id = f"{const.DOMAIN}_calendar"
        self._attr_name = const.NAME

    @property
    def device_info(self) -> DeviceInfo:
        """Return device information for this calendar."""
        return DeviceInfo(
            identifiers={(const.DOMAIN, const.DEVICE_KEY)},
            name=const.NAME,
            model=const.NAME,
            sw_version=const.VERSION,
            manufacturer=const.MANUFACTURER,
        )

    def _events(self) -> list[CalendarEvent]:
        """Return one all-day event per dated task, soonest first."""
        events = []
        for task in self._store.tasks.values():
            due = get_trigger(task.trigger_type).next_due(self.hass, task)
            if due is None:
                continue
            due_date = dt_util.as_local(due).date()
            events.append(
                CalendarEvent(
                    start=due_date,
                    end=due_date + timedelta(days=1),
                    summary=task.title,
                    description=task.description or None,
                    uid=task.id,
                )
            )
        events.sort(key=lambda event: event.start)
        return events

    @property
    def event(self) -> CalendarEvent | None:
        """Return the active or next upcoming event."""
        today = dt_util.now().date()
        return next(
            (
                event
                for event in self._events()
                if event.end_datetime_local.date() > today
            ),
            None,
        )

    async def async_get_events(
        self,
        hass: HomeAssistant,  # noqa: ARG002
        start_date: datetime,
        end_date: datetime,
    ) -> list[CalendarEvent]:
        """Return events overlapping the requested window."""
        return [
            event
            for event in self._events()
            if event.start_datetime_local < end_date
            and event.end_datetime_local > start_date
        ]

    @callback
    def _handle_tasks_changed(self) -> None:
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        """Subscribe to task changes."""
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, const.SIGNAL_TASKS_CHANGED, self._handle_tasks_changed
            )
        )
