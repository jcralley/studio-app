import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

@customElement('my-button')
export class MyButton extends LitElement {
  @property({ type: String })
  label = 'Button';

  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: Boolean })
  disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      margin: 4px;
      min-width: 120px;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .primary {
      background: #4299e1;
      color: white;
    }

    .primary:hover:not(:disabled) {
      background: #3182ce;
    }

    .secondary {
      background: #718096;
      color: white;
    }

    .secondary:hover:not(:disabled) {
      background: #4a5568;
    }

    .success {
      background: #48bb78;
      color: white;
    }

    .success:hover:not(:disabled) {
      background: #38a169;
    }

    .warning {
      background: #ed8936;
      color: white;
    }

    .warning:hover:not(:disabled) {
      background: #dd6b20;
    }

    .danger {
      background: #f56565;
      color: white;
    }

    .danger:hover:not(:disabled) {
      background: #e53e3e;
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('button-click', {
        detail: { label: this.label, variant: this.variant },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <button 
        class=${this.variant}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        ${this.label}
      </button>
    `;
  }
}
