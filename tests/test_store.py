"""Tests for the TaskStore."""

from datetime import timedelta

import pytest
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.home_maintenance.store import (
    STORAGE_KEY,
    HomeMaintenanceTask,
    TaskStore,
)


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


async def test_load_applies_defaults_for_new_fields(hass, hass_storage) -> None:
    """Tasks stored before count/runtime/area/description existed still load."""
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 2,
        "key": STORAGE_KEY,
        "data": [
            {
                "id": "home_maintenance_old",
                "title": "Old Task",
                "interval_value": 30,
                "interval_type": "days",
                "last_performed": "2026-01-01T00:00:00-05:00",
            }
        ],
    }

    store = TaskStore(hass)
    await store.async_load()

    task = store.tasks["home_maintenance_old"]
    assert task.trigger_type == "time"
    assert task.current_count == 0
    assert task.runtime_baseline == 0
    assert task.area_id is None
    assert task.description is None


async def test_add_and_get(hass) -> None:
    store = TaskStore(hass)
    task = make_task()
    assert store.add(task) == task.id

    serialized = store.get(task.id)
    assert serialized is not None
    assert serialized["title"] == "Test Task"
    assert serialized["due"] is False
    assert serialized["next_due"] is not None
    assert serialized["progress_current"] is None

    assert store.get("missing") is None


async def test_update_task_whitelist_blocks_managed_fields(hass) -> None:
    store = TaskStore(hass)
    task = make_task(trigger_type="count", count_threshold=5, current_count=3)
    store.add(task)

    store.update_task(
        task.id,
        {
            "title": "Renamed",
            "id": "hacked_id",
            "current_count": 999,
            "unknown_field": "x",
        },
    )

    assert task.title == "Renamed"
    assert task.id == "home_maintenance_test"
    assert task.current_count in (0, 3)  # never the injected value
    assert store.tasks.get("hacked_id") is None


async def test_update_trigger_type_switch_reinitializes(hass) -> None:
    store = TaskStore(hass)
    task = make_task(trigger_type="count", count_threshold=5, current_count=4)
    store.add(task)
    # add() re-initializes count tasks; simulate accumulated usage
    task.current_count = 4

    hass.states.async_set("sensor.pump_hours", "250")
    store.update_task(
        task.id,
        {
            "trigger_type": "runtime",
            "runtime_entity_id": "sensor.pump_hours",
            "runtime_threshold": 50,
        },
    )

    assert task.trigger_type == "runtime"
    assert task.runtime_baseline == 250

    store.update_task(task.id, {"trigger_type": "count", "count_threshold": 5})
    assert task.current_count == 0


async def test_complete_count_task_resets_counter(hass) -> None:
    store = TaskStore(hass)
    task = make_task(trigger_type="count", count_threshold=3)
    store.add(task)
    task.current_count = 3

    store.update_last_performed(task.id)
    assert task.current_count == 0
    assert task.last_performed.startswith(dt_util.now().date().isoformat())


async def test_complete_runtime_task_rebaselines(hass) -> None:
    store = TaskStore(hass)
    task = make_task(
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=50,
    )
    hass.states.async_set("sensor.pump_hours", "100")
    store.add(task)
    assert task.runtime_baseline == 100

    hass.states.async_set("sensor.pump_hours", "160")
    store.update_last_performed(task.id)
    assert task.runtime_baseline == 160


async def test_increment_and_reset_count(hass) -> None:
    store = TaskStore(hass)
    task = make_task(trigger_type="count", count_threshold=3)
    store.add(task)

    store.increment_count(task.id)
    store.increment_count(task.id)
    assert task.current_count == 2

    store.reset_count(task.id)
    assert task.current_count == 0

    # increment is a no-op for non-count tasks
    other = make_task(id="home_maintenance_other", trigger_type="time")
    store.add(other)
    store.increment_count(other.id)
    assert other.current_count == 0


