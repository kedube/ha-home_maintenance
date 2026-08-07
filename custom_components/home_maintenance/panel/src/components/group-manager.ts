import { LitElement, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { mdiCheck, mdiClose, mdiDelete, mdiPencil } from "@mdi/js";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { createGroup, deleteGroup, renameGroup } from '../data/websockets';

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

    @query(".group-management-row ha-textfield")
    private _newGroupField?: HTMLElement & { value?: string };

    private async _handleCreate() {
        // Read the field directly as well: if another frontend resource has
        // registered a conflicting ha-textfield whose input events never
        // reach us, the tracked state stays empty even though text is shown.
        const groupId = (this._newGroupName.trim() || this._newGroupField?.value?.trim()) ?? "";
        if (!groupId) return;
        try {
            await createGroup(this.hass!, groupId);
            this._newGroupName = "";
            if (this._newGroupField) this._newGroupField.value = "";
        } catch (e) {
            console.error("Failed to create group:", e);
            alert(localize('panel.cards.groups.alerts.error', this.hass!.language));
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
        }
    }

    private async _handleDelete(groupId: string) {
        const msg = localize('panel.cards.groups.confirm_delete', this.hass!.language, '{title}', groupId);
        if (!confirm(msg)) return;
        try {
            await deleteGroup(this.hass!, groupId);
        } catch (e) {
            console.error("Failed to delete group:", e);
        }
    }

    render() {
        if (!this.hass) return html``;
        const lang = this.hass.language;

        return html`
            <div class="group-management-row">
                <ha-textfield
                    .value=${this._newGroupName}
                    .label=${localize('panel.cards.groups.fields.new_group.heading', lang)}
                    @input=${(e: InputEvent) => (this._newGroupName = (e.target as HTMLInputElement).value)}
                    @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._handleCreate()}
                ></ha-textfield>
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
                            <ha-textfield
                                .value=${this._renameValue}
                                @input=${(e: InputEvent) => (this._renameValue = (e.target as HTMLInputElement).value)}
                                @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._handleRename()}
                            ></ha-textfield>
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
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-group-manager')) customElements.define('hm-group-manager', HMGroupManager)
