"""Constants for the Home Maintenance integration."""

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.device_registry import DeviceInfo

VERSION = "1.5.20"
NAME = "Home Maintenance"
MANUFACTURER = "@TJPoorman"

DOMAIN = "home_maintenance"

# Upper bound on user-supplied free-text fields, enforced by the websocket
# schemas so a client cannot bloat the storage file with huge strings.
MAX_STRING_LENGTH = 500

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

PANEL_FILENAME = "panel/main.js"
PANEL_URL = "home-maintenance"
PANEL_API_PATH = "/home_maintenance_static"
# The ?v= query string maps each frontend bundle to the installed integration
# version so browsers refetch (instead of reusing cached modules) on upgrade.
PANEL_API_URL = f"{PANEL_API_PATH}/main.js?v={VERSION}"
CARD_API_URL = f"{PANEL_API_PATH}/todo-card.js?v={VERSION}"
ADD_TASK_CARD_API_URL = f"{PANEL_API_PATH}/add-task-card.js?v={VERSION}"
PANEL_TITLE = NAME
PANEL_ICON = "mdi:hammer-wrench"
PANEL_NAME = "home-maintenance-panel"

DEVICE_KEY = "home_maintenance_hub"


def device_info() -> DeviceInfo:
    """Return the shared hub DeviceInfo every entity attaches to."""
    return DeviceInfo(
        identifiers={(DOMAIN, DEVICE_KEY)},
        name=NAME,
        model=NAME,
        sw_version=VERSION,
        manufacturer=MANUFACTURER,
    )


# Dispatcher signals fired by the TaskStore on mutations. Entities, the
# watched-entity listeners, and panel subscriptions all react to these.
SIGNAL_TASK_ADDED = f"{DOMAIN}_task_added"  # payload: (task, labels)
SIGNAL_TASK_REMOVED = f"{DOMAIN}_task_removed"  # payload: (task_id,)
SIGNAL_TASKS_CHANGED = f"{DOMAIN}_tasks_changed"  # payload: none


def signal_task_updated(task_id: str) -> str:
    """
    Per-task update signal name (payload: none).

    Each task's entity subscribes to its own signal so an update dispatches to
    exactly that entity, instead of a global signal every entity subscribes to
    and then filters — which was O(n) per update.
    """
    return f"{DOMAIN}_task_updated_{task_id}"


SERVICE_RESET = "reset_last_performed"
SERVICE_RESET_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Optional("performed_date"): cv.string,
    }
)

SERVICE_INCREMENT_COUNT = "increment_count"
SERVICE_INCREMENT_COUNT_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
    }
)

SERVICE_RESET_COUNT = "reset_count"
SERVICE_RESET_COUNT_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
    }
)

# Per-task notifications. notify_when picks which due states notify;
# the mobile action ids round-trip through mobile_app notification events.
NOTIFY_WHEN_OPTIONS = ["due", "overdue", "due_and_overdue"]

# Only these schemes are allowed for a task's notification "Open" URL, so a
# task edit cannot smuggle a javascript:/intent:/file: target into a trusted
# Home Assistant notification.
NOTIFICATION_URL_SCHEMES = ("http", "https")
NOTIFICATION_ACTION_COMPLETE = "HOME_MAINTENANCE_COMPLETE"
NOTIFICATION_ACTION_SNOOZE = "HOME_MAINTENANCE_SNOOZE"
DEFAULT_SNOOZE_DAYS = 1

SERVICE_SNOOZE_TASK = "snooze_task"
SERVICE_SNOOZE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Optional("days", default=DEFAULT_SNOOZE_DAYS): vol.All(
            vol.Coerce(int), vol.Range(min=1)
        ),
    }
)

SERVICE_SEND_TASK_NOTIFICATION = "send_task_notification"
SERVICE_SEND_TASK_NOTIFICATION_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
    }
)

CONFIG_STEP_USER_DATA_SCHEMA = vol.Schema(
    {
        vol.Optional("admin_only", default=True): cv.boolean,
        vol.Optional("sidebar_title", default=PANEL_TITLE): cv.string,
    }
)


def get_options_schema(config_entry: ConfigEntry) -> vol.Schema:
    """Return the schema for get options."""
    return vol.Schema(
        {
            vol.Optional(
                "admin_only",
                default=config_entry.options.get(
                    "admin_only", config_entry.data.get("admin_only", True)
                ),
            ): cv.boolean,
            vol.Optional(
                "sidebar_title",
                default=config_entry.options.get(
                    "sidebar_title",
                    config_entry.data.get("sidebar_title", PANEL_TITLE),
                ),
            ): cv.string,
        }
    )
