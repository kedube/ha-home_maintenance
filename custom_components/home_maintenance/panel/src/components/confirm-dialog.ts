import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

import { commonStyle } from '../styles';

export interface ConfirmOptions {
    heading: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    /** Style the confirm button as a destructive action. */
    destructive?: boolean;
    onConfirm: () => void;
}

/**
 * Generic confirmation dialog replacing the browser-native confirm(),
 * which looks foreign in Home Assistant and can be silently suppressed by
 * the companion apps. Call open({...}) with pre-localized strings.
 */
class HMConfirmDialog extends LitElement {
    @state() private _opts: ConfirmOptions | null = null;

    public open(opts: ConfirmOptions) {
        this._opts = opts;
    }

    private _close() {
        this._opts = null;
    }

    private _handleConfirm() {
        const onConfirm = this._opts?.onConfirm;
        this._close();
        onConfirm?.();
    }

    private _renderButtons() {
        return html`
            <ha-button
                data-dialog="close"
                appearance="plain"
                slot="secondaryAction"
                @click=${this._close}
            >
                ${this._opts!.cancelLabel}
            </ha-button>
            <ha-button
                slot="primaryAction"
                class="${this._opts!.destructive ? "warning" : ""}"
                @click=${this._handleConfirm}
            >
                ${this._opts!.confirmLabel}
            </ha-button>
        `;
    }

    render() {
        if (!this._opts) return html``;

        // Newer HA dialogs slot buttons through ha-dialog-footer; older ones
        // slot action buttons directly. Support both.
        const hasFooter = Boolean(customElements.get("ha-dialog-footer"));

        return html`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${hasFooter
                    ? html`<ha-dialog-footer slot="footer">${this._renderButtons()}</ha-dialog-footer>`
                    : this._renderButtons()}
            </ha-dialog>
        `;
    }

    static styles = commonStyle;
}

if (!customElements.get('hm-confirm-dialog')) customElements.define('hm-confirm-dialog', HMConfirmDialog)

declare global {
    interface HTMLElementTagNameMap {
        'hm-confirm-dialog': HMConfirmDialog;
    }
}

export type { HMConfirmDialog };
