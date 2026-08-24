import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { formatDateNumeric } from "custom-card-helpers";

import { localize } from '../localize/localize';
import { loadConfigDashboard } from './helpers';
import {
    Debouncer,
    TaskSchedule,
    computeTaskSchedule,
    formatDaysLabel,
    formatProgress,
    formatTriggerInterval,
    isDatedTrigger,
    parseStoredDate,
} from './compute';
import { historyStyles, renderHistoryList } from './util';
import { Task } from './types';
import {
    loadGroups,
    loadTasks,
    subscribeUpdates,
} from './data/websockets';
import { confirmCompleteTask, confirmRemoveTask } from './components/task-actions';
import './components/confirm-dialog';
import type { HMConfirmDialog } from './components/confirm-dialog';

/**
 * A Lovelace card that mirrors the Home Maintenance panel: tasks bucketed
 * into Overdue / Due soon / Upcoming with quick actions and expandable
 * details. Ported from @csteamengine's todo card and adapted to the
 * backend-computed trigger state (due / next_due / progress) of this fork.
 */

interface ComputedTask extends TaskSchedule {
    raw: Task;
}

interface CardConfig {
    title?: string;
    due_soon_days?: number;
    max_items?: number;
    show_search?: boolean;
    /** Pin the card to one group; hides the group dropdown. */
    group?: string;
}

const DEFAULT_CONFIG: CardConfig = {
    title: "Home Maintenance",
    due_soon_days: 14,
    max_items: 0,
    show_search: true,
};

const RELOAD_DEBOUNCE_MS = 300;

