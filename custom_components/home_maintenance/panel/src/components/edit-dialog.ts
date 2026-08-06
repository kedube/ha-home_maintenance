import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { loadTask, updateTask } from '../data/websockets';
import {
    computeISODate,
    editSchema,
    emptyTaskFormData,
    taskFormToUpdates,
    taskToFormData,
    validateTaskForm,
} from '../schema';
import { EntityRegistryEntry, Label, TaskFormData } from '../types';

/** The edit-task dialog. Call open(taskId) to load a task and show it. */
class HMEditDialog extends LitElement {
    @property() hass?: HomeAssistant;
    @property({ attribute: false }) registry: EntityRegistryEntry[] = [];
    @property({ attribute: false }) labelRegistry: Label[] = [];

    @state() private _taskId: string | null = null;
    @state() private _formData: TaskFormData = emptyTaskFormData();

    public async open(taskId: string) {
        try {
            const task = await loadTask(this.hass!, taskId);
            const entity = this.registry.find((entry) => entry.unique_id === task.id);
            const labels = entity
                ? this.labelRegistry.filter((lr) => entity.labels.includes(lr.label_id))
                : [];
            this._formData = taskToFormData(task, entity, labels);
            this._taskId = task.id;
        } catch (e) {
            console.error("Failed to fetch task for edit:", e);
        }
    }

    private _computeLabel = (schema: { name: string }): string => {
        try {
            return localize(`panel.dialog.edit_task.fields.${schema.name}.heading`, this.hass!.language) ?? schema.name;
        } catch {
            return schema.name;
        }
    }

    private _computeHelper = (schema: { name: string }): string => {
        try {
            return localize(`panel.dialog.edit_task.fields.${schema.name}.helper`, this.hass!.language) ?? "";
        } catch {
            return "";
        }
    }

    private async _handleSaveClick() {
        if (!this._taskId) return;

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
            await updateTask(this.hass!, {
                task_id: this._taskId,
                updates: taskFormToUpdates(this._formData, lastPerformedISO),
            });
            this._close();
        } catch (e) {
            console.error("Failed to update task:", e);
        }
    }

    private _close() {
        this._taskId = null;
        this._formData = emptyTaskFormData();
    }

    private _handleFormValueChanged(ev: CustomEvent) {
        this._formData = { ...this._formData, ...ev.detail.value };
    }

    render() {
        if (!this.hass || !this._taskId) return html``;

        return html`
            <ha-dialog
                open
                heading="${localize('panel.dialog.edit_task.title', this.hass.language)}: ${this._formData.title}"
                prevent-scrim-close
                @closed=${this._close}
            >
                <ha-form
                    autofocus
                    .hass=${this.hass}
                    .schema=${editSchema(this._formData, this.hass.language)}
                    .computeLabel=${this._computeLabel}
                    .computeHelper=${this._computeHelper}
                    .data=${this._formData}
                    @value-changed=${(e: CustomEvent) => this._handleFormValueChanged(e)}
                ></ha-form>

                <ha-dialog-footer slot="footer">
                    <ha-button data-dialog="close" appearance="plain" slot="secondaryAction">
                        ${localize('panel.dialog.edit_task.actions.cancel', this.hass.language)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleSaveClick}>
                        ${localize('panel.dialog.edit_task.actions.save', this.hass.language)}
                    </ha-button>
                </ha-dialog-footer>
            </ha-dialog>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-edit-dialog')) customElements.define('hm-edit-dialog', HMEditDialog)

declare global {
    interface HTMLElementTagNameMap {
        'hm-edit-dialog': HMEditDialog;
    }
}

export type { HMEditDialog };
