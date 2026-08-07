import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { fireEvent } from "custom-card-helpers";

import { localize } from '../localize/localize';
import { loadConfigDashboard } from './helpers';
import { loadGroups, subscribeUpdates } from './data/websockets';
import './components/task-form';

/**
 * A Lovelace card wrapping the panel's "Add New Task" form, so tasks can be
 * created from any dashboard. Reuses hm-task-form — the exact form the panel
 * shows — including trigger types, groups, and all optional fields.
 */

interface CardConfig {
    title?: string;
}

const DEFAULT_CONFIG: CardConfig = {
    title: "Add Maintenance Task",
};

const RELOAD_DEBOUNCE_MS = 300;

class HomeMaintenanceAddTaskCard extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() private _config: CardConfig = DEFAULT_CONFIG;
    @state() private _groups: string[] = [];
    @state() private _ready = false;

    private _unsubscribe?: () => Promise<void>;
    private _reloadTimer?: ReturnType<typeof setTimeout>;
    private _initialized = false;

    setConfig(config: CardConfig) {
        this._config = { ...DEFAULT_CONFIG, ...config };
    }

    static getConfigElement() {
        return document.createElement("home-maintenance-add-task-card-editor");
    }

    static getStubConfig() {
        return { title: "Add Maintenance Task" };
    }

    getCardSize() {
        return 6;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._reloadTimer !== undefined) clearTimeout(this._reloadTimer);
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
        // Dashboards don't ship ha-form and friends by default; load the
        // config panel's components the same way the sidebar panel does.
        await loadConfigDashboard();
        this._ready = true;
        await this._loadGroups();
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
            this._loadGroups();
        }, RELOAD_DEBOUNCE_MS);
    }

    private async _loadGroups() {
        if (!this.hass) return;
        try {
            this._groups = await loadGroups(this.hass);
        } catch {
            // Integration may not be loaded yet
        }
    }

    private _handleTaskAdded(e: CustomEvent) {
        fireEvent(this, "hass-notification" as any, {
            message: localize(
                'card.add_task.added', this.hass!.language,
                '{title}', e.detail?.title ?? '',
            ),
        });
    }

    render() {
        if (!this.hass) return html``;

        return html`
            <ha-card>
                ${this._config.title ? html`
                    <h1 class="card-header">${this._config.title}</h1>
                ` : nothing}
                <div class="card-content">
                    ${this._ready ? html`
                        <hm-task-form
                            .hass=${this.hass}
                            .groups=${this._groups}
                            @task-added=${this._handleTaskAdded}
                        ></hm-task-form>
                    ` : html`
                        <p>${localize('common.loading', this.hass.language)}</p>
                    `}
                </div>
            </ha-card>
        `;
    }

    static styles = css`
        .card-header {
            font-size: 18px;
            font-weight: 500;
            padding: 12px 16px 0;
            margin: 0;
            color: var(--primary-text-color);
        }

        .card-content {
            padding: 8px 16px 16px;
        }
    `;
}

// --- Config editor ---
class HomeMaintenanceAddTaskCardEditor extends LitElement {
    @property({ attribute: false }) hass?: HomeAssistant;
    @state() private _config: CardConfig = DEFAULT_CONFIG;

    setConfig(config: CardConfig) {
        this._config = { ...DEFAULT_CONFIG, ...config };
    }

    private _valueChanged(ev: CustomEvent) {
        ev.stopPropagation();
        this._config = { ...this._config, ...ev.detail.value };
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
                .data=${this._config}
                .schema=${[{ name: "title", selector: { text: {} } }]}
                .computeLabel=${() => "Title (empty for none)"}
                @value-changed=${(e: CustomEvent) => this._valueChanged(e)}
            ></ha-form>
        `;
    }
}

if (!customElements.get("home-maintenance-add-task-card")) {
    customElements.define("home-maintenance-add-task-card", HomeMaintenanceAddTaskCard);
}
if (!customElements.get("home-maintenance-add-task-card-editor")) {
    customElements.define("home-maintenance-add-task-card-editor", HomeMaintenanceAddTaskCardEditor);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: "home-maintenance-add-task-card",
    name: "Home Maintenance Add Task",
    description: "Create Home Maintenance tasks from a dashboard — the panel's full add-task form, including trigger types, groups, and optional fields",
    preview: false,
});