class HomeMaintenanceTodoCard extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() private _config: CardConfig = DEFAULT_CONFIG;
    @state() private _tasks: Task[] = [];
    @state() private _groups: string[] = [];
    @state() private _completing: Set<string> = new Set();
    @state() private _expandedTasks: Set<string> = new Set();
    @state() private _searchQuery = "";
    @state() private _groupFilter = "";

    @query('hm-confirm-dialog') private _confirmDialog?: HMConfirmDialog;

    private _unsubscribe?: () => Promise<void>;
    private _reload = new Debouncer(() => this._loadData(), RELOAD_DEBOUNCE_MS);
    private _initialized = false;

    setConfig(config: CardConfig) {
        this._config = { ...DEFAULT_CONFIG, ...config };
    }

    static getConfigElement() {
        return document.createElement("home-maintenance-todo-card-editor");
    }

    static getStubConfig() {
        return { title: "Home Maintenance", due_soon_days: 14 };
    }

    getCardSize() {
        return 3 + this._tasks.length;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._reload.cancel();
        this._unsubscribe?.();
        this._unsubscribe = undefined;
        this._initialized = false;
    }

    updated() {
        if (this.hass && !this._initialized) {
            this._initialized = true;
            this._initialize();
        }
    }

    private async _initialize() {
        // Dashboards don't ship ha-dialog by default; load the config
        // panel's components so the confirmation dialogs can render.
        await loadConfigDashboard();
        await this._loadData();
        try {
            this._unsubscribe = await subscribeUpdates(this.hass!, () => this._reload.schedule());
        } catch (e) {
            console.error("Failed to subscribe to task updates:", e);
        }
    }

    private async _loadData() {
        if (!this.hass) return;
        try {
            const [tasks, groups] = await Promise.all([
                loadTasks(this.hass),
                loadGroups(this.hass),
            ]);
            this._tasks = tasks;
            this._groups = groups;
        } catch {
            // Integration may not be loaded yet
        }
    }

    // --- Compute ---

    private _computeTask(task: Task): ComputedTask {
        const dueSoonDays = this._config.due_soon_days ?? DEFAULT_CONFIG.due_soon_days!;
        return { raw: task, ...computeTaskSchedule(task, dueSoonDays) };
    }

    private get _filteredTasks(): ComputedTask[] {
        let tasks = this._tasks.map((t) => this._computeTask(t));

        if (this._searchQuery.trim()) {
            const q = this._searchQuery.toLowerCase();
            tasks = tasks.filter((t) =>
                t.raw.title.toLowerCase().includes(q) ||
                (t.raw.description && t.raw.description.toLowerCase().includes(q)) ||
                (t.raw.group_id && t.raw.group_id.toLowerCase().includes(q))
            );
        }

        const groupFilter = this._config.group?.trim() || this._groupFilter;
        if (groupFilter) {
            tasks = tasks.filter((t) => (t.raw.group_id?.trim() || "") === groupFilter);
        }

        return tasks;
    }

    // --- Helpers ---

    private _formatDaysLabel(ct: ComputedTask): string {
        return formatDaysLabel(ct, ct.raw, this.hass!.language);
    }

    private _formatDate(date: Date | null): string {
        if (!date) return "";
        return formatDateNumeric(date, this.hass!.locale);
    }

    private _formatStoredDate(dateStr: string): string {
        return formatDateNumeric(parseStoredDate(dateStr), this.hass!.locale);
    }

    // --- Actions ---

    private _completeTask(task: Task) {
        if (this._completing.has(task.id)) return;
        // Wrap the shared action to drive the per-task in-flight spinner.
        confirmCompleteTask(this, this._confirmDialog, this.hass!, task, async (action) => {
            this._completing = new Set(this._completing).add(task.id);
            try {
                await action();
            } finally {
                const after = new Set(this._completing);
                after.delete(task.id);
                this._completing = after;
            }
        });
    }

    private _removeTask(taskId: string) {
        const task = this._tasks.find((t) => t.id === taskId);
        confirmRemoveTask(this, this._confirmDialog, this.hass!, task, taskId);
    }

    private _toggleExpand(taskId: string) {
        const next = new Set(this._expandedTasks);
        if (next.has(taskId)) next.delete(taskId);
        else next.add(taskId);
        this._expandedTasks = next;
    }

    private _openPanel() {
        window.location.href = "/home-maintenance";
    }

    // --- Render ---

    render() {
        if (!this.hass) return html``;
        const lang = this.hass.language;

        const filtered = this._filteredTasks;
        const maxItems = this._config.max_items ?? 0;
        const showSearch = this._config.show_search ?? true;

        const byDate = (a: ComputedTask, b: ComputedTask) => {
            if (a.nextDue && b.nextDue) return a.nextDue.getTime() - b.nextDue.getTime();
            if (a.nextDue) return -1;
            if (b.nextDue) return 1;
            return a.raw.title.localeCompare(b.raw.title);
        };
        let allTasks = [
            ...filtered.filter((t) => t.status === "overdue").sort(byDate),
            ...filtered.filter((t) => t.status === "due_soon").sort(byDate),
            ...filtered.filter((t) => t.status === "upcoming").sort(byDate),
        ];
        if (maxItems > 0) allTasks = allTasks.slice(0, maxItems);

        const overdue = allTasks.filter((t) => t.status === "overdue");
        const dueSoon = allTasks.filter((t) => t.status === "due_soon");
        const upcoming = allTasks.filter((t) => t.status === "upcoming");

        return html`
            <ha-card>
                ${this._config.title ? html`
                    <div class="card-header">
                        <span class="title">${this._config.title}</span>
                        <ha-icon-button
                            class="panel-link"
                            @click=${this._openPanel}
                            title=${localize('card.todo.open_panel', lang)}
                        >
                            <ha-icon icon="mdi:open-in-new"></ha-icon>
                        </ha-icon-button>
                    </div>
                ` : nothing}

                ${showSearch ? html`
                    <div class="filter-bar">
                        <div class="search-box">
                            <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                            <input
                                type="text"
                                .value=${this._searchQuery}
                                @input=${(e: Event) => this._searchQuery = (e.target as HTMLInputElement).value}
                                placeholder=${localize('card.todo.search', lang)}
                            />
                            ${this._searchQuery ? html`
                                <ha-icon-button @click=${() => this._searchQuery = ""}>
                                    <ha-icon icon="mdi:close"></ha-icon>
                                </ha-icon-button>
                            ` : nothing}
                        </div>
                        ${this._groups.length > 0 && !this._config.group?.trim() ? html`
                            <select
                                class="group-filter"
                                .value=${this._groupFilter}
                                @change=${(e: Event) => this._groupFilter = (e.target as HTMLSelectElement).value}
                            >
                                <option value="">${localize('card.todo.all_groups', lang)}</option>
                                ${this._groups.map((group) => html`
                                    <option value=${group} ?selected=${this._groupFilter === group}>${group}</option>
                                `)}
                            </select>
                        ` : nothing}
                    </div>
                ` : nothing}

                <div class="task-list">
                    ${overdue.length > 0 ? html`
                        <div class="group-header group-overdue">
                            <span class="group-dot dot-overdue"></span>
                            ${localize('card.todo.overdue', lang)}
                            <span class="group-count">(${overdue.length})</span>
                        </div>
                        ${overdue.map((t) => this._renderTaskCard(t))}
                    ` : nothing}

                    ${dueSoon.length > 0 ? html`
                        <div class="group-header group-due-soon">
                            <span class="group-dot dot-due-soon"></span>
                            ${localize('card.todo.due_soon', lang)}
                            <span class="group-count">(${dueSoon.length})</span>
                        </div>
                        ${dueSoon.map((t) => this._renderTaskCard(t))}
                    ` : nothing}

                    ${upcoming.length > 0 ? html`
                        <div class="group-header group-upcoming">
                            <span class="group-dot dot-upcoming"></span>
                            ${localize('card.todo.upcoming', lang)}
                            <span class="group-count">(${upcoming.length})</span>
                        </div>
                        ${upcoming.map((t) => this._renderTaskCard(t))}
                    ` : nothing}

                    ${allTasks.length === 0 ? html`
                        <div class="empty">${localize('card.todo.no_tasks', lang)}</div>
                    ` : nothing}
                </div>
            </ha-card>

            <hm-confirm-dialog></hm-confirm-dialog>
        `;
    }

    private _renderTaskCard(ct: ComputedTask): TemplateResult {
        const task = ct.raw;
        const lang = this.hass!.language;
        const isExpanded = this._expandedTasks.has(task.id);
        const isCompleting = this._completing.has(task.id);
        const isDated = isDatedTrigger(task);

        return html`
            <div class="task-card ${ct.status} ${isCompleting ? "completing" : ""} ${ct.completedToday ? "done-today" : ""}">
                <div class="task-card-main" @click=${() => this._toggleExpand(task.id)}>
                    <div class="task-left">
                        ${ct.completedToday ? html`
                            <ha-icon class="task-icon done-check" icon="mdi:check-circle"></ha-icon>
                        ` : task.icon ? html`<ha-icon class="task-icon" .icon=${task.icon}></ha-icon>` : nothing}
                        <div class="task-info">
                            <div class="task-title">${task.title}${ct.completedToday ? html`<span class="done-badge">${localize('card.todo.done', lang)}</span>` : nothing}</div>
                            <div class="task-meta">
                                <span class="task-interval">${formatTriggerInterval(task, this.hass!.language)}</span>
                                ${task.group_id ? html`
                                    <span class="task-group">${task.group_id}</span>
                                ` : nothing}
                            </div>
                        </div>
                    </div>
                    <div class="task-right">
                        <div class="task-due-info">
                            ${isDated ? html`
                                <span class="due-date">${this._formatDate(ct.nextDue)}</span>
                            ` : nothing}
                            <span class="due-days ${ct.status}">${this._formatDaysLabel(ct)}</span>
                        </div>
                        <div class="task-actions">
                            <ha-icon-button
                                @click=${(e: Event) => { e.stopPropagation(); this._completeTask(task); }}
                                title=${localize('card.todo.complete', lang)}
                                ?disabled=${isCompleting}
                            >
                                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${(e: Event) => { e.stopPropagation(); this._openPanel(); }}
                                title=${localize('card.todo.edit', lang)}
                            >
                                <ha-icon icon="mdi:pencil"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${(e: Event) => { e.stopPropagation(); this._removeTask(task.id); }}
                                title=${localize('card.todo.remove', lang)}
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${(e: Event) => { e.stopPropagation(); this._toggleExpand(task.id); }}
                            >
                                <ha-icon icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                            </ha-icon-button>
                        </div>
                    </div>
                </div>

                ${isExpanded ? html`
                    <div class="task-expanded">
                        ${task.description ? html`
                            <div class="task-section">
                                <div class="section-label">${localize('card.todo.description', lang)}</div>
                                <div class="section-content notes-content">${task.description}</div>
                            </div>
                        ` : nothing}

                        <div class="task-section">
                            <div class="section-label">${localize('card.todo.last_performed', lang)}</div>
                            <div class="section-content">
                                ${task.last_performed ? this._formatStoredDate(task.last_performed) : "-"}
                            </div>
                        </div>

                        ${!isDated ? html`
                            <div class="task-section">
                                <div class="section-label">${localize('card.todo.progress', lang)}</div>
                                <div class="section-content">
                                    ${formatProgress(task)}
                                </div>
                            </div>
                        ` : nothing}

                        ${task.history?.length ? html`
                            <div class="task-section">
                                <div class="section-label">${localize('card.todo.history', lang)}</div>
                                <div class="section-content">
                                    ${renderHistoryList(task.history, 3, this.hass!.locale)}
                                </div>
                            </div>
                        ` : nothing}
                    </div>
                ` : nothing}
            </div>
        `;
    }

    static styles = [historyStyles, css`
        :host {
            --todo-overdue: var(--error-color, #db4437);
            --todo-due-soon: var(--warning-color, #ffa726);
            --todo-upcoming: var(--success-color, #43a047);
        }

        ha-card {
            overflow: hidden;
        }

        /* Header */
        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 8px 0 16px;
        }

        .card-header .title {
            font-size: 18px;
            font-weight: 500;
            color: var(--primary-text-color);
        }

        .panel-link {
            --mdc-icon-button-size: 36px;
            color: var(--secondary-text-color);
        }

        /* Filter bar */
        .filter-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px 0;
            flex-wrap: wrap;
        }

        .search-box {
            display: flex;
            align-items: center;
            flex: 1;
            min-width: 150px;
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            padding: 4px 10px;
        }

        .search-icon {
            color: var(--secondary-text-color);
            margin-right: 6px;
            --mdc-icon-size: 20px;
            flex-shrink: 0;
        }

        .search-box input {
            border: none;
            outline: none;
            background: transparent;
            color: var(--primary-text-color);
            font-size: 14px;
            flex: 1;
            padding: 6px 0;
        }

        .search-box input::placeholder {
            color: var(--secondary-text-color);
        }

        .search-box ha-icon-button {
            --mdc-icon-button-size: 28px;
            color: var(--secondary-text-color);
        }

        .group-filter {
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            padding: 8px 10px;
            color: var(--primary-text-color);
            font-size: 13px;
        }

        /* Task list */
        .task-list {
            padding: 8px 0 12px;
        }

        /* Status group headers */
        .group-header {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: 12px 16px 6px;
        }

        .group-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .dot-overdue { background: var(--todo-overdue); }
        .dot-due-soon { background: var(--todo-due-soon); }
        .dot-upcoming { background: var(--todo-upcoming); }

        .group-overdue { color: var(--todo-overdue); }
        .group-due-soon { color: var(--todo-due-soon); }
        .group-upcoming { color: var(--todo-upcoming); }

        .group-count {
            font-weight: 400;
            opacity: 0.7;
        }

        /* Task cards */
        .task-card {
            background: var(--card-background-color, var(--ha-card-background, white));
            border-radius: 12px;
            margin: 6px 12px;
            border-left: 4px solid transparent;
            box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14));
            overflow: hidden;
            transition: box-shadow 0.2s ease, opacity 0.3s ease;
        }

        .task-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .task-card.overdue { border-left-color: var(--todo-overdue); }
        .task-card.due_soon { border-left-color: var(--todo-due-soon); }
        .task-card.upcoming { border-left-color: var(--todo-upcoming); }

        .task-card.completing { opacity: 0.4; }

        .task-card.done-today {
            opacity: 0.55;
            border-left-color: var(--secondary-text-color) !important;
        }

        .task-card.done-today .task-title {
            text-decoration: line-through;
            color: var(--secondary-text-color);
        }

        .done-check {
            color: var(--todo-upcoming) !important;
        }

        .done-badge {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            background: var(--todo-upcoming);
            color: var(--text-primary-color, white);
            border-radius: 4px;
            padding: 1px 6px;
            margin-left: 8px;
            text-decoration: none;
            display: inline-block;
            vertical-align: middle;
            letter-spacing: 0.3px;
        }

        .task-card-main {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 6px 10px 14px;
            cursor: pointer;
            gap: 8px;
        }

        .task-left {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
            min-width: 0;
        }

        .task-icon {
            flex-shrink: 0;
            color: var(--secondary-text-color);
            --mdc-icon-size: 24px;
        }

        .task-info {
            min-width: 0;
            flex: 1;
        }

        .task-title {
            font-size: 15px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .task-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--secondary-text-color);
            margin-top: 2px;
        }

        .task-group {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
            border-radius: 10px;
            padding: 1px 8px;
            font-size: 11px;
            font-weight: 500;
        }

        .task-right {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
        }

        .task-due-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            white-space: nowrap;
        }

        .due-date {
            font-size: 13px;
            color: var(--secondary-text-color);
        }

        .due-days {
            font-size: 12px;
            font-weight: 600;
        }

        .due-days.overdue { color: var(--todo-overdue); }
        .due-days.due_soon { color: var(--todo-due-soon); }
        .due-days.upcoming { color: var(--todo-upcoming); }

        .task-actions {
            display: flex;
            align-items: center;
        }

        .task-actions ha-icon-button {
            --mdc-icon-button-size: 34px;
            color: var(--secondary-text-color);
        }

        /* Expanded section */
        .task-expanded {
            padding: 0 14px 14px;
            border-top: 1px solid var(--divider-color);
        }

        .task-section {
            margin-top: 10px;
        }

        .section-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--secondary-text-color);
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .section-content {
            font-size: 14px;
        }

        .notes-content {
            white-space: pre-wrap;
            background: var(--secondary-background-color);
            border-radius: 8px;
            padding: 8px 12px;
        }

        /* Empty state */
        .empty {
            text-align: center;
            padding: 32px 16px;
            color: var(--secondary-text-color);
            font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .task-card-main {
                flex-wrap: wrap;
            }

            .task-right {
                width: 100%;
                justify-content: space-between;
            }

            .task-actions ha-icon-button {
                --mdc-icon-button-size: 30px;
            }

            .filter-bar {
                flex-direction: column;
                align-items: stretch;
            }

            .search-box {
                min-width: unset;
            }
        }
    `];
}

