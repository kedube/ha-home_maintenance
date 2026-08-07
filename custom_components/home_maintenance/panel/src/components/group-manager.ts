import { LitElement, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { mdiCheck, mdiClose, mdiDelete, mdiPencil } from "@mdi/js";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { showToast } from '../toast';
import { createGroup, deleteGroup, renameGroup } from '../data/websockets';
import './confirm-dialog';
import type { HMConfirmDialog } from './confirm-dialog';

/**
 * The "Groups" card contents: create a group, and rename or delete existing
 * ones inline. Mutations reach the panel again through the backend's
 * subscribe_updates push channel, so no events need to bubble up.
 */
class HMGroupManager extends LitElement {
    @property() hass?: HomeAssistant;
    @property({ attribute: false }) groups: string[] = [];

    @state() private _newGroupName = "";
    @state() private _renamingGroup: string | null = null;
    @state() private _renameValue = "";

    @query('hm-confirm-dialog') private _confirmDialog?: HMConfirmDialog;

    private async _handleCreate() {
        const groupId = this._newGroupName.trim();
        if (!groupId) return;
        if (this.groups.includes(groupId)) {
            showToast(this, localize('panel.cards.groups.alerts.exists', this.hass!.language, '{title}', groupId));
            return;
        }
        try {
            await createGroup(this.hass!, groupId);
            this._newGroupName = "";
        } catch (e) {
            console.error("Failed to create group:", e);
            showToast(this, localize('panel.cards.groups.alerts.error', this.hass!.language));
        }
    }

    private _startRename(groupId: string) {
        this._renamingGroup = groupId;
        this._renameValue = groupId;
    }

    private async _handleRename() {
        const oldGroup = this._renamingGroup;
        const newGroup = this._renameValue.trim();
        this._renamingGroup = null;
        if (!oldGroup || !newGroup || oldGroup === newGroup) return;
        try {
            await renameGroup(this.hass!, oldGroup, newGroup);
        } catch (e) {
            console.error("Failed to rename group:", e);
            showToast(this, localize('panel.cards.groups.alerts.rename_error', this.hass!.language));
        }
    }

    private _handleDelete(groupId: string) {
        const lang = this.hass!.language;
        this._confirmDialog?.open({
            heading: localize('panel.cards.groups.confirm_delete_title', lang),
            message: localize('panel.cards.groups.confirm_delete', lang, '{title}', groupId),
            confirmLabel: localize('panel.cards.groups.actions.delete', lang),
            cancelLabel: localize('common.cancel', lang),
            destructive: true,
            onConfirm: () => this._deleteGroup(groupId),
        });
    }

    private async _deleteGroup(groupId: string) {
        try {
            await deleteGroup(this.hass!, groupId);
        } catch (e) {
            console.error("Failed to delete group:", e);
            showToast(this, localize('panel.cards.groups.alerts.delete_error', this.hass!.language));
        }
    }

    render() {
        if (!this.hass) return html``;
        const lang = this.hass.language;

        return html`
            <div class="group-management-row">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${{ text: {} }}
                    .value=${this._newGroupName}
                    .label=${localize('panel.cards.groups.fields.new_group.heading', lang)}
                    .required=${false}
                    @value-changed=${(e: CustomEvent) => (this._newGroupName = e.detail.value ?? "")}
                    @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._handleCreate()}
                ></ha-selector>
                <ha-button size="small" @click=${this._handleCreate}>
                    ${localize('panel.cards.groups.actions.create', lang)}
                </ha-button>
            </div>

            <div class="group-list">
                ${this.groups.length === 0
                ? html`<span class="secondary">${localize('panel.cards.groups.empty', lang)}</span>`
                : this.groups.map((groupId) => this._renamingGroup === groupId
                    ? html`
                        <div class="group-list-row">
                            <ha-selector
                                .hass=${this.hass}
                                .selector=${{ text: {} }}
                                .value=${this._renameValue}
                                .required=${false}
                                @value-changed=${(e: CustomEvent) => (this._renameValue = e.detail.value ?? "")}
                                @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._handleRename()}
                            ></ha-selector>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${mdiCheck}
                                    .label=${localize('panel.cards.groups.actions.save', lang)}
                                    @click=${this._handleRename}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${mdiClose}
                                    .label=${localize('panel.cards.groups.actions.cancel', lang)}
                                    @click=${() => (this._renamingGroup = null)}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `
                    : html`
                        <div class="group-list-row">
                            <span>${groupId}</span>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${mdiPencil}
                                    .label=${localize('panel.cards.groups.actions.rename', lang)}
                                    @click=${() => this._startRename(groupId)}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${mdiDelete}
                                    .label=${localize('panel.cards.groups.actions.delete', lang)}
                                    @click=${() => this._handleDelete(groupId)}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `)}
            </div>

            <hm-confirm-dialog></hm-confirm-dialog>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-group-manager')) customElements.define('hm-group-manager', HMGroupManager)
