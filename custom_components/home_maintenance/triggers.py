"""
Trigger-type strategies for Home Maintenance tasks.

Each task has a trigger type (time, date, count, or runtime) that controls
when the task becomes due, what progress it reports, and what completing it
means. All of that per-type logic lives here so the store, the entities, and
the websocket API share a single implementation.
"""

from __future__ import annotations

from datetime import timedelta
from typing import TYPE_CHECKING, Any

from dateutil.relativedelta import relativedelta
from homeassistant.util import dt as dt_util

from .datetime_utils import parse_local_datetime

if TYPE_CHECKING:
    from collections.abc import Callable, Mapping
    from datetime import date, datetime

    from homeassistant.core import HomeAssistant

    from .store import HomeMaintenanceTask

UNAVAILABLE_STATES = ("unknown", "unavailable")

# Hard cap on projection loop steps. It bounds the fast-forward over the
# skipped past repetitions of a badly overdue task (~13 years of a daily
# task) without letting a corrupt interval spin forever.
_MAX_PROJECTION_STEPS = 5000


def _parse_anchor(value: str | None) -> date | None:
    """Parse a stored anchor into a calendar date, tolerating datetimes."""
    if not value:
        return None
    return dt_util.parse_date(str(value).split("T")[0])


def _project_future(
    occurrence_at: Callable[[int], date],
    horizon: datetime,
    limit: int,
) -> list[datetime]:
    """
    Shared projection loop for dated triggers.

    Always includes the k=0 occurrence — the real next due date, even when it
    lies in the past (an overdue task) or beyond the horizon. Repetitions
    assume the task is completed on each due date, so a repetition landing in
    the past (a badly overdue task) is meaningless: it is skipped without
    consuming the limit, and the step cap bounds that fast-forward.
    """
    first = dt_util.start_of_local_day(occurrence_at(0))
    today = dt_util.start_of_local_day()
    occurrences = [first]
    previous = first
    for k in range(1, _MAX_PROJECTION_STEPS):
        occurrence = dt_util.start_of_local_day(occurrence_at(k))
        # Stop on a non-advancing (zero-length) interval, defensively.
        if occurrence <= previous:
            break
        previous = occurrence
        if occurrence > horizon:
            break
        if occurrence > today:
            occurrences.append(occurrence)
            if len(occurrences) >= max(limit, 1):
                break
    return occurrences


def _interval_offset(
    interval_type: str, interval_value: int, k: int
) -> timedelta | relativedelta:
    """
    Return the offset of k whole intervals.

    Month/year offsets multiply inside a single relativedelta instead of being
    added repeatedly, so a Jan 31 anchor doesn't drift to the 28th forever
    after passing one February.
    """
    if interval_type == "weeks":
        return timedelta(weeks=interval_value * k)
    if interval_type == "months":
        return relativedelta(months=interval_value * k)
    if interval_type == "years":
        return relativedelta(years=interval_value * k)
    return timedelta(days=interval_value * k)


