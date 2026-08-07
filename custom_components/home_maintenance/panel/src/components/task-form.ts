import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { showToast } from '../toast';
import { saveTask } from '../data/websockets';
import {
    basicFields,
    computeISODate,
    descriptionField,
    emptyTaskFormData,
    optionalFieldList,
    taskFormToAddPayload,
    validateTaskForm,
} from '../schema';
import { TaskFormData } from '../types';

/**
 * The "Add New Task" card contents: basic + optional field rows and the
 * button. Fields are rendered as bare ha-selectors with a uniform label
 * above each one, so the inputs line up horizontally regardless of whether
 * the underlying selector draws its own label inside (text, select, icon)
 * or above (entity, label pickers) the input.
 */
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
            showToast(this, localize("panel.cards.new.alerts.required", this.hass!.language));
            return;
        }

        const lastPerformedISO = computeISODate(this._formData.last_performed);
        if (lastPerformedISO === null) {
            showToast(this, localize("common.invalid_date", this.hass!.language));
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
            showToast(this, localize('panel.cards.new.alerts.error', this.hass!.language));
        }
    }

    private _handleFieldChanged(name: string, ev: CustomEvent) {
        ev.stopPropagation();
        this._formData = { ...this._formData, [name]: ev.detail.value };
    }

    private _renderField = (field: any) => html`
        <div class="field ${field.name}">
            <div class="field-label">
                ${this._computeLabel(field)}${field.required ? " *" : ""}
            </div>
            <ha-selector
                .hass=${this.hass}
                .selector=${field.selector}
                .value=${(this._formData as any)[field.name]}
                .helper=${this._computeHelper(field)}
                .required=${field.required ?? false}
                @value-changed=${(e: CustomEvent) => this._handleFieldChanged(field.name, e)}
            ></ha-selector>
        </div>
    `;

    render() {
        if (!this.hass) return html``;

        return html`
            <div class="basic-row">
                <div class="fields-grid">
                    ${basicFields(this._formData, this.hass.language).map(this._renderField)}
                </div>
                <ha-button size="small" class="add-button"
                    @click=${this._handleAddTaskClick}>${localize('panel.cards.new.actions.add_task', this.hass.language)}
                </ha-button>
            </div>

            <ha-expansion-panel
                header="${localize('panel.cards.new.sections.optional', this.hass.language)}"
                .opened=${this._advancedOpen}
                @opened-changed=${(e: CustomEvent) => (this._advancedOpen = e.detail.value)}
                class="extras-panel"
            >
                <div class="fields-grid">
                    ${optionalFieldList(this.groups, this.hass.language).map(this._renderField)}
                    ${this._renderField(descriptionField(false))}
                </div>
            </ha-expansion-panel>
        `;
    }

    static styles = [commonStyle, css`
        .fields-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
            column-gap: 8px;
            row-gap: 16px;
            align-items: start;
        }

        .basic-row .fields-grid {
            flex: 1 1 500px;
            min-width: 0;
        }

        .field-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--secondary-text-color);
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .field ha-selector {
            display: block;
            width: 100%;
        }

        /* Description spans the full line below the other optional fields. */
        .field.description {
            grid-column: 1 / -1;
        }
    `];
}

if (!customElements.get('hm-task-form')) customElements.define('hm-task-form', HMTaskForm)