async def test_delayed_save_flushes_to_storage(hass, hass_storage, freezer) -> None:
    """Mutations coalesce into a delayed write that lands in storage."""
    store = TaskStore(hass)
    task = make_task()
    store.add(task)
    store.increment_count(task.id)  # extra mutation coalesces into one write

    assert STORAGE_KEY not in hass_storage

    freezer.tick(timedelta(seconds=2))
    async_fire_time_changed(hass)
    await hass.async_block_till_done()

    saved = hass_storage[STORAGE_KEY]["data"]
    assert saved["groups"] == []
    assert len(saved["tasks"]) == 1
    assert saved["tasks"][0]["id"] == task.id
    assert saved["tasks"][0]["title"] == "Test Task"


async def test_delete(hass) -> None:
    store = TaskStore(hass)
    task = make_task()
    store.add(task)

    store.delete(task.id)
    assert store.tasks == {}


async def test_load_legacy_list_storage_derives_groups(hass, hass_storage) -> None:
    """Pre-1.3 list-format storage loads, deriving groups from tasks."""
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 2,
        "key": STORAGE_KEY,
        "data": [
            {
                "id": "home_maintenance_old",
                "title": "Old Task",
                "interval_value": 30,
                "interval_type": "days",
                "last_performed": "2026-01-01T00:00:00-05:00",
                "group_id": "Kitchen",
            }
        ],
    }

    store = TaskStore(hass)
    await store.async_load()

    assert store.tasks["home_maintenance_old"].group_id == "Kitchen"
    assert store.get_groups() == ["Kitchen"]


async def test_load_dict_storage_merges_stored_and_derived_groups(
    hass, hass_storage
) -> None:
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 3,
        "key": STORAGE_KEY,
        "data": {
            "tasks": [
                {
                    "id": "home_maintenance_t1",
                    "title": "Task",
                    "interval_value": 30,
                    "interval_type": "days",
                    "last_performed": "2026-01-01T00:00:00-05:00",
                    "group_id": "Garage",
                }
            ],
            "groups": ["Kitchen", "  ", "Garage"],
        },
    }

    store = TaskStore(hass)
    await store.async_load()

    assert store.get_groups() == ["Garage", "Kitchen"]


async def test_create_group_normalizes_and_requires_name(hass) -> None:
    store = TaskStore(hass)

    store.create_group("  Kitchen  ")
    store.create_group("Kitchen")  # duplicate is a no-op
    assert store.get_groups() == ["Kitchen"]

    with pytest.raises(RuntimeError):
        store.create_group("   ")


async def test_add_and_update_register_task_groups(hass) -> None:
    store = TaskStore(hass)
    task = make_task(group_id="  Kitchen ")
    store.add(task)

    assert task.group_id == "Kitchen"
    assert store.get_groups() == ["Kitchen"]

    store.update_task(task.id, {"group_id": "Garage"})
    assert task.group_id == "Garage"
    # The old group survives as an (empty) group; the new one is registered.
    assert store.get_groups() == ["Garage", "Kitchen"]

    store.update_task(task.id, {"group_id": ""})
    assert task.group_id is None


async def test_rename_group_reassigns_members(hass) -> None:
    store = TaskStore(hass)
    member = make_task(id="home_maintenance_member", group_id="Kitchen")
    other = make_task(id="home_maintenance_other", group_id="Garage")
    store.add(member)
    store.add(other)

    store.rename_group("Kitchen", "Cuisine")

    assert member.group_id == "Cuisine"
    assert other.group_id == "Garage"
    assert store.get_groups() == ["Cuisine", "Garage"]

    store.rename_group("Cuisine", "Cuisine")  # same name is a no-op
    assert store.get_groups() == ["Cuisine", "Garage"]


async def test_delete_group_moves_members_to_ungrouped(hass) -> None:
    store = TaskStore(hass)
    member = make_task(id="home_maintenance_member", group_id="Kitchen")
    store.add(member)

    store.delete_group("Kitchen")

    assert member.group_id is None
    assert store.get_groups() == []