class TimeTrigger:
    """Due when the configured interval since last_performed has elapsed."""

    type = "time"

    def watched_entity(self, task: HomeMaintenanceTask) -> str | None:
        """Return the entity this trigger monitors, if any."""
        return None

    def validate(self, fields: Mapping[str, Any]) -> str | None:
        """Return an error message when required trigger fields are missing."""
        return None

    def initialize(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Set up trigger-specific state when a task is created or retyped."""

    def on_complete(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """Apply trigger-specific effects of completing the task."""

    def next_due(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> datetime | None:
        """Return the datetime the task becomes due, if computable."""
        last = parse_local_datetime(task.last_performed)
        if last is None:
            return None

        # Add the interval to the local calendar *date*, then rebuild local
        # midnight for the resulting date. Doing the arithmetic on the date
        # (not the aware datetime) means a DST transition inside the interval
        # can't push the due moment onto the neighboring day.
        due_date = last.date() + _interval_offset(
            task.interval_type, task.interval_value, 1
        )
        # start_of_local_day accepts a date and returns local midnight for it.
        return dt_util.start_of_local_day(due_date)

    def is_due(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> bool:
        """Return whether the task is currently due."""
        due = self.next_due(hass, task)
        if due is None:
            return True
        return dt_util.start_of_local_day() >= due

    def upcoming(
        self,
        hass: HomeAssistant,
        task: HomeMaintenanceTask,
        horizon: datetime,
        limit: int,
    ) -> list[datetime]:
        """
        Project due moments: next_due plus future repetitions in the horizon.

        See _project_future for the shared semantics (overdue first
        occurrence kept, past repetitions skipped).
        """
        first = self.next_due(hass, task)
        if first is None:
            return []
        first_date = dt_util.as_local(first).date()
        return _project_future(
            lambda k: (
                first_date
                + _interval_offset(task.interval_type, task.interval_value, k)
            ),
            horizon,
            limit,
        )

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


class DateTrigger(TimeTrigger):
    """
    Due on fixed calendar dates: an anchor date plus interval repetitions.

    Unlike the time trigger, the schedule never shifts: occurrences fall on
    anchor + k * interval regardless of when the task was last completed.
    The next due date is the first occurrence strictly after the last
    completion, so an overdue occurrence stays due until completed after it.
    """

    type = "date"

    def validate(self, fields: Mapping[str, Any]) -> str | None:
        """Return an error message when required trigger fields are missing."""
        if _parse_anchor(fields.get("anchor_date")) is None:
            return "date tasks require a valid anchor_date"
        if (fields.get("interval_value") or 0) <= 0:
            return "date tasks require a positive interval_value"
        return None

    def _anchor(self, task: HomeMaintenanceTask) -> date | None:
        """Return the anchor as a calendar date, or None when unparseable."""
        return _parse_anchor(task.anchor_date)

    def _next_index(self, task: HomeMaintenanceTask) -> int | None:
        """Return k of the first occurrence strictly after the last completion."""
        anchor = self._anchor(task)
        if anchor is None:
            return None
        last = parse_local_datetime(task.last_performed)
        if last is None or last.date() < anchor:
            return 0
        last_date = last.date()
        interval = max(task.interval_value, 1)
        # Land at (or just below) the target analytically, then step the last
        # bit — keeps this O(1)-ish even for a daily anchor set years ago.
        if task.interval_type == "weeks":
            k = (last_date - anchor).days // (7 * interval)
        elif task.interval_type == "months":
            months = (last_date.year - anchor.year) * 12 + (
                last_date.month - anchor.month
            )
            k = max(months // interval - 1, 0)
        elif task.interval_type == "years":
            k = max((last_date.year - anchor.year) // interval - 1, 0)
        else:
            k = (last_date - anchor).days // interval
        while (anchor + _interval_offset(task.interval_type, interval, k)) <= last_date:
            k += 1
        return k

    def next_due(
        self, hass: HomeAssistant, task: HomeMaintenanceTask
    ) -> datetime | None:
        """Return the next fixed occurrence after the last completion."""
        k = self._next_index(task)
        anchor = self._anchor(task)
        if k is None or anchor is None:
            return None
        interval = max(task.interval_value, 1)
        return dt_util.start_of_local_day(
            anchor + _interval_offset(task.interval_type, interval, k)
        )

    def upcoming(
        self,
        hass: HomeAssistant,
        task: HomeMaintenanceTask,
        horizon: datetime,
        limit: int,
    ) -> list[datetime]:
        """
        Project fixed occurrences from the next due date onward.

        Uses the shared _project_future semantics; occurrences stay indexed
        from the anchor (not re-added from the previous occurrence), so
        month-end anchors never drift.
        """
        next_index = self._next_index(task)
        anchor = self._anchor(task)
        if next_index is None or anchor is None:
            return []
        interval = max(task.interval_value, 1)
        return _project_future(
            lambda k: (
                anchor + _interval_offset(task.interval_type, interval, next_index + k)
            ),
            horizon,
            limit,
        )

    def extra_attributes(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> dict:
        """Return trigger-specific entity attributes."""
        return {
            **super().extra_attributes(hass, task),
            "anchor_date": task.anchor_date,
        }


class CountTrigger(TimeTrigger):
    """Due when a monitored entity has turned on a threshold number of times."""

    type = "count"

    def watched_entity(self, task: HomeMaintenanceTask) -> str | None:
        """Return the entity this trigger monitors, if any."""
        return task.count_entity_id

    def validate(self, fields: Mapping[str, Any]) -> str | None:
        """Return an error message when required trigger fields are missing."""
        threshold = fields.get("count_threshold") or 0
        if not fields.get("count_entity_id") or threshold <= 0:
            return "count tasks require count_entity_id and a positive threshold"
        return None

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

    def validate(self, fields: Mapping[str, Any]) -> str | None:
        """Return an error message when required trigger fields are missing."""
        threshold = fields.get("runtime_threshold") or 0
        if not fields.get("runtime_entity_id") or threshold <= 0:
            return "runtime tasks require runtime_entity_id and a positive threshold"
        return None

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
        # A pending (None) baseline hasn't been captured yet — no progress.
        if value is None or task.runtime_baseline is None:
            return 0
        # A value below the recorded baseline means the source sensor was
        # reset externally; treat the baseline as 0 so progress stays sane.
        baseline = task.runtime_baseline if value >= task.runtime_baseline else 0
        return round(value - baseline, 2)

    def initialize(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """
        Capture the sensor's current value as the baseline.

        If the sensor is unavailable, leave the baseline pending (None) so it
        is captured from the first real reading instead of anchoring at 0 and
        turning the sensor's whole lifetime total into accumulated runtime.
        """
        task.runtime_baseline = self.current_value(hass, task)

    def on_complete(self, hass: HomeAssistant, task: HomeMaintenanceTask) -> None:
        """
        Re-baseline at the sensor's current value on completion.

        If the sensor is unavailable, leave the baseline pending rather than
        keeping the stale one (which would pop the task straight back to due
        when the sensor recovers).
        """
        task.runtime_baseline = self.current_value(hass, task)

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
    for trigger in (TimeTrigger(), DateTrigger(), CountTrigger(), RuntimeTrigger())
}


def get_trigger(trigger_type: str | None) -> TimeTrigger:
    """Return the strategy for a trigger type, defaulting to time-based."""
    return TRIGGERS.get(trigger_type or "time", TRIGGERS["time"])
