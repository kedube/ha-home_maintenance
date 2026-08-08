"""Tests for integration setup, entities, watchers, and services."""

from custom_components.home_maintenance import HomeMaintenanceData
from custom_components.home_maintenance.const import (
    DOMAIN,
    SERVICE_INCREMENT_COUNT,
    SERVICE_RESET,
    SERVICE_RESET_COUNT,
)
from custom_components.home_maintenance.store import STORAGE_KEY


def seed_storage(hass_storage, tasks: list[dict]) -> None:
    """Seed the store's persisted data before setup."""
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 2,
        "key": STORAGE_KEY,
        "data": tasks,
    }


async def test_setup_creates_entities_for_stored_tasks(
    hass, hass_storage, setup_entry
) -> None:
    # setup_entry ran with empty storage; add via the store and verify the
    # dispatcher path creates the entity.
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    data.store.add(
        HomeMaintenanceTask(
            id="home_maintenance_abc",
            title="Change Filter",
            interval_value=90,
            interval_type="days",
            last_performed="2020-01-01T00:00:00",
        )
    )
    await hass.async_block_till_done()

    state = hass.states.get("binary_sensor.change_filter")
    assert state is not None
    assert state.state == "on"  # long overdue
    assert state.attributes["trigger_type"] == "time"
    assert state.attributes["interval_value"] == 90


async def test_stored_tasks_create_entities_on_startup(hass, hass_storage) -> None:
    seed_storage(
        hass_storage,
        [
            {
                "id": "home_maintenance_seed",
                "title": "Clean Gutters",
                "interval_value": 30,
                "interval_type": "days",
                "last_performed": "2020-01-01T00:00:00",
            }
        ],
    )

    from unittest.mock import AsyncMock, patch

    from pytest_homeassistant_custom_component.common import MockConfigEntry

    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)
    with (
        patch(
            "custom_components.home_maintenance.async_register_panel",
            new=AsyncMock(),
        ),
        patch("custom_components.home_maintenance.async_unregister_panel"),
    ):
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

    state = hass.states.get("binary_sensor.clean_gutters")
    assert state is not None
    assert state.state == "on"


