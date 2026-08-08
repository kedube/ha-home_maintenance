import { LitElement, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../localize/localize';
import { loadConfigDashboard } from "./helpers";
import { showToast } from './toast';
import { commonStyle } from './styles'
import { Debouncer, formatProgress, formatTimeInterval } from './util';
import { EntityRegistryEntry, IntegrationConfig, Label, Task, Tag } from './types';
import {
    completeTask,
    getConfig,
    loadGroups,
    loadLabelRegistry,
    loadRegistryEntries,
    loadTags,
    loadTasks,
    removeTask,
    subscribeUpdates,
} from './data/websockets';
import './components/task-table'
import './components/task-form'
import './components/edit-dialog'
import './components/group-manager'
import './components/move-dialog'
import './components/confirm-dialog'
import type { HMEditDialog } from './components/edit-dialog'
import type { HMMoveDialog } from './components/move-dialog'
import type { HMConfirmDialog } from './components/confirm-dialog'

const RELOAD_DEBOUNCE_MS = 300;

/**
 * Panel orchestrator: loads data, keeps it live via the backend's
 * subscribe_updates push channel, and wires the child components together.
 */
export class HomeMaintenancePanel extends LitElement {
    @property() hass?: HomeAssistant;
    @property() narrow!: boolean;

    @state() private tags: Tag[] | null = null;
    @state() private tasks: Task[] = [];
    @state() private groups: string[] = [];
    @state() private config: IntegrationConfig | null = null;
    @state() private registry: EntityRegistryEntry[] = [];
    @state() private labelRegistry: Label[] = [];

    @query('hm-edit-dialog') private _editDialog?: HMEditDialog;
    @query('hm-move-dialog') private _moveDialog?: HMMoveDialog;
    @query('hm-confirm-dialog') private _confirmDialog?: HMConfirmDialog;

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
        const [tags, config] = await Promise.all([
            loadTags(this.hass!),
            getConfig(this.hass!),
        ]);
        this.tags = tags;
        this.config = config;
        await this._loadData();
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
        const lang = this.hass!.language;
        const isTime = (task.trigger_type ?? "time") === "time";
        const interval = isTime
            ? formatTimeInterval(task.interval_value, task.interval_type, lang)
            : formatProgress(task);
        this._confirmDialog?.open({
            heading: localize('panel.dialog.confirm_complete.title', lang),
            message: localize(
                isTime
                    ? 'panel.dialog.confirm_complete.message'
                    : 'panel.dialog.confirm_complete.message_progress',
                lang, '{title}', task.title, '{interval}', interval,
            ),
            confirmLabel: localize('panel.dialog.confirm_complete.actions.confirm', lang),
            cancelLabel: localize('common.cancel', lang),
            onConfirm: () => this._completeTask(task),
        });
    }

    private async _completeTask(task: Task) {
        const lang = this.hass!.language;
        try {
            await completeTask(this.hass!, task.id);
            showToast(this, localize('panel.cards.current.alerts.complete_success', lang, '{title}', task.title));
        } catch (e) {
            console.error("Failed to complete task:", e);
            showToast(this, localize('panel.cards.current.alerts.complete_error', lang));
        }
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
        const lang = this.hass!.language;
        const task = this.tasks.find((t) => t.id === taskId);
        this._confirmDialog?.open({
            heading: localize('panel.dialog.confirm_remove.title', lang),
            message: localize('panel.dialog.confirm_remove.message', lang, '{title}', task?.title ?? ''),
            confirmLabel: localize('panel.dialog.confirm_remove.actions.confirm', lang),
            cancelLabel: localize('common.cancel', lang),
            destructive: true,
            onConfirm: () => this._removeTask(taskId),
        });
    }

    private async _removeTask(taskId: string) {
        try {
            await removeTask(this.hass!, taskId);
        } catch (e) {
            console.error("Failed to remove task:", e);
            showToast(this, localize('panel.cards.current.alerts.remove_error', this.hass!.language));
        }
    }

    private _handleTaskAdded(e: CustomEvent) {
        showToast(this, localize(
            'card.add_task.added', this.hass!.language,
            '{title}', e.detail?.title ?? '',
        ));
    }

    render() {
        if (!this.hass) return html``;

        if (!this.tasks || !this.tags) {
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
                        <hm-task-table
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            .tasks=${this.tasks}
                            .groups=${this.groups}
                            .registry=${this.registry}
                            .labelRegistry=${this.labelRegistry}
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
        `;
    }

    static styles = commonStyle;
}

customElements.define("home-maintenance-panel", HomeMaintenancePanel);
