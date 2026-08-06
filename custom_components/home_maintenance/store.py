"""Store Home Maintenance configuration."""

import logging
from datetime import datetime

import attr
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry, storage
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.util import dt as dt_util

from . import const
from .triggers import get_trigger

_LOGGER = logging.getLogger(__name__)

STORAGE_KEY = f"{const.DOMAIN}.storage"
STORAGE_VERSION_MAJOR = 1
STORAGE_VERSION_MINOR = 2
SAVE_DELAY = 1.0

# Fields a websocket update may modify. Everything else — id, current_count,
# runtime_baseline — is managed by the integration itself.
ALLOWED_UPDATE_FIELDS = {
    "title",
    "trigger_type",
    "interval_value",
    "interval_type",
    "last_performed",
    "icon",
    "tag_id",
    "area_id",
    "description",
    "count_entity_id",
    "count_threshold",
    "runtime_entity_id",
    "runtime_threshold",
}


@attr.s(slots=True)
class HomeMaintenanceTask:
    """Represents a single home maintenance task."""

    id: str = attr.ib()
    title: str = attr.ib()
    interval_value: int = attr.ib()
    interval_type: str = attr.ib()
    last_performed: str = attr.ib()
    tag_id: str | None = attr.ib(default=None)
    icon: str | None = attr.ib(default=None)
    trigger_type: str = attr.ib(default="time")
    count_entity_id: str | None = attr.ib(default=None)
    count_threshold: int = attr.ib(default=0)
    current_count: int = attr.ib(default=0)
    runtime_entity_id: str | None = attr.ib(default=None)
    runtime_threshold: float = attr.ib(default=0)
    runtime_baseline: float = attr.ib(default=0)
    area_id: str | None = attr.ib(default=None)
    description: str | None = attr.ib(default=None)


