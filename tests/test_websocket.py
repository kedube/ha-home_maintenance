"""Tests for the websocket API."""


async def add_task_via_ws(ws_client, **overrides):
    """Add a task through the websocket API and return its id."""
    payload = {
        "type": "home_maintenance/add_task",
        "title": "WS Task",
        "interval_value": 30,
        "interval_type": "days",
    }
    payload.update(overrides)
    await ws_client.send_json_auto_id(payload)
    response = await ws_client.receive_json()
    assert response["success"], response
    return response["result"]["id"]


async def test_add_and_get_tasks(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client, description="notes")

    await client.send_json_auto_id({"type": "home_maintenance/get_tasks"})
    response = await client.receive_json()
    assert response["success"]
    tasks = response["result"]
    assert len(tasks) == 1
    task = tasks[0]
    assert task["id"] == task_id
    assert task["title"] == "WS Task"
    assert task["description"] == "notes"
    # Computed trigger state is included for the panel
    assert task["due"] is False
    assert task["next_due"] is not None


async def test_add_count_task_requires_fields(
    hass, setup_entry, hass_ws_client
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {
            "type": "home_maintenance/add_task",
            "title": "Bad Count",
            "interval_value": 1,
            "interval_type": "days",
            "trigger_type": "count",
        }
    )
    response = await client.receive_json()
    assert not response["success"]
    assert response["error"]["code"] == "invalid_input"


async def test_update_task_rejects_unknown_fields(
    hass, setup_entry, hass_ws_client
) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client)

    await client.send_json_auto_id(
        {
            "type": "home_maintenance/update_task",
            "task_id": task_id,
            "updates": {"id": "hacked", "title": "x"},
        }
    )
    response = await client.receive_json()
    assert not response["success"]

    await client.send_json_auto_id(
        {
            "type": "home_maintenance/update_task",
            "task_id": task_id,
            "updates": {"title": "Renamed", "last_performed": "2026-01-15"},
        }
    )
    response = await client.receive_json()
    assert response["success"], response

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["title"] == "Renamed"
    assert response["result"]["id"] == task_id


async def test_increment_and_reset_count(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(
        client,
        trigger_type="count",
        count_entity_id="binary_sensor.door",
        count_threshold=2,
    )

    for _ in range(2):
        await client.send_json_auto_id(
            {"type": "home_maintenance/increment_count", "task_id": task_id}
        )
        response = await client.receive_json()
        assert response["success"]

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["current_count"] == 2
    assert response["result"]["due"] is True
    assert response["result"]["progress_current"] == 2
    assert response["result"]["progress_target"] == 2

    await client.send_json_auto_id(
        {"type": "home_maintenance/reset_count", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["success"]

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["current_count"] == 0
    assert response["result"]["due"] is False


async def test_complete_task(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client, last_performed="2020-01-01")

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["due"] is True

    await client.send_json_auto_id(
        {"type": "home_maintenance/complete_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["success"]

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["due"] is False


async def test_remove_task(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client)

    await client.send_json_auto_id(
        {"type": "home_maintenance/remove_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["success"]

    await client.send_json_auto_id({"type": "home_maintenance/get_tasks"})
    response = await client.receive_json()
    assert response["result"] == []


async def test_get_missing_task_errors(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": "nope"}
    )
    response = await client.receive_json()
    assert not response["success"]
    assert response["error"]["code"] == "not_found"


async def test_subscribe_updates_pushes_on_change(
    hass, setup_entry, hass_ws_client
) -> None:
    client = await hass_ws_client(hass)

    await client.send_json_auto_id({"type": "home_maintenance/subscribe_updates"})
    response = await client.receive_json()
    assert response["success"]
    subscription_id = response["id"]

    # The store fires the dispatcher signal synchronously inside add_task, so
    # the pushed event may arrive before the command result.
    await client.send_json_auto_id(
        {
            "type": "home_maintenance/add_task",
            "title": "WS Task",
            "interval_value": 30,
            "interval_type": "days",
        }
    )
    messages = [await client.receive_json(), await client.receive_json()]

    events = [m for m in messages if m["type"] == "event"]
    results = [m for m in messages if m["type"] == "result"]
    assert len(events) == 1
    assert events[0]["id"] == subscription_id
    assert events[0]["event"] == {"event": "tasks_changed"}
    assert len(results) == 1
    assert results[0]["success"]


async def test_get_config_includes_version(hass, setup_entry, hass_ws_client) -> None:
    from custom_components.home_maintenance.const import VERSION

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_maintenance/get_config"})
    response = await client.receive_json()
    assert response["success"]
    assert response["result"]["version"] == VERSION
    assert response["result"]["options"]["admin_only"] is True


async def test_group_lifecycle(hass, setup_entry, hass_ws_client) -> None:
    """Create, list, rename, and delete groups over the websocket API."""
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client, group_id="Kitchen")

    await client.send_json_auto_id(
        {"type": "home_maintenance/create_group", "group_id": "Garage"}
    )
    response = await client.receive_json()
    assert response["success"], response

    await client.send_json_auto_id({"type": "home_maintenance/get_groups"})
    response = await client.receive_json()
    assert response["success"]
    assert response["result"] == ["Garage", "Kitchen"]

    await client.send_json_auto_id(
        {
            "type": "home_maintenance/rename_group",
            "old_group_id": "Kitchen",
            "new_group_id": "Cuisine",
        }
    )
    response = await client.receive_json()
    assert response["success"], response

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["group_id"] == "Cuisine"

    await client.send_json_auto_id(
        {"type": "home_maintenance/delete_group", "group_id": "Cuisine"}
    )
    response = await client.receive_json()
    assert response["success"], response

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["group_id"] is None

    await client.send_json_auto_id({"type": "home_maintenance/get_groups"})
    response = await client.receive_json()
    assert response["result"] == ["Garage"]


async def test_create_group_rejects_blank_name(
    hass, setup_entry, hass_ws_client
) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": "home_maintenance/create_group", "group_id": "   "}
    )
    response = await client.receive_json()
    assert not response["success"]
    assert response["error"]["code"] == "invalid_input"


async def test_update_task_group(hass, setup_entry, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    task_id = await add_task_via_ws(client)

    await client.send_json_auto_id(
        {
            "type": "home_maintenance/update_task",
            "task_id": task_id,
            "updates": {"group_id": "Outdoors"},
        }
    )
    response = await client.receive_json()
    assert response["success"], response

    await client.send_json_auto_id(
        {"type": "home_maintenance/get_task", "task_id": task_id}
    )
    response = await client.receive_json()
    assert response["result"]["group_id"] == "Outdoors"

    await client.send_json_auto_id({"type": "home_maintenance/get_groups"})
    response = await client.receive_json()
    assert response["result"] == ["Outdoors"]
