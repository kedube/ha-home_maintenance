import { localize } from '../localize/localize';
import { EntityRegistryEntry, Task } from './types';

/**
 * Pure task computations shared by the panel and the cards. This module is
 * deliberately DOM- and lit-free so the vitest unit tests can exercise it in
 * plain Node; anything that renders belongs in util.ts or a component.
 */

/**
 * Parse a stored ISO date/datetime as a local calendar date (midnight).
 * The backend stores local-midnight ISO strings; `new Date(iso)` would shift
 * them through the browser timezone and can land on the neighboring day.
 */
export const parseStoredDate = (value: string): Date => {
    const [datePart] = value.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    return new Date(year, month - 1, day);
};

/** Whether a task's trigger produces calendar due dates (time or date). */
export const isDatedTrigger = (task: Task): boolean => {
    const triggerType = task.trigger_type ?? "time";
    return triggerType === "time" || triggerType === "date";
};

/** "3 / 10" progress label for count/runtime tasks. */
export const formatProgress = (task: Task): string =>
    `${task.progress_current ?? 0} / ${task.progress_target ?? 0}`;

/** Localized "30 Days" / "1 Week" label for a time-based interval. */
export const formatTimeInterval = (value: number, type: string, lang: string): string => {
    const key = value === 1 ? type.slice(0, -1) : type;
    return `${value} ${localize(`intervals.${key}`, lang)}`;
};

/** Trigger-aware interval label: threshold for count/runtime, span for dated. */
export const formatTriggerInterval = (task: Task, lang: string): string => {
    const triggerType = task.trigger_type ?? "time";
    if (triggerType === "count") {
        return localize('intervals.every_uses', lang, '{value}', String(task.count_threshold ?? 0));
    }
    if (triggerType === "runtime") {
        return localize('intervals.every_runtime', lang, '{value}', String(task.runtime_threshold ?? 0));
    }
    return formatTimeInterval(task.interval_value, task.interval_type, lang);
};

export type TaskStatus = "overdue" | "due_soon" | "upcoming";

export interface TaskSchedule {
    nextDue: Date | null;
    daysUntilDue: number | null;
    status: TaskStatus;
    completedToday: boolean;
}

/**
 * Bucket a task for the todo card: overdue when the backend says it's due,
 * due_soon within the window, upcoming otherwise. `now` defaults to today's
 * local midnight and is injectable for tests.
 */
export const computeTaskSchedule = (
    task: Task,
    dueSoonDays: number,
    now?: Date,
): TaskSchedule => {
    const today = now ? new Date(now) : new Date();
    today.setHours(0, 0, 0, 0);

    let nextDue: Date | null = null;
    let daysUntilDue: number | null = null;
    if (isDatedTrigger(task) && task.next_due) {
        // Parse the calendar date, not the instant: new Date(iso) would
        // shift the backend's local midnight through the browser TZ.
        // Round, don't ceil: a DST transition makes the midnight-to-midnight
        // span 23 or 25 hours, and ceil would inflate the day count by one.
        nextDue = parseStoredDate(task.next_due);
        daysUntilDue = Math.round((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    let status: TaskStatus;
    if (task.due) status = "overdue";
    else if (daysUntilDue !== null && daysUntilDue <= dueSoonDays) status = "due_soon";
    else status = "upcoming";

    let completedToday = false;
    if (task.last_performed) {
        completedToday = parseStoredDate(task.last_performed).getTime() === today.getTime();
    }

    return { nextDue, daysUntilDue, status, completedToday };
};

/** Localized "Due today" / "3 days overdue" / "5 days left" label. */
export const formatDaysLabel = (schedule: TaskSchedule, task: Task, lang: string): string => {
    if (!isDatedTrigger(task)) {
        return formatProgress(task);
    }
    const days = schedule.daysUntilDue;
    if (days === null) return "";
    if (days === 0) return localize('card.todo.due_today', lang);
    if (days < 0) {
        return localize('card.todo.days_overdue', lang, '{count}', Math.abs(days));
    }
    return localize('card.todo.days_left', lang, '{count}', days);
};

/**
 * Filter the task list by a free-text query (title/description/group name,
 * case-insensitive — matching the todo card's search semantics) and selected
 * label ids (OR logic — a task matches when its entity carries any selected
 * label). Empty query and no labels returns the input list unchanged so
 * render caches keyed on identity stay warm.
 */
export const filterTasks = (
    tasks: Task[],
    registry: EntityRegistryEntry[],
    query: string,
    labelIds: string[],
): Task[] => {
    const needle = query.trim().toLowerCase();
    if (!needle && !labelIds.length) return tasks;

    const labelsByTask = new Map<string, string[]>();
    if (labelIds.length) {
        registry.forEach((entry) => labelsByTask.set(entry.unique_id, entry.labels));
    }

    return tasks.filter((task) => {
        if (needle) {
            const haystack =
                `${task.title}\n${task.description ?? ''}\n${task.group_id ?? ''}`.toLowerCase();
            if (!haystack.includes(needle)) return false;
        }
        if (labelIds.length) {
            const taskLabels = labelsByTask.get(task.id) ?? [];
            if (!labelIds.some((id) => taskLabels.includes(id))) return false;
        }
        return true;
    });
};

/** Trailing-edge debouncer for coalescing subscription pushes. */
export class Debouncer {
    private _timer?: ReturnType<typeof setTimeout>;

    constructor(private readonly _fn: () => void, private readonly _ms: number) { }

    schedule() {
        this.cancel();
        this._timer = setTimeout(() => {
            this._timer = undefined;
            this._fn();
        }, this._ms);
    }

    cancel() {
        if (this._timer !== undefined) clearTimeout(this._timer);
        this._timer = undefined;
    }
}
