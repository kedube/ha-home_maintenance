"""Tests for the config and options flows."""

from homeassistant.data_entry_flow import FlowResultType

from custom_components.home_maintenance.const import DOMAIN


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
