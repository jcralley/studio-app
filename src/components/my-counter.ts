import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number })
  count = 0;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 2px solid #4299e1;
      border-radius: 8px;
      background: white;
      text-align: center;
      font-family: sans-serif;
    }

    .count-display {
      font-size: 2rem;
      font-weight: bold;
      color: #2d3748;
      margin: 16px 0;
    }

    .buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .increment {
      background: #48bb78;
      color: white;
    }

    .increment:hover {
      background: #38a169;
      transform: translateY(-1px);
    }

    .decrement {
      background: #f56565;
      color: white;
    }

    .decrement:hover {
      background: #e53e3e;
      transform: translateY(-1px);
    }

    .reset {
      background: #9f7aea;
      color: white;
    }

    .reset:hover {
      background: #805ad5;
      transform: translateY(-1px);
    }
  `;

  private _increment() {
    this.count++;
    this._dispatchCountChange();
  }

  private _decrement() {
    this.count--;
    this._dispatchCountChange();
  }

  private _reset() {
    this.count = 0;
    this._dispatchCountChange();
  }

  private _dispatchCountChange() {
    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: { count: this.count },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="count-display">Count: ${this.count}</div>
      <div class="buttons">
        <button class="decrement" @click=${this._decrement}>-</button>
        <button class="reset" @click=${this._reset}>Reset</button>
        <button class="increment" @click=${this._increment}>+</button>
      </div>
    `;
  }
}
