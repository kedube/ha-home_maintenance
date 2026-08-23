import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { formatDateNumeric } from "custom-card-helpers";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { formatProgress, formatTimeInterval, isDatedTrigger, parseStoredDate } from '../compute';
import { EntityRegistryEntry, INTERVAL_TYPE_DAYS, Label, Task } from '../types';
import { mdiCheckCircleOutline } from "@mdi/js";
import './hm-task-menu'

const FAR_FUTURE = new Date(9999, 0, 1);

/**
 * The task list table. Renders backend-serialized tasks (including the
 * computed due / next_due / progress fields) and emits `task-complete` and
 * `task-menu-action` events; it performs no websocket calls of its own.
 */
class HMTaskTable extends LitElement {
    @property() hass?: HomeAssistant;
    @property() narrow!: boolean;
    @property({ attribute: false }) tasks: Task[] = [];
    @property({ attribute: false }) groups: string[] = [];
    @property({ attribute: false }) registry: EntityRegistryEntry[] = [];
    @property({ attribute: false }) labelRegistry: Label[] = [];

    // hass updates on every state change in Home Assistant, so render() runs
    // often. Cache columns and rows so ha-data-table receives stable
    // references unless the inputs actually changed.
    private _columnsCache?: { narrow: boolean; language: string; columns: Record<string, any> };
    private _rowsCache?: { tasks: Task[]; rows: any[] };
    private _sectionsCache?: { tasks: Task[]; groups: string[]; sections: { title: string; rows: any[] }[] };

    private get _columns() {
        return {
            icon: {
                title: "",
                moveable: false,
                showNarrow: false,
                label: "icon",
                type: "icon",
                template: (task: any) =>
                    task.icon ? html`<ha-icon .icon=${task.icon}></ha-icon>` : nothing,
            },
            tagIcon: {
                title: "",
                moveable: false,
                showNarrow: false,
                label: "tag",
                type: "icon",
                template: (task: any) =>
                    task.tagIcon ? html`<ha-icon .icon=${task.tagIcon}></ha-icon>` : nothing,
            },
            title: {
                title: 'Title',
                main: true,
                showNarrow: true,
                sortable: true,
                filterable: true,
                grows: true,
                extraTemplate: (task: any) => {
                    const entity = this.registry.find((entry) => entry.unique_id === task.id);
                    if (!entity) return nothing;

                    const labels = this.labelRegistry.filter((lr) => entity.labels.includes(lr.label_id));

                    return labels.length
                        ? html`<ha-data-table-labels .labels=${labels}></ha-data-table-labels>`
                        : nothing;
                },
            },
            interval_days: {
                title: 'Interval',
                showNarrow: false,
                sortable: true,
                minWidth: "100px",
                maxWidth: "100px",
                template: (task: any) => {
                    if (!isDatedTrigger(task)) {
                        return formatProgress(task);
                    }
                    return formatTimeInterval(task.interval_value, task.interval_type, this.hass!.language);
                }
            },
            last_performed: {
                title: 'Last Performed',
                showNarrow: false,
                sortable: true,
                minWidth: "150px",
                maxWidth: "150px",
                template: (task: any) => {
                    if (!isDatedTrigger(task) || !task.last_performed) return "-";
                    return formatDateNumeric(parseStoredDate(task.last_performed), this.hass!.locale);
                }
            },
            next_due: {
                title: localize('panel.cards.current.next', this.hass!.language),
                showNarrow: true,
                sortable: true,
                direction: "asc",
                minWidth: "100px",
                maxWidth: "100px",
                template: (task: any) => {
                    const style = task.due ? "color: var(--error-color, red); font-weight: bold;" : "";
                    if (!isDatedTrigger(task)) {
                        return html`
                            <span style=${style}>
                                ${formatProgress(task)}
                            </span>`;
                    }
                    if (!task.next_due_date) return "—";
                    return html`
                        <span style=${style}>
                            ${formatDateNumeric(task.next_due_date, this.hass!.locale)}
                        </span>`;
                },
            },
            complete: {
                minWidth: "64px",
                maxWidth: "64px",
                sortable: false,
                groupable: false,
                showNarrow: true,
                moveable: false,
                hideable: false,
                type: "overflow",
                template: (task: any) => html`
                <ha-icon-button
                    @click=${() => this._dispatch('task-complete', task.id)}
                    .label="Complete"
                    title="Mark Task Complete"
                    .path=${mdiCheckCircleOutline}
                ></ha-icon-button>
              `,
            },
            actions: {
                title: "", // no header in column
                width: "80px",
                showNarrow: true,
                moveable: false,
                hideable: false,
                type: "overflow-menu",
                template: (task: any) => html`
                    <hm-task-menu
                        .hass=${this.hass}
                        .items=${[
                        {
                            value: 'edit',
                            label: localize('panel.cards.current.actions.edit', this.hass!.language),
                            icon: 'mdi:pencil'
                        },
                        {
                            value: 'move',
                            label: localize('panel.cards.current.actions.move', this.hass!.language),
                            icon: 'mdi:folder-move-outline'
                        },
                        {
                            value: 'delete',
                            label: localize('panel.cards.current.actions.remove', this.hass!.language),
                            icon: 'mdi:delete'
                        }
                    ]}
                    @menu-action=${(e: CustomEvent) => this._dispatch('task-menu-action', task.id, e.detail.action)}
                    ></hm-task-menu>
                `,
            },
        }
    };

