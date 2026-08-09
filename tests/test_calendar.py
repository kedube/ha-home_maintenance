"""Tests for the due-date calendar."""

from datetime import timedelta

from homeassistant.util import dt as dt_util

from custom_components.home_maintenance import HomeMaintenanceData
from custom_components.home_maintenance.const import DOMAIN
from custom_components.home_maintenance.store import HomeMaintenanceTask

CALENDAR_ENTITY = "calendar.home_maintenance"


def make_task(**overrides) -> HomeMaintenanceTask:
    """Build a task due 5 days from now by default."""
    defaults = {
        "id": "home_maintenance_cal_test",
        "title": "Flush Water Heater",
        "interval_value": 30,
        "interval_type": "days",
        "last_performed": (dt_util.now() - timedelta(days=25)).isoformat(),
    }
    defaults.update(overrides)
    return HomeMaintenanceTask(**defaults)


async def get_events(hass, days_back: int = 30, days_ahead: int = 60) -> list[dict]:
    """Fetch calendar events via the calendar.get_events service."""
    response = await hass.services.async_call(
        "calendar",
        "get_events",
        {
            "entity_id": CALENDAR_ENTITY,
            "start_date_time": (dt_util.now() - timedelta(days=days_back)).isoformat(),
            "end_date_time": (dt_util.now() + timedelta(days=days_ahead)).isoformat(),
        },
        blocking=True,
        return_response=True,
    )
    return response[CALENDAR_ENTITY]["events"]


async def test_calendar_entity_created(hass, setup_entry) -> None:
    state = hass.states.get(CALENDAR_ENTITY)
    assert state is not None
    assert state.state == "off"
    assert await get_events(hass) == []


async def test_time_task_appears_as_all_day_event(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(make_task(description="Drain and refill"))
    await hass.async_block_till_done()

    events = await get_events(hass)
    assert len(events) == 1
    event = events[0]
    assert event["summary"] == "Flush Water Heater"
    assert event["description"] == "Drain and refill"
    expected_date = (dt_util.now() + timedelta(days=5)).date()
    assert event["start"] == expected_date.isoformat()
    assert event["end"] == (expected_date + timedelta(days=1)).isoformat()

    # Upcoming but not active today
    state = hass.states.get(CALENDAR_ENTITY)
    assert state.state == "off"
    assert state.attributes["message"] == "Flush Water Heater"
    assert state.attributes["all_day"] is True


async def test_task_due_today_turns_calendar_on(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(
        make_task(last_performed=(dt_util.now() - timedelta(days=30)).isoformat())
    )
    await hass.async_block_till_done()

    state = hass.states.get(CALENDAR_ENTITY)
    assert state.state == "on"


async def test_overdue_task_stays_on_original_date(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(
        make_task(last_performed=(dt_util.now() - timedelta(days=40)).isoformat())
    )
    await hass.async_block_till_done()

    events = await get_events(hass)
    assert len(events) == 1
    expected_date = (dt_util.now() - timedelta(days=10)).date()
    assert events[0]["start"] == expected_date.isoformat()

    # A past event is not the calendar's current/next event
    state = hass.states.get(CALENDAR_ENTITY)
    assert state.state == "off"
    assert "message" not in state.attributes


async def test_undated_tasks_excluded(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(
        make_task(
            id="home_maintenance_count",
            title="Descale Coffee Machine",
            trigger_type="count",
            count_entity_id="switch.coffee",
            count_threshold=60,
        )
    )
    data.store.add(
        make_task(
            id="home_maintenance_runtime",
            title="Service Generator",
            trigger_type="runtime",
            runtime_entity_id="sensor.generator_hours",
            runtime_threshold=50,
        )
    )
    await hass.async_block_till_done()

    assert await get_events(hass) == []


async def test_events_track_task_changes(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(make_task())
    await hass.async_block_till_done()
    assert len(await get_events(hass)) == 1

    # Completing the task moves the event to the new due date
    data.store.update_last_performed("home_maintenance_cal_test")
    await hass.async_block_till_done()
    events = await get_events(hass)
    expected_date = (dt_util.now() + timedelta(days=30)).date()
    assert events[0]["start"] == expected_date.isoformat()

    # The calendar's next-event attributes follow along
    state = hass.states.get(CALENDAR_ENTITY)
    assert state.attributes["start_time"].startswith(expected_date.isoformat())

    # Removing the task removes the event
    data.store.delete("home_maintenance_cal_test")
    await hass.async_block_till_done()
    assert await get_events(hass) == []


async def test_soonest_task_is_next_event(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    data.store.add(make_task())  # due in 5 days
    data.store.add(
        make_task(
            id="home_maintenance_sooner",
            title="Water Plants",
            interval_value=7,
            last_performed=(dt_util.now() - timedelta(days=5)).isoformat(),
        )
    )  # due in 2 days
    await hass.async_block_till_done()

    state = hass.states.get(CALENDAR_ENTITY)
    assert state.attributes["message"] == "Water Plants"

    events = await get_events(hass)
    assert [event["summary"] for event in events] == [
        "Water Plants",
        "Flush Water Heater",
    ]
