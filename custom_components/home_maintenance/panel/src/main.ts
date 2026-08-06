import { LitElement, html } from "lit";
import { property, state, query } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../localize/localize';
import { loadConfigDashboard } from "./helpers";
import { commonStyle } from './styles'
import { EntityRegistryEntry, IntegrationConfig, Label, Task, Tag } from './types';
import {
    completeTask,
    getConfig,
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
import type { HMEditDialog } from './components/edit-dialog'

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
    @state() private config: IntegrationConfig | null = null;
    @state() private registry: EntityRegistryEntry[] = [];
    @state() private labelRegistry: Label[] = [];

    @query('hm-edit-dialog') private _editDialog?: HMEditDialog;

    private _unsubscribe?: () => Promise<void>;
    private _reloadTimer?: ReturnType<typeof setTimeout>;

    connectedCallback() {
        super.connectedCallback();
        this._initialize();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._reloadTimer !== undefined) clearTimeout(this._reloadTimer);
        this._unsubscribe?.();
        this._unsubscribe = undefined;
    }

    private async _initialize() {
        await this._loadData();
        try {
            this._unsubscribe = await subscribeUpdates(this.hass!, () => this._scheduleReload());
        } catch (e) {
            console.error("Failed to subscribe to task updates:", e);
        }
    }

    private _scheduleReload() {
        if (this._reloadTimer !== undefined) clearTimeout(this._reloadTimer);
        this._reloadTimer = setTimeout(() => {
            this._reloadTimer = undefined;
            this._loadData();
        }, RELOAD_DEBOUNCE_MS);
    }

    private async _loadData() {
        await loadConfigDashboard();
        // Fetch everything concurrently, then assign synchronously so
        // LitElement batches the updates into a single render.
        const [tags, tasks, config, registry, labelRegistry] = await Promise.all([
            loadTags(this.hass!),
            loadTasks(this.hass!),
            getConfig(this.hass!),
            loadRegistryEntries(this.hass!),
            loadLabelRegistry(this.hass!),
        ]);
        this.tags = tags;
        this.tasks = tasks;
        this.config = config;
        this.registry = registry;
        this.labelRegistry = labelRegistry;
    }

    private _handleComplete(e: CustomEvent) {
        completeTask(this.hass!, e.detail.taskId).catch((err) =>
            console.error("Failed to complete task:", err));
    }

    private _handleMenuAction(e: CustomEvent) {
        const { taskId, action } = e.detail;
        if (action === 'edit') {
            this._editDialog?.open(taskId);
        } else if (action === 'delete') {
            this._handleRemove(taskId);
        }
    }

    private async _handleRemove(taskId: string) {
        const msg = localize('panel.cards.current.confirm_remove', this.hass!.language)
        if (!confirm(msg)) return;
        try {
            await removeTask(this.hass!, taskId);
        } catch (e) {
            console.error("Failed to remove task:", e);
        }
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
                        <hm-task-form .hass=${this.hass}></hm-task-form>
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
                            .registry=${this.registry}
                            .labelRegistry=${this.labelRegistry}
                            @task-complete=${this._handleComplete}
                            @task-menu-action=${this._handleMenuAction}
                        ></hm-task-table>
                    </div>
                </ha-card>
            </div>

            <hm-edit-dialog
                .hass=${this.hass}
                .registry=${this.registry}
                .labelRegistry=${this.labelRegistry}
            ></hm-edit-dialog>
        `;
    }

    static styles = commonStyle;
}

customElements.define("home-maintenance-panel", HomeMaintenancePanel);