class TaskStore:
    """
    Holds home maintenance task data — the single source of truth.

    Entities and the panel are decoupled from the store: every mutation fires
    dispatcher signals (SIGNAL_TASK_ADDED / _UPDATED / _REMOVED plus the
    catch-all SIGNAL_TASKS_CHANGED) that interested parties subscribe to.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the storage."""
        self.hass = hass
        self._store = storage.Store(
            hass,
            STORAGE_VERSION_MAJOR,
            STORAGE_KEY,
            minor_version=STORAGE_VERSION_MINOR,
        )
        self._tasks: dict[str, HomeMaintenanceTask] = {}

    async def async_load(self) -> None:
        """Load tasks from storage."""
        data = await self._store.async_load()
        if data is None:
            return

        # Fields added after a task was stored fall back to the attrs defaults.
        self._tasks = {
            task_data["id"]: HomeMaintenanceTask(**task_data) for task_data in data
        }

    @property
    def tasks(self) -> dict[str, HomeMaintenanceTask]:
        """Return the task objects keyed by id, without copying."""
        return self._tasks

    def serialize(self, task: HomeMaintenanceTask) -> dict:
        """
        Return the task as a dict extended with computed trigger state.

        The computed fields (`due`, `next_due`, `progress_current`,
        `progress_target`) let API consumers render trigger state without
        reimplementing the trigger semantics.
        """
        data = attr.asdict(task)
        trigger = get_trigger(task.trigger_type)
        next_due = trigger.next_due(self.hass, task)
        progress = trigger.progress(self.hass, task)
        data["due"] = trigger.is_due(self.hass, task)
        data["next_due"] = next_due.isoformat() if next_due else None
        data["progress_current"] = progress[0] if progress else None
        data["progress_target"] = progress[1] if progress else None
        return data

    def get_all(self) -> list[dict]:
        """Get all tasks, serialized with computed trigger state."""
        return [self.serialize(t) for t in self._tasks.values()]

    def get(self, task_id: str) -> dict | None:
        """Get a single serialized task, or None."""
        task = self._tasks.get(task_id)
        return self.serialize(task) if task else None

    def _get_tag_uuids(self) -> dict[str, str]:
        """Return a mapping of all task's tag friendly IDs into tag UUIDs."""
        er = entity_registry.async_get(self.hass)

        # Get each task's tag_id, if configured
        tag_ids = [t.tag_id for t in self._tasks.values() if t.tag_id]

        tag_uuids = {}
        for tag_id in tag_ids:
            # If two tasks have the same tag_id, only get the first
            if tag_id in tag_uuids:
                continue

            # Get the tag_id -> tag_uuid mapping from entity_registry
            entry = er.async_get(tag_id)
            if entry:
                tag_uuids[tag_id] = entry.unique_id

        return tag_uuids

    def get_by_tag_uuid(self, tag_uuid: str) -> list[dict]:
        """Get tasks given a tag UUID."""
        tag_uuids = self._get_tag_uuids()

        return [
            attr.asdict(t)
            for t in self._tasks.values()
            if t.tag_id and tag_uuids.get(t.tag_id) == tag_uuid
        ]

    def get_by_tag_id(self, tag_id: str) -> list[dict]:
        """Get tasks by tag id."""
        return [attr.asdict(t) for t in self._tasks.values() if t.tag_id == tag_id]

    def _entity_id_for(self, task_id: str) -> str | None:
        """Resolve a task's entity_id from the entity registry."""
        registry = entity_registry.async_get(self.hass)
        return registry.async_get_entity_id("binary_sensor", const.DOMAIN, task_id)

    @staticmethod
    def _midnight_isoformat(performed_date: datetime) -> str:
        return performed_date.replace(
            hour=0, minute=0, second=0, microsecond=0
        ).isoformat()

    def add(self, task: HomeMaintenanceTask, labels: list[str] | None = None) -> str:
        """Add a new task and announce it."""
        get_trigger(task.trigger_type).initialize(self.hass, task)
        self._tasks[task.id] = task
        self._save()
        async_dispatcher_send(
            self.hass, const.SIGNAL_TASK_ADDED, task, list(labels or [])
        )
        async_dispatcher_send(self.hass, const.SIGNAL_TASKS_CHANGED)
        return task.id

    def delete(self, task_id: str) -> None:
        """Remove a task and announce the removal."""
        if task_id not in self._tasks:
            msg = f"No task found with ID {task_id}."
            raise RuntimeError(msg)

        del self._tasks[task_id]
        self._save()
        async_dispatcher_send(self.hass, const.SIGNAL_TASK_REMOVED, task_id)
        async_dispatcher_send(self.hass, const.SIGNAL_TASKS_CHANGED)

    def update_task(self, task_id: str, updated: dict) -> None:
        """Update an existing task with new values from a dictionary."""
        task = self._tasks.get(task_id)
        if task is None:
            msg = "Task not found."
            raise RuntimeError(msg)

        previous_trigger = task.trigger_type

        for key, value in updated.items():
            if key not in ALLOWED_UPDATE_FIELDS:
                continue
            if key in ("tag_id", "area_id"):
                value = value or None  # noqa: PLW2901
            setattr(task, key, value)

        # Switching trigger type re-initializes trigger-managed state
        # (counter reset, runtime baseline capture).
        if task.trigger_type != previous_trigger:
            get_trigger(task.trigger_type).initialize(self.hass, task)

        entity_id = self._entity_id_for(task_id)
        if entity_id:
            registry = entity_registry.async_get(self.hass)
            if "area_id" in updated:
                registry.async_update_entity(entity_id, area_id=task.area_id)
            if "labels" in updated:
                registry.async_update_entity(entity_id, labels=set(updated["labels"]))

        self._save()
        self._notify_updated(task_id)

    def update_last_performed(
        self, task_id: str, performed_date: datetime | None = None
    ) -> None:
        """Mark a task complete: update last_performed, apply trigger effects."""
        task = self._tasks.get(task_id)
        if task is None:
            msg = "Task not found."
            raise RuntimeError(msg)

        task.last_performed = self._midnight_isoformat(
            performed_date if performed_date is not None else dt_util.now()
        )
        get_trigger(task.trigger_type).on_complete(self.hass, task)

        self._save()
        self._notify_updated(task_id)

    def increment_count(self, task_id: str) -> None:
        """Increment the count for a count-based task."""
        task = self._tasks.get(task_id)
        if task is None:
            msg = "Task not found."
            raise RuntimeError(msg)

        if task.trigger_type != "count":
            return

        task.current_count += 1
        self._save()
        self._notify_updated(task_id)

    def reset_count(self, task_id: str) -> None:
        """Reset the count for a count-based task without completing it."""
        task = self._tasks.get(task_id)
        if task is None:
            msg = "Task not found."
            raise RuntimeError(msg)

        task.current_count = 0
        self._save()
        self._notify_updated(task_id)

    def update_runtime_baseline(self, task_id: str, new_baseline: float) -> None:
        """Update the runtime baseline for a runtime-based task."""
        task = self._tasks.get(task_id)
        if task is None:
            return

        task.runtime_baseline = new_baseline
        self._save()
        self._notify_updated(task_id)

    def _notify_updated(self, task_id: str) -> None:
        async_dispatcher_send(self.hass, const.SIGNAL_TASK_UPDATED, task_id)
        async_dispatcher_send(self.hass, const.SIGNAL_TASKS_CHANGED)

    def _save(self) -> None:
        """Persist tasks in the background, coalescing rapid successive writes."""
        self._store.async_delay_save(
            lambda: [attr.asdict(task) for task in self._tasks.values()], SAVE_DELAY
        )
