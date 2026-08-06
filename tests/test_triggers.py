"""Tests for the trigger strategies."""

from datetime import timedelta

from homeassistant.util import dt as dt_util

from custom_components.home_maintenance.store import HomeMaintenanceTask
from custom_components.home_maintenance.triggers import get_trigger


def make_task(**overrides) -> HomeMaintenanceTask:
    """Build a task with sensible defaults."""
    defaults = {
        "id": "home_maintenance_test",
        "title": "Test Task",
        "interval_value": 90,
        "interval_type": "days",
        "last_performed": (dt_util.now() - timedelta(days=10)).isoformat(),
    }
    defaults.update(overrides)
    return HomeMaintenanceTask(**defaults)


def days_ago(days: int) -> str:
    return (dt_util.now() - timedelta(days=days)).isoformat()


async def test_get_trigger_defaults_to_time(hass) -> None:
    assert get_trigger(None).type == "time"
    assert get_trigger("bogus").type == "time"
    assert get_trigger("count").type == "count"
    assert get_trigger("runtime").type == "runtime"


async def test_time_trigger_due_and_not_due(hass) -> None:
    trigger = get_trigger("time")

    overdue = make_task(last_performed=days_ago(100), interval_value=90)
    assert trigger.is_due(hass, overdue) is True

    fresh = make_task(last_performed=days_ago(10), interval_value=90)
    assert trigger.is_due(hass, fresh) is False


async def test_time_trigger_weeks_and_months(hass) -> None:
    trigger = get_trigger("time")

    due_weeks = make_task(
        last_performed=days_ago(15), interval_value=2, interval_type="weeks"
    )
    assert trigger.is_due(hass, due_weeks) is True

    fresh_months = make_task(
        last_performed=days_ago(15), interval_value=1, interval_type="months"
    )
    assert trigger.is_due(hass, fresh_months) is False


async def test_time_trigger_unparseable_date_is_due(hass) -> None:
    trigger = get_trigger("time")
    task = make_task(last_performed="not-a-date")
    assert trigger.next_due(hass, task) is None
    assert trigger.is_due(hass, task) is True


async def test_time_trigger_next_due(hass) -> None:
    trigger = get_trigger("time")
    task = make_task(last_performed=days_ago(10), interval_value=30)
    due = trigger.next_due(hass, task)
    assert due is not None
    expected = (dt_util.now() + timedelta(days=20)).date()
    assert due.date() == expected


async def test_count_trigger(hass) -> None:
    trigger = get_trigger("count")
    task = make_task(
        trigger_type="count",
        count_entity_id="binary_sensor.door",
        count_threshold=3,
        current_count=2,
    )

    assert trigger.is_due(hass, task) is False
    assert trigger.progress(hass, task) == (2, 3)

    task.current_count = 3
    assert trigger.is_due(hass, task) is True

    trigger.on_complete(hass, task)
    assert task.current_count == 0
    assert trigger.is_due(hass, task) is False


async def test_count_trigger_zero_threshold_never_due(hass) -> None:
    trigger = get_trigger("count")
    task = make_task(trigger_type="count", count_threshold=0, current_count=100)
    assert trigger.is_due(hass, task) is False


async def test_runtime_trigger_delta_and_due(hass) -> None:
    trigger = get_trigger("runtime")
    task = make_task(
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=20,
        runtime_baseline=100,
    )

    hass.states.async_set("sensor.pump_hours", "115.5")
    assert trigger.delta(hass, task) == 15.5
    assert trigger.is_due(hass, task) is False

    hass.states.async_set("sensor.pump_hours", "120.5")
    assert trigger.delta(hass, task) == 20.5
    assert trigger.is_due(hass, task) is True


async def test_runtime_trigger_external_reset(hass) -> None:
    """A sensor value below the baseline counts from zero."""
    trigger = get_trigger("runtime")
    task = make_task(
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=20,
        runtime_baseline=100,
    )

    hass.states.async_set("sensor.pump_hours", "5")
    assert trigger.delta(hass, task) == 5
    assert trigger.is_due(hass, task) is False


async def test_runtime_trigger_unavailable_sensor(hass) -> None:
    trigger = get_trigger("runtime")
    task = make_task(
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=20,
        runtime_baseline=0,
    )

    assert trigger.is_due(hass, task) is False

    hass.states.async_set("sensor.pump_hours", "unavailable")
    assert trigger.current_value(hass, task) is None
    assert trigger.is_due(hass, task) is False


async def test_runtime_trigger_on_complete_rebaselines(hass) -> None:
    trigger = get_trigger("runtime")
    task = make_task(
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=20,
        runtime_baseline=100,
    )

    hass.states.async_set("sensor.pump_hours", "130")
    trigger.on_complete(hass, task)
    assert task.runtime_baseline == 130
    assert trigger.delta(hass, task) == 0
