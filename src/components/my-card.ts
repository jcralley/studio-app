import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: Boolean })
  elevated = false;

  static styles = css`
    :host {
      display: block;
      margin: 16px 0;
    }

    .card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .card.elevated {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid #e2e8f0;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .subtitle {
      font-size: 1rem;
      color: #718096;
      margin: 4px 0 0;
    }

    .content {
      padding: 20px 24px;
      color: #4a5568;
      line-height: 1.6;
    }

    .content ::slotted(*) {
      margin: 0 0 16px;
    }

    .content ::slotted(*:last-child) {
      margin-bottom: 0;
    }
  `;

  render() {
    return html`
      <div class="card ${this.elevated ? 'elevated' : ''}">
        ${this.title || this.subtitle ? html`
          <div class="header">
            ${this.title ? html`<h3 class="title">${this.title}</h3>` : ''}
            ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}
          </div>
        ` : ''}
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