    private get _columnsToDisplay() {
        const language = this.hass!.language;
        if (
            this._columnsCache &&
            this._columnsCache.narrow === this.narrow &&
            this._columnsCache.language === language
        ) {
            return this._columnsCache.columns;
        }
        const columns = Object.fromEntries(
            Object.entries(this._columns).filter(([_, col]) =>
                this.narrow ? (col as any).showNarrow !== false : true
            )
        );
        this._columnsCache = { narrow: this.narrow, language, columns };
        return columns;
    }

    private get _rows() {
        if (this._rowsCache?.tasks === this.tasks) {
            return this._rowsCache.rows;
        }
        const rows = this.tasks.map((task: Task) => this._taskToRow(task));
        this._rowsCache = { tasks: this.tasks, rows };
        return rows;
    }

    private _taskToRow(task: Task) {
        return {
            ...task,
            trigger_type: task.trigger_type ?? "time",
            // Sort keys: remaining progress for count/runtime, days for time.
            interval_days: this._intervalSortKey(task),
            next_due_date: task.next_due ? parseStoredDate(task.next_due) : null,
            next_due: this._dueSortKey(task),
            tagIcon: task.tag_id && task.tag_id.trim() !== "" ? "mdi:tag" : undefined,
        };
    }

    /**
     * Tasks bucketed into group sections: ungrouped first (when non-empty),
     * then every known group alphabetically — including empty ones, so a
     * freshly created group is immediately visible.
     */
    private get _sections() {
        if (
            this._sectionsCache?.tasks === this.tasks &&
            this._sectionsCache?.groups === this.groups
        ) {
            return this._sectionsCache.sections;
        }

        const buckets = new Map<string, any[]>();
        this.groups.forEach((group) => buckets.set(group, []));
        buckets.set("", []);
        this.tasks.forEach((task) => {
            const key = task.group_id?.trim() || "";
            if (!buckets.has(key)) buckets.set(key, []);
            buckets.get(key)!.push(this._taskToRow(task));
        });

        const named = [...buckets.keys()].filter((k) => k !== "").sort((a, b) => a.localeCompare(b));
        const ungrouped = buckets.get("")!;
        const sections = [
            ...(ungrouped.length
                ? [{ title: localize('common.ungrouped', this.hass!.language), rows: ungrouped }]
                : []),
            ...named.map((group) => ({ title: group, rows: buckets.get(group)! })),
        ];
        this._sectionsCache = { tasks: this.tasks, groups: this.groups, sections };
        return sections;
    }

    private _intervalSortKey(task: Task): number {
        if (task.trigger_type === "count" || task.trigger_type === "runtime") {
            if (!task.progress_target) return Number.MAX_SAFE_INTEGER;
            return task.progress_target - (task.progress_current ?? 0);
        }
        const unitDays = INTERVAL_TYPE_DAYS[task.interval_type];
        return unitDays ? task.interval_value * unitDays : Number.MAX_SAFE_INTEGER;
    }

    private _dueSortKey(task: Task): Date {
        if (task.next_due) return parseStoredDate(task.next_due);
        return task.due ? new Date(0) : FAR_FUTURE;
    }

    private _dispatch(type: string, taskId: string, action?: string) {
        this.dispatchEvent(new CustomEvent(type, {
            detail: { taskId, action },
            bubbles: true,
            composed: true,
        }));
    }

    render() {
        if (!this.hass) return html``;

        if ((!this.tasks || this.tasks.length === 0) && this.groups.length === 0) {
            return html`<span>${localize('common.no_tasks', this.hass.language)}</span>`;
        }

        // Without groups, keep the classic single table.
        if (this.groups.length === 0) {
            return html`
                <div class="table-wrapper">
                    <ha-data-table
                        .hass=${this.hass}
                        .columns=${this._columnsToDisplay}
                        .data=${this._rows}
                        .narrow=${this.narrow}
                        auto-height
                        id="tasks-table"
                        class="tasks-table"
                        clickable
                    >
                    </ha-data-table>
                </div>
            `;
        }

        return html`
            <div class="table-wrapper">
                ${this._sections.map((section) => html`
                    <div class="group-section">
                        <div class="group-header">
                            <span class="group-title">${section.title}</span>
                            <span class="group-count">${section.rows.length}</span>
                        </div>
                        ${section.rows.length ? html`
                            <ha-data-table
                                .hass=${this.hass}
                                .columns=${this._columnsToDisplay}
                                .data=${section.rows}
                                .narrow=${this.narrow}
                                auto-height
                                class="tasks-table"
                                clickable
                            >
                            </ha-data-table>
                        ` : html`
                            <span class="secondary">${localize('common.no_tasks', this.hass!.language)}</span>
                        `}
                    </div>
                `)}
            </div>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-task-table')) customElements.define('hm-task-table', HMTaskTable)
