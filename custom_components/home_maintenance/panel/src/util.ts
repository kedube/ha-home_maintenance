import { html, TemplateResult } from "lit";

import { localize } from '../localize/localize';
import { Task } from './types';

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

/** "3 / 10" progress label for count/runtime tasks. */
export const formatProgress = (task: Task): string =>
    `${task.progress_current ?? 0} / ${task.progress_target ?? 0}`;

/** Localized "30 Days" / "1 Week" label for a time-based interval. */
export const formatTimeInterval = (value: number, type: string, lang: string): string => {
    const key = value === 1 ? type.slice(0, -1) : type;
    return `${value} ${localize(`intervals.${key}`, lang)}`;
};

/** Trigger-aware interval label: threshold for count/runtime, span for time. */
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

/**
 * Newer HA slots dialog buttons through ha-dialog-footer; older HA expects
 * them slotted directly. Render whichever this frontend supports.
 */
export const dialogFooter = (buttons: TemplateResult): TemplateResult =>
    customElements.get("ha-dialog-footer")
        ? html`<ha-dialog-footer slot="footer">${buttons}</ha-dialog-footer>`
        : buttons;

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
