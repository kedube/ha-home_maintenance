"""Tests for the config and options flows."""

from unittest.mock import AsyncMock, patch

from homeassistant.config_entries import ConfigEntryState
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.home_maintenance.const import DOMAIN


async def test_legacy_string_version_entry_sets_up(hass) -> None:
    """
    An entry created with the old string VERSION migrates and loads.

    Reproduces the upgrade path: entries created before VERSION became an int
    carry version "1.1.0". Setup must migrate the entry to int version 1 and
    load, not stay stuck initializing.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        version="1.1.0",
        data={"admin_only": True, "sidebar_title": "Home Maintenance"},
        options={"admin_only": True, "sidebar_title": "Home Maintenance"},
    )
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

    assert entry.state is ConfigEntryState.LOADED
    assert entry.version == 1


async def test_user_flow_creates_entry(hass) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": "user"}
    )
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"admin_only": False, "sidebar_title": "Chores"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["data"] == {"admin_only": False, "sidebar_title": "Chores"}
    assert result["options"] == {"admin_only": False, "sidebar_title": "Chores"}


async def test_only_single_instance_allowed(hass, setup_entry) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": "user"}
    )
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_flow(hass, setup_entry) -> None:
    result = await hass.config_entries.options.async_init(setup_entry.entry_id)
    assert result["type"] is FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"admin_only": False, "sidebar_title": "Renamed"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()

    assert setup_entry.options == {"admin_only": False, "sidebar_title": "Renamed"}
