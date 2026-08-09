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
STORAGE_VERSION_MINOR = 4
SAVE_DELAY = 1.0

# Fields a websocket update may modify. Everything else — id, current_count,
# runtime_baseline, notification bookkeeping — is managed by the integration
# itself. "labels" is intentionally absent: labels live in the entity
# registry, not on the task, so update_task applies them to the registry
# entry instead.
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
    "group_id",
    "notifications_enabled",
    "notification_target",
    "notification_time",
    "notification_url",
    "notify_when",
    "notify_days_before_due",
}

# Fields owned by the notification manager, written via
# update_notification_state rather than update_task.
NOTIFICATION_STATE_FIELDS = {
    "snooze_until",
    "last_notification_kind",
    "last_notification_date",
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
    group_id: str | None = attr.ib(default=None)
    notifications_enabled: bool = attr.ib(default=False)
    notification_target: str | None = attr.ib(default=None)
    notification_time: str = attr.ib(default="09:00")
    notification_url: str | None = attr.ib(default=None)
    notify_when: str = attr.ib(default="due_and_overdue")
    notify_days_before_due: int | None = attr.ib(default=None)
    snooze_until: str | None = attr.ib(default=None)
    last_notification_kind: str | None = attr.ib(default=None)
    last_notification_date: str | None = attr.ib(default=None)


def normalize_group_id(group_id: str | None) -> str | None:
    """Normalize a group name to its canonical stored value."""
    if group_id is None:
        return None
    normalized = group_id.strip()
    return normalized or None


class _TaskStorage(storage.Store):
    """
    Store that accepts data written by any other schema version.

    async_load handles the stored shapes itself (a bare task list before
    1.3, a tasks/groups dict since) and ignores unknown task fields, so no
    transformation is needed here — but without this hook HA's Store raises
    NotImplementedError when the stored major version differs (e.g. after
    a downgrade from a future release).
    """

    async def _async_migrate_func(
        self,
        old_major_version: int,  # noqa: ARG002
        old_minor_version: int,  # noqa: ARG002
        old_data: dict | list,
    ) -> dict | list:
        return old_data


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
        self._store = _TaskStorage(
            hass,
            STORAGE_VERSION_MAJOR,
            STORAGE_KEY,
            minor_version=STORAGE_VERSION_MINOR,
        )
        self._tasks: dict[str, HomeMaintenanceTask] = {}
        self._groups: set[str] = set()

    async def async_load(self) -> None:
        """Load tasks (and groups, since 1.3) from storage."""
        data = await self._store.async_load()
        if data is None:
            return

        # Storage < 1.3 was a bare task list; 1.3 wraps it with the group list.
        if isinstance(data, list):
            task_items = data
            group_items: list[str] = []
        else:
            task_items = data.get("tasks", [])
            group_items = data.get("groups", [])

        # Fields added after a task was stored fall back to the attrs
        # defaults; unknown stored fields (e.g. written by a newer version)
        # are dropped instead of aborting setup with a TypeError.
        known_fields = {field.name for field in attr.fields(HomeMaintenanceTask)}
        self._tasks = {
            task_data["id"]: HomeMaintenanceTask(
                **{k: v for k, v in task_data.items() if k in known_fields}
            )
            for task_data in task_items
        }
        # Groups in use by tasks always exist, even if the stored list lags.
        self._groups = {
            group
            for group in (
                normalize_group_id(g)
                for g in (*group_items, *(t.group_id for t in self._tasks.values()))
            )
            if group is not None
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

    def _entity_id_for(self, task_id: str) -> str | None:
        """Resolve a task's entity_id from the entity registry."""
        registry = entity_registry.async_get(self.hass)
        return registry.async_get_entity_id("binary_sensor", const.DOMAIN, task_id)

    def get_groups(self) -> list[str]:
        """Get all group names, sorted."""
        return sorted(self._groups)

    def create_group(self, group_id: str) -> None:
        """Create a group if it does not already exist."""
        normalized = normalize_group_id(group_id)
        if not normalized:
            msg = "Group name is required."
            raise RuntimeError(msg)

        if normalized in self._groups:
            return
        self._groups.add(normalized)
        self._save()
        async_dispatcher_send(self.hass, const.SIGNAL_TASKS_CHANGED)

    def rename_group(self, old_group_id: str, new_group_id: str) -> None:
        """Rename a group and reassign all member tasks."""
        old_normalized = normalize_group_id(old_group_id)
        new_normalized = normalize_group_id(new_group_id)

        if not old_normalized or not new_normalized:
            msg = "Both old and new group names are required."
            raise RuntimeError(msg)

        if old_normalized == new_normalized:
            return

        if new_normalized in self._groups:
            msg = f'A group named "{new_normalized}" already exists.'
            raise RuntimeError(msg)

        self._groups.discard(old_normalized)
        self._groups.add(new_normalized)
        self._reassign_group_members(old_normalized, new_normalized)

    def delete_group(self, group_id: str) -> None:
        """Delete a group and move member tasks to ungrouped."""
        normalized = normalize_group_id(group_id)
        if not normalized:
            msg = "Group name is required."
            raise RuntimeError(msg)

        self._groups.discard(normalized)
        self._reassign_group_members(normalized, None)

    def _reassign_group_members(self, from_group: str, to_group: str | None) -> None:
        """Move every task in from_group to to_group, then save and announce."""
        for task in self._tasks.values():
            if normalize_group_id(task.group_id) == from_group:
                task.group_id = to_group

        self._save()
        # A group change is invisible to the entities (group_id is not part of
        # entity state), so a single catch-all is enough — no per-task signals.
        async_dispatcher_send(self.hass, const.SIGNAL_TASKS_CHANGED)

    def _register_task_group(self, task: HomeMaintenanceTask) -> None:
        """Normalize a task's group and make sure it exists in the group list."""
        task.group_id = normalize_group_id(task.group_id)
        if task.group_id:
            self._groups.add(task.group_id)

    def add(self, task: HomeMaintenanceTask, labels: list[str] | None = None) -> str:
        """Add a new task and announce it."""
        error = get_trigger(task.trigger_type).validate(attr.asdict(task))
        if error is not None:
            raise RuntimeError(error)

        get_trigger(task.trigger_type).initialize(self.hass, task)
        self._register_task_group(task)
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

        # Validate the post-update trigger fields before mutating anything, so
        # a task can never be switched into a state where it silently never
        # becomes due (e.g. count trigger without an entity).
        merged = attr.asdict(task)
        merged.update(
            (key, value)
            for key, value in updated.items()
            if key in ALLOWED_UPDATE_FIELDS
        )
        error = get_trigger(merged["trigger_type"]).validate(merged)
        if error is not None:
            raise RuntimeError(error)

        previous_trigger = task.trigger_type

        for key, value in updated.items():
            if key not in ALLOWED_UPDATE_FIELDS:
                continue
            if key in ("tag_id", "area_id"):
                value = value or None  # noqa: PLW2901
            setattr(task, key, value)

        self._register_task_group(task)

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

        task.last_performed = dt_util.start_of_local_day(
            dt_util.as_local(performed_date) if performed_date is not None else None
        ).isoformat()
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

    def update_notification_state(self, task_id: str, **updates: str | None) -> None:
        """
        Update the notification manager's bookkeeping fields on a task.

        Deliberately does not fire dispatcher signals: snooze/last-sent state
        is not entity or panel state, and announcing it would re-trigger the
        notification manager that just wrote it.
        """
        task = self._tasks.get(task_id)
        if task is None:
            return

        for key, value in updates.items():
            if key in NOTIFICATION_STATE_FIELDS:
                setattr(task, key, value)
        self._save()

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
            lambda: {
                "tasks": [attr.asdict(task) for task in self._tasks.values()],
                "groups": sorted(self._groups),
            },
            SAVE_DELAY,
        )
