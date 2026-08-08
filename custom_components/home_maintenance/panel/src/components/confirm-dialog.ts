import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

import { commonStyle } from '../styles';
import { dialogFooter } from '../util';

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

        return html`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${dialogFooter(this._renderButtons())}
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
