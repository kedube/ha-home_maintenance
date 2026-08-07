import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { fireEvent } from "custom-card-helpers";

import { localize } from '../../localize/localize';
import { commonStyle } from '../styles';
import { completeTask } from '../data/websockets';
import { Task } from '../types';

/**
 * Confirmation shown before marking a task complete, since completing resets
 * last-performed / counters and can't be undone. Call open(task) to show it.
 */
class HMConfirmCompleteDialog extends LitElement {
    @property() hass?: HomeAssistant;

    @state() private _task: Task | null = null;

    public open(task: Task) {
        this._task = task;
    }

    private _close() {
        this._task = null;
    }

    private _intervalLabel(task: Task, lang: string): string {
        if ((task.trigger_type ?? "time") !== "time") {
            return `${task.progress_current ?? 0} / ${task.progress_target ?? 0}`;
        }
        const labelKey = task.interval_value === 1
            ? task.interval_type.slice(0, -1)
            : task.interval_type;
        return `${task.interval_value} ${localize(`intervals.${labelKey}`, lang)}`;
    }

    private async _handleConfirm() {
        const task = this._task;
        this._close();
        if (!task) return;

        const lang = this.hass!.language;
        try {
            await completeTask(this.hass!, task.id);
            fireEvent(this, "hass-notification" as any, {
                message: localize('panel.cards.current.alerts.complete_success', lang, '{title}', task.title),
            });
        } catch (e) {
            console.error("Failed to complete task:", e);
            fireEvent(this, "hass-notification" as any, {
                message: localize('panel.cards.current.alerts.complete_error', lang),
            });
        }
    }

    render() {
        if (!this.hass || !this._task) return html``;
        const lang = this.hass.language;

        return html`
            <ha-dialog
                open
                heading="${localize('panel.dialog.confirm_complete.title', lang)}"
                @closed=${this._close}
            >
                <p>
                    ${localize(
                        (this._task.trigger_type ?? "time") === "time"
                            ? 'panel.dialog.confirm_complete.message'
                            : 'panel.dialog.confirm_complete.message_progress',
                        lang,
                        '{title}', this._task.title,
                        '{interval}', this._intervalLabel(this._task, lang),
                    )}
                </p>

                <ha-dialog-footer slot="footer">
                    <ha-button data-dialog="close" appearance="plain" slot="secondaryAction">
                        ${localize('panel.dialog.confirm_complete.actions.cancel', lang)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleConfirm}>
                        ${localize('panel.dialog.confirm_complete.actions.confirm', lang)}
                    </ha-button>
                </ha-dialog-footer>
            </ha-dialog>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-confirm-complete-dialog')) customElements.define('hm-confirm-complete-dialog', HMConfirmCompleteDialog)

declare global {
    interface HTMLElementTagNameMap {
        'hm-confirm-complete-dialog': HMConfirmCompleteDialog;
    }
}

export type { HMConfirmCompleteDialog };
