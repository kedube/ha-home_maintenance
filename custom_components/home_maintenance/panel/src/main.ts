import { LitElement, css, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../localize/localize';
import { loadConfigDashboard } from "./helpers";
import { showToast } from './toast';
import { commonStyle } from './styles'
import { Debouncer, filterTasks } from './compute';
import { tasksToCsv } from './csv';
import type { TaskTemplate } from './templates';
import { EntityRegistryEntry, IntegrationConfig, Label, Task } from './types';
import {
    getConfig,
    loadGroups,
    loadLabelRegistry,
    loadRegistryEntries,
    loadTasks,
    subscribeUpdates,
} from './data/websockets';
import { confirmCompleteTask, confirmRemoveTask } from './components/task-actions'
import './components/task-table'
import './components/task-form'
import './components/edit-dialog'
import './components/group-manager'
import './components/move-dialog'
import './components/confirm-dialog'
import './components/template-dialog'
import type { HMEditDialog } from './components/edit-dialog'
import type { HMMoveDialog } from './components/move-dialog'
import type { HMConfirmDialog } from './components/confirm-dialog'
import type { HMTemplateDialog } from './components/template-dialog'

const RELOAD_DEBOUNCE_MS = 300;

/**
 * Panel orchestrator: loads data, keeps it live via the backend's
 * subscribe_updates push channel, and wires the child components together.
 */
export class HomeMaintenancePanel extends LitElement {
    @property() hass?: HomeAssistant;
    @property() narrow!: boolean;

    @state() private _loaded = false;
    @state() private tasks: Task[] = [];
    @state() private groups: string[] = [];
    @state() private config: IntegrationConfig | null = null;
    @state() private registry: EntityRegistryEntry[] = [];
    @state() private labelRegistry: Label[] = [];
    @state() private _search = "";
    @state() private _selectedLabels: string[] = [];

    @query('hm-edit-dialog') private _editDialog?: HMEditDialog;
    @query('hm-move-dialog') private _moveDialog?: HMMoveDialog;
    @query('hm-confirm-dialog') private _confirmDialog?: HMConfirmDialog;
    @query('hm-template-dialog') private _templateDialog?: HMTemplateDialog;
    @query('hm-task-form') private _taskForm?: any;

    private _unsubscribe?: () => Promise<void>;
    private _reload = new Debouncer(() => this._loadData(), RELOAD_DEBOUNCE_MS);

    connectedCallback() {
        super.connectedCallback();
        this._initialize();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._reload.cancel();
        this._unsubscribe?.();
        this._unsubscribe = undefined;
    }

    private async _initialize() {
        // One-time setup: HA components, plus data no task mutation can
        // change. The push path below only refetches what mutations touch.
        await loadConfigDashboard();
        this.config = await getConfig(this.hass!);
        await this._loadData();
        this._loaded = true;
        try {
            this._unsubscribe = await subscribeUpdates(this.hass!, () => this._reload.schedule());
        } catch (e) {
            console.error("Failed to subscribe to task updates:", e);
        }
    }

    private async _loadData() {
        // Fetch concurrently, then assign synchronously so LitElement
        // batches the updates into a single render. Registries are included
        // because task edits can change entity labels and areas.
        const [tasks, groups, registry, labelRegistry] = await Promise.all([
            loadTasks(this.hass!),
            loadGroups(this.hass!),
            loadRegistryEntries(this.hass!),
            loadLabelRegistry(this.hass!),
        ]);
        this.tasks = tasks;
        this.groups = groups;
        this.registry = registry;
        this.labelRegistry = labelRegistry;
    }

    private _handleComplete(e: CustomEvent) {
        const task = this.tasks.find((t) => t.id === e.detail.taskId);
        if (!task) return;
        confirmCompleteTask(this, this._confirmDialog, this.hass!, task);
    }

    private _handleMenuAction(e: CustomEvent) {
        const { taskId, action } = e.detail;
        if (action === 'edit') {
            this._editDialog?.open(taskId);
        } else if (action === 'move') {
            const task = this.tasks.find((t) => t.id === taskId);
            if (task) this._moveDialog?.open(task);
        } else if (action === 'delete') {
            this._handleRemove(taskId);
        }
    }

    private _handleRemove(taskId: string) {
        const task = this.tasks.find((t) => t.id === taskId);
        confirmRemoveTask(this, this._confirmDialog, this.hass!, task, taskId);
    }

    private _handleTaskAdded(e: CustomEvent) {
        showToast(this, localize(
            'card.add_task.added', this.hass!.language,
            '{title}', e.detail?.title ?? '',
        ));
    }

    private _handleTemplateSelected(e: CustomEvent) {
        const template: TaskTemplate = e.detail.template;
        this._taskForm?.prefill({
            title: template.title,
            description: template.description,
            trigger_type: "time",
            interval_value: template.interval_value,
            interval_type: template.interval_type,
            icon: template.icon,
        });
        this._taskForm?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    private _handleCsvImported(e: CustomEvent) {
        const { created, failures } = e.detail as { created: number; failures: string[] };
        showToast(this, localize(
            'panel.dialog.templates.imported', this.hass!.language,
            '{count}', created,
        ));
        if (failures.length) {
            showToast(this, localize(
                'panel.dialog.templates.import_failed', this.hass!.language,
                '{titles}', failures.join(', '),
            ));
        }
    }

    private _handleExportCsv() {
        const blob = new Blob([tasksToCsv(this.tasks)], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "home_maintenance_tasks.csv";
        anchor.click();
        URL.revokeObjectURL(url);
    }

    // hass updates on every HA state change, re-running render(); these two
    // caches keep the filtered list and chip row stable (same references)
    // unless their actual inputs changed, so the task table's identity-keyed
    // caches stay warm while a filter is active.
    private _visibleCache?: {
        tasks: Task[]; registry: EntityRegistryEntry[];
        search: string; labels: string[]; result: Task[];
    };
    private _labelsInUseCache?: {
        tasks: Task[]; registry: EntityRegistryEntry[];
        labelRegistry: Label[]; result: Label[];
    };

    private get _visibleTasks(): Task[] {
        const cache = this._visibleCache;
        if (
            cache &&
            cache.tasks === this.tasks &&
            cache.registry === this.registry &&
            cache.search === this._search &&
            cache.labels === this._selectedLabels
        ) {
            return cache.result;
        }
        const result = filterTasks(this.tasks, this.registry, this._search, this._selectedLabels);
        this._visibleCache = {
            tasks: this.tasks,
            registry: this.registry,
            search: this._search,
            labels: this._selectedLabels,
            result,
        };
        return result;
    }

    /** Label registry entries currently used by at least one task. */
    private get _labelsInUse(): Label[] {
        const cache = this._labelsInUseCache;
        if (
            cache &&
            cache.tasks === this.tasks &&
            cache.registry === this.registry &&
            cache.labelRegistry === this.labelRegistry
        ) {
            return cache.result;
        }
        const used = new Set<string>();
        const taskIds = new Set(this.tasks.map((task) => task.id));
        this.registry.forEach((entry) => {
            if (taskIds.has(entry.unique_id)) entry.labels.forEach((id) => used.add(id));
        });
        const result = this.labelRegistry.filter((label) => used.has(label.label_id));
        this._labelsInUseCache = {
            tasks: this.tasks,
            registry: this.registry,
            labelRegistry: this.labelRegistry,
            result,
        };
        return result;
    }

    private _toggleLabel(labelId: string) {
        this._selectedLabels = this._selectedLabels.includes(labelId)
            ? this._selectedLabels.filter((id) => id !== labelId)
            : [...this._selectedLabels, labelId];
    }

    render() {
        if (!this.hass) return html``;

        if (!this._loaded) {
            return html`<p>${localize('common.loading', this.hass.language)}</p>`;
        }

        return html`
            <div class="header">
                <div class="toolbar">
                    <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
                    <div class="main-title">
                        ${this.config?.options.sidebar_title}
                    </div>
                    <div class="version">
                        v${this.config?.version ?? ""}
                    </div>
                </div>
            </div>

            <div class="view">
                <ha-card
                    header="${localize('panel.cards.new.title', this.hass.language)}"
                    class="card-new"
                >
                    <div class="card-content">
                        <hm-task-form
                            .hass=${this.hass}
                            .groups=${this.groups}
                            @task-added=${this._handleTaskAdded}
                        ></hm-task-form>
                    </div>
                </ha-card>

                <ha-card
                    header="${localize('panel.cards.current.title', this.hass.language)}"
                    class="card-current"
                >
                    <div class="card-content">
                        ${this._renderFilterBar()}
                        <hm-task-table
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            .tasks=${this._visibleTasks}
                            .groups=${this.groups}
                            .registry=${this.registry}
                            .labelRegistry=${this.labelRegistry}
                            .hideEmptyGroups=${Boolean(this._search.trim() || this._selectedLabels.length)}
                            @task-complete=${this._handleComplete}
                            @task-menu-action=${this._handleMenuAction}
                        ></hm-task-table>
                    </div>
                </ha-card>

                <ha-card
                    header="${localize('panel.cards.groups.title', this.hass.language)}"
                    class="card-new"
                >
                    <div class="card-content">
                        <hm-group-manager .hass=${this.hass} .groups=${this.groups}></hm-group-manager>
                    </div>
                </ha-card>
            </div>

            <hm-edit-dialog
                .hass=${this.hass}
                .registry=${this.registry}
                .labelRegistry=${this.labelRegistry}
                .groups=${this.groups}
            ></hm-edit-dialog>
            <hm-move-dialog .hass=${this.hass} .groups=${this.groups}></hm-move-dialog>
            <hm-confirm-dialog></hm-confirm-dialog>
            <hm-template-dialog
                .hass=${this.hass}
                @template-selected=${this._handleTemplateSelected}
                @csv-imported=${this._handleCsvImported}
            ></hm-template-dialog>
        `;
    }

    private _renderFilterBar() {
        const lang = this.hass!.language;
        const labels = this._labelsInUse;
        const hasFilter = Boolean(this._search.trim() || this._selectedLabels.length);
        return html`
            <div class="filter-bar">
                <input
                    class="search-input"
                    type="search"
                    .value=${this._search}
                    placeholder=${localize('panel.cards.current.filter.search', lang)}
                    @input=${(e: InputEvent) => { this._search = (e.target as HTMLInputElement).value; }}
                />
                <div class="filter-actions">
                    <ha-button appearance="plain" size="small"
                        @click=${() => this._templateDialog?.open()}>
                        ${localize('panel.cards.current.filter.templates', lang)}
                    </ha-button>
                    <ha-button appearance="plain" size="small" @click=${this._handleExportCsv}>
                        ${localize('panel.cards.current.filter.export', lang)}
                    </ha-button>
                </div>
            </div>
            ${labels.length ? html`
                <div class="label-chips">
                    ${labels.map((label) => html`
                        <button
                            class="label-chip ${this._selectedLabels.includes(label.label_id) ? 'selected' : ''}"
                            @click=${() => this._toggleLabel(label.label_id)}
                        >
                            ${label.icon ? html`<ha-icon .icon=${label.icon}></ha-icon>` : ''}
                            ${label.name}
                        </button>
                    `)}
                    ${hasFilter ? html`
                        <button class="label-chip clear"
                            @click=${() => { this._search = ""; this._selectedLabels = []; }}>
                            ${localize('panel.cards.current.filter.clear', lang)}
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        `;
    }

    static styles = [commonStyle, css`
        .filter-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 8px;
        }

        .search-input {
            flex: 1 1 220px;
            min-width: 0;
            box-sizing: border-box;
            padding: 8px 12px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            background: var(--card-background-color);
            color: var(--primary-text-color);
            font: inherit;
        }

        .search-input:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: -1px;
        }

        .filter-actions {
            display: flex;
            gap: 4px;
        }

        .label-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 8px;
        }

        .label-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            border: 1px solid var(--divider-color);
            border-radius: 16px;
            background: var(--card-background-color);
            color: var(--primary-text-color);
            font: inherit;
            font-size: 13px;
            cursor: pointer;
        }

        .label-chip ha-icon {
            --mdc-icon-size: 16px;
        }

        .label-chip.selected {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: var(--text-primary-color, #fff);
        }

        .label-chip.clear {
            border-style: dashed;
            color: var(--secondary-text-color);
        }
    `];
}

customElements.define("home-maintenance-panel", HomeMaintenancePanel);