// --- Config editor ---
class HomeMaintenanceTodoCardEditor extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() private _config: CardConfig = DEFAULT_CONFIG;

    setConfig(config: CardConfig) {
        this._config = { ...DEFAULT_CONFIG, ...config };
    }

    private static readonly _schema = [
        { name: "title", selector: { text: {} } },
        { name: "due_soon_days", selector: { number: { min: 0, mode: "box" } } },
        { name: "max_items", selector: { number: { min: 0, mode: "box" } } },
        { name: "group", selector: { text: {} } },
        { name: "show_search", selector: { boolean: {} } },
    ];

    private static readonly _labels: Record<string, string> = {
        title: "Title",
        due_soon_days: "Due Soon Days (threshold)",
        max_items: "Max Items (0 = no limit)",
        group: "Group (show only this group's tasks)",
        show_search: "Show Search Bar",
    };

    private _computeLabel = (schema: { name: string }): string =>
        HomeMaintenanceTodoCardEditor._labels[schema.name] ?? schema.name;

    private _valueChanged(ev: CustomEvent) {
        ev.stopPropagation();
        this._config = { ...DEFAULT_CONFIG, ...this._config, ...ev.detail.value };
        this.dispatchEvent(new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        }));
    }

    render() {
        return html`
            <ha-form
                .hass=${this.hass}
                .data=${{ ...DEFAULT_CONFIG, ...this._config }}
                .schema=${HomeMaintenanceTodoCardEditor._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${(e: CustomEvent) => this._valueChanged(e)}
            ></ha-form>
        `;
    }
}

if (!customElements.get("home-maintenance-todo-card")) {
    customElements.define("home-maintenance-todo-card", HomeMaintenanceTodoCard);
}
if (!customElements.get("home-maintenance-todo-card-editor")) {
    customElements.define("home-maintenance-todo-card-editor", HomeMaintenanceTodoCardEditor);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "home-maintenance-todo-card",
    name: "Home Maintenance Todo",
    description: "A dashboard card mirroring the Home Maintenance panel: overdue / due soon / upcoming tasks with quick actions and expandable details",
    preview: true,
});
