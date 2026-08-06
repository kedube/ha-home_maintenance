"""
Trigger-type strategies for Home Maintenance tasks.

Each task has a trigger type (time, count, or runtime) that controls when the
task becomes due, what progress it reports, and what completing it means. All
of that per-type logic lives here so the store, the entities, and the
websocket API share a single implementation.
"""

from __future__ import annotations

from datetime import datetime, timedelta
from typing import TYPE_CHECKING

from dateutil.relativedelta import relativedelta
from homeassistant.util import dt as dt_util

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .store import HomeMaintenanceTask

UNAVAILABLE_STATES = ("unknown", "unavailable")


def _midnight(value: datetime) -> datetime:
    return value.replace(hour=0, minute=0, second=0, microsecond=0)


class TimeTrigger:
    """Due when the configured interval since last_performed has elapsed."""

    type = "time"

    def watched_entity(self, task: HomeMaintenanceTask) -> str | None:
        """Return the entity this trigger monitors, if any."""
        return None

    def initialize(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Set up trigger-specific state when a task is created or retyped."""

    def on_complete(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Apply trigger-specific effects of completing the task."""

    def next_due(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> datetime | None:
        """Return the datetime the task becomes due, if computable."""
        last = (
            dt_util.parse_datetime(task.last_performed) if task.last_performed else None
        )
        if last is None:
            return None
        if last.tzinfo is None:
            last = dt_util.as_utc(last)

        if task.interval_type == "days":
            due = last + timedelta(days=task.interval_value)
        elif task.interval_type == "weeks":
            due = last + timedelta(weeks=task.interval_value)
        elif task.interval_type == "months":
            due = last + relativedelta(months=task.interval_value)
        else:
            due = last
        return _midnight(due)

    def is_due(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> bool:
        """Return whether the task is currently due."""
        due = self.next_due(hass, task)
        if due is None:
            return True
        return _midnight(dt_util.now()) >= due

    def progress(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> tuple[float, float] | None:
        """Return (current, target) progress toward due, if applicable."""
        return None

    def extra_attributes(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> dict:
        """Return trigger-specific entity attributes."""
        due = self.next_due(hass, task)
        return {
            "interval_value": task.interval_value,
            "interval_type": task.interval_type,
            "next_due": due.isoformat() if due else "unknown",
        }


class CountTrigger(TimeTrigger):
    """Due when a monitored entity has turned on a threshold number of times."""

    type = "count"

    def watched_entity(self, task: HomeMaintenanceTask) -> str | None:
        """Return the entity this trigger monitors, if any."""
        return task.count_entity_id

    def initialize(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Set up trigger-specific state when a task is created or retyped."""
        task.current_count = 0

    def on_complete(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Reset the counter when the task is completed."""
        task.current_count = 0

    def next_due(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> datetime | None:
        """Count-based tasks have no date-based due point."""
        return None

    def is_due(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> bool:
        """Return whether the task is currently due."""
        return task.count_threshold > 0 and task.current_count >= task.count_threshold

    def progress(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> tuple[float, float] | None:
        """Return (current, target) progress toward due."""
        return (task.current_count, task.count_threshold)

    def extra_attributes(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> dict:
        """Return trigger-specific entity attributes."""
        return {
            "current_count": task.current_count,
            "count_threshold": task.count_threshold,
            "count_entity_id": task.count_entity_id,
        }


class RuntimeTrigger(TimeTrigger):
    """Due when a numeric sensor has accumulated a threshold since baseline."""

    type = "runtime"

    def watched_entity(self, task: HomeMaintenanceTask) -> str | None:
        """Return the entity this trigger monitors, if any."""
        return task.runtime_entity_id

    def current_value(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> float | None:
        """Return the monitored sensor's numeric value, if available."""
        if not task.runtime_entity_id:
            return None
        state = hass.states.get(task.runtime_entity_id)
        if state is None or state.state in UNAVAILABLE_STATES:
            return None
        try:
            return float(state.state)
        except (ValueError, TypeError):
            return None

    def delta(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> float:
        """Return accumulation since baseline, tolerating external resets."""
        value = self.current_value(hass, task)
        if value is None:
            return 0
        # A value below the recorded baseline means the source sensor was
        # reset externally; treat the baseline as 0 so progress stays sane.
        baseline = task.runtime_baseline if value >= task.runtime_baseline else 0
        return round(value - baseline, 2)

    def initialize(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Capture the sensor's current value as the baseline."""
        task.runtime_baseline = self.current_value(hass, task) or 0.0

    def on_complete(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Re-baseline at the sensor's current value on completion."""
        value = self.current_value(hass, task)
        if value is not None:
            task.runtime_baseline = value

    def next_due(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> datetime | None:
        """Runtime-based tasks have no date-based due point."""
        return None

    def is_due(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> bool:
        """Return whether the task is currently due."""
        if task.runtime_threshold <= 0:
            return False
        if self.current_value(hass, task) is None:
            return False
        return self.delta(hass, task) >= task.runtime_threshold

    def progress(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> tuple[float, float] | None:
        """Return (current, target) progress toward due."""
        return (self.delta(hass, task), task.runtime_threshold)

    def extra_attributes(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> dict:
        """Return trigger-specific entity attributes."""
        value = self.current_value(hass, task)
        return {
            "runtime_entity_id": task.runtime_entity_id,
            "runtime_threshold": task.runtime_threshold,
            "runtime_baseline": task.runtime_baseline,
            "runtime_current": value,
            "runtime_delta": self.delta(hass, task),
        }


TRIGGERS: dict[str, TimeTrigger] = {
    trigger.type: trigger
    for trigger in (TimeTrigger(), CountTrigger(), RuntimeTrigger())
}


def get_trigger(trigger_type: str | None) -> TimeTrigger:
    """Return the strategy for a trigger type, defaulting to time-based."""
    return TRIGGERS.get(trigger_type or "time", TRIGGERS["time"])