async def test_count_watcher_increments_on_transition(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    hass.states.async_set("binary_sensor.garage_door", "off")

    task = HomeMaintenanceTask(
        id="home_maintenance_count",
        title="Lube Garage Door",
        interval_value=1,
        interval_type="days",
        last_performed="2026-01-01T00:00:00",
        trigger_type="count",
        count_entity_id="binary_sensor.garage_door",
        count_threshold=3,
    )
    data.store.add(task)
    await hass.async_block_till_done()

    # off -> on increments
    hass.states.async_set("binary_sensor.garage_door", "on")
    await hass.async_block_till_done()
    assert task.current_count == 1

    # on -> on (attribute-only change) does not increment
    hass.states.async_set("binary_sensor.garage_door", "on", {"x": 1})
    await hass.async_block_till_done()
    assert task.current_count == 1

    # off -> on again increments
    hass.states.async_set("binary_sensor.garage_door", "off")
    hass.states.async_set("binary_sensor.garage_door", "on")
    await hass.async_block_till_done()
    assert task.current_count == 2

    # unrelated entity does nothing
    hass.states.async_set("binary_sensor.other", "on")
    await hass.async_block_till_done()
    assert task.current_count == 2


async def test_runtime_watcher_detects_external_reset(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    hass.states.async_set("sensor.pump_hours", "100")

    task = HomeMaintenanceTask(
        id="home_maintenance_rt",
        title="Service Pump",
        interval_value=1,
        interval_type="days",
        last_performed="2026-01-01T00:00:00",
        trigger_type="runtime",
        runtime_entity_id="sensor.pump_hours",
        runtime_threshold=50,
    )
    data.store.add(task)
    await hass.async_block_till_done()
    assert task.runtime_baseline == 100

    # Sensor reset externally: baseline is persisted back to 0
    hass.states.async_set("sensor.pump_hours", "3")
    await hass.async_block_till_done()
    assert task.runtime_baseline == 0


async def test_services(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    task = HomeMaintenanceTask(
        id="home_maintenance_svc",
        title="Descale Machine",
        interval_value=1,
        interval_type="days",
        last_performed="2020-01-01T00:00:00",
        trigger_type="count",
        count_entity_id="binary_sensor.brew",
        count_threshold=10,
    )
    data.store.add(task)
    await hass.async_block_till_done()

    entity_id = "binary_sensor.descale_machine"
    assert hass.states.get(entity_id) is not None

    await hass.services.async_call(
        DOMAIN, SERVICE_INCREMENT_COUNT, {"entity_id": entity_id}, blocking=True
    )
    assert task.current_count == 1

    await hass.services.async_call(
        DOMAIN, SERVICE_RESET_COUNT, {"entity_id": entity_id}, blocking=True
    )
    assert task.current_count == 0

    await hass.services.async_call(
        DOMAIN,
        SERVICE_RESET,
        {"entity_id": entity_id, "performed_date": "2026-07-01"},
        blocking=True,
    )
    assert task.last_performed.startswith("2026-07-01")


async def test_entity_removed_with_task(hass, setup_entry) -> None:
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    task = HomeMaintenanceTask(
        id="home_maintenance_gone",
        title="Doomed Task",
        interval_value=1,
        interval_type="days",
        last_performed="2026-01-01T00:00:00",
    )
    data.store.add(task)
    await hass.async_block_till_done()
    assert hass.states.get("binary_sensor.doomed_task") is not None

    data.store.delete(task.id)
    await hass.async_block_till_done()
    assert hass.states.get("binary_sensor.doomed_task") is None


async def test_service_reset_uses_local_calendar_date(hass, setup_entry) -> None:
    """performed_date is interpreted in HA's timezone, not as UTC."""
    await hass.config.async_set_time_zone("America/New_York")

    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    task = HomeMaintenanceTask(
        id="home_maintenance_tz",
        title="Timezone Task",
        interval_value=30,
        interval_type="days",
        last_performed="2020-01-01T00:00:00",
    )
    data.store.add(task)
    await hass.async_block_till_done()

    await hass.services.async_call(
        DOMAIN,
        SERVICE_RESET,
        {"entity_id": "binary_sensor.timezone_task", "performed_date": "2026-07-01"},
        blocking=True,
    )
    # A naive-UTC interpretation would have stored 2026-06-30 here.
    assert task.last_performed.startswith("2026-07-01")


async def test_runtime_watcher_gates_insignificant_ticks(hass, setup_entry) -> None:
    """Sub-unit runtime ticks don't rewrite entity state; real changes do."""
    data: HomeMaintenanceData = hass.data[DOMAIN]
    from custom_components.home_maintenance.store import HomeMaintenanceTask

    hass.states.async_set("sensor.fan_hours", "100")
    task = HomeMaintenanceTask(
        id="home_maintenance_gate",
        title="Clean Fan",
        interval_value=1,
        interval_type="days",
        last_performed="2026-01-01T00:00:00",
        trigger_type="runtime",
        runtime_entity_id="sensor.fan_hours",
        runtime_threshold=50,
    )
    data.store.add(task)
    await hass.async_block_till_done()

    entity_id = "binary_sensor.clean_fan"
    assert hass.states.get(entity_id).attributes["runtime_delta"] == 0

    # Sub-unit tick: no push, entity attributes stay put
    hass.states.async_set("sensor.fan_hours", "100.4")
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).attributes["runtime_delta"] == 0

    # Whole-unit progress: pushed
    hass.states.async_set("sensor.fan_hours", "101.5")
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).attributes["runtime_delta"] == 1.5

    # Crossing the threshold flips the sensor on
    hass.states.async_set("sensor.fan_hours", "151.5")
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "on"


async def test_unload_removes_services_and_data(hass, setup_entry) -> None:
    """Unloading the entry deregisters services and clears hass.data."""
    assert hass.services.has_service(DOMAIN, SERVICE_RESET)
    assert hass.services.has_service(DOMAIN, SERVICE_INCREMENT_COUNT)
    assert hass.services.has_service(DOMAIN, SERVICE_RESET_COUNT)

    assert await hass.config_entries.async_unload(setup_entry.entry_id)
    await hass.async_block_till_done()

    assert not hass.services.has_service(DOMAIN, SERVICE_RESET)
    assert not hass.services.has_service(DOMAIN, SERVICE_INCREMENT_COUNT)
    assert not hass.services.has_service(DOMAIN, SERVICE_RESET_COUNT)
    assert DOMAIN not in hass.data
