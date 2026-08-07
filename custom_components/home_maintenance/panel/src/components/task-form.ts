import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { saveTask } from '../data/websockets';
import {
    basicSchema,
    advancedSchema,
    computeISODate,
    emptyTaskFormData,
    taskFormToAddPayload,
    validateTaskForm,
} from '../schema';
import { TaskFormData } from '../types';

/** The "Add New Task" card contents: basic + optional forms and the button. */
class HMTaskForm extends LitElement {
    @property() hass?: HomeAssistant;
    @property({ attribute: false }) groups: string[] = [];

    @state() private _formData: TaskFormData = emptyTaskFormData();
    private _advancedOpen = false;

    private _computeLabel = (schema: { name: string }): string => {
        try {
            return localize(`panel.cards.new.fields.${schema.name}.heading`, this.hass!.language) ?? schema.name;
        } catch {
            return schema.name;
        }
    }

    private _computeHelper = (schema: { name: string }): string => {
        try {
            return localize(`panel.cards.new.fields.${schema.name}.helper`, this.hass!.language) ?? "";
        } catch {
            return "";
        }
    }

    private async _handleAddTaskClick() {
        if (!validateTaskForm(this._formData)) {
            alert(localize("panel.cards.new.alerts.required", this.hass!.language));
            return;
        }

        const lastPerformedISO = computeISODate(this._formData.last_performed);
        if (lastPerformedISO === null) {
            alert("Invalid date entered.");
            return;
        }

        try {
            const title = this._formData.title.trim();
            await saveTask(this.hass!, taskFormToAddPayload(this._formData, lastPerformedISO));
            this._formData = emptyTaskFormData();
            this.dispatchEvent(new CustomEvent('task-added', {
                detail: { title },
                bubbles: true,
                composed: true,
            }));
        } catch (error) {
            console.error("Failed to add task:", error);
            alert(localize('panel.cards.new.alerts.error', this.hass!.language));
        }
    }

    private _handleFormValueChanged(ev: CustomEvent) {
        this._formData = { ...this._formData, ...ev.detail.value };
    }

    render() {
        if (!this.hass) return html``;

        return html`
            <ha-form
                .hass=${this.hass}
                .schema=${basicSchema(this._formData, this.hass.language)}
                .computeLabel=${this._computeLabel}
                .computeHelper=${this._computeHelper}
                .data=${this._formData}
                @value-changed=${(e: CustomEvent) => this._handleFormValueChanged(e)}
            ></ha-form>

            <ha-expansion-panel
                header="${localize('panel.cards.new.sections.optional', this.hass.language)}"
                .opened=${this._advancedOpen}
                @opened-changed=${(e: CustomEvent) => (this._advancedOpen = e.detail.value)}
                class="extras-panel"
            >
                <ha-form
                    .hass=${this.hass}
                    .data=${this._formData}
                    .schema=${advancedSchema(this.groups, this.hass.language)}
                    .computeLabel=${this._computeLabel}
                    .computeHelper=${this._computeHelper}
                    @value-changed=${(e: CustomEvent) => this._handleFormValueChanged(e)}
                ></ha-form>
            </ha-expansion-panel>

            <div class="form-field">
                <ha-button size="small" class="add-button"
                    @click=${this._handleAddTaskClick}>${localize('panel.cards.new.actions.add_task', this.hass.language)}
                </ha-button>
            </div>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-task-form')) customElements.define('hm-task-form', HMTaskForm)
