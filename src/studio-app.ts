import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('studio-app')
export class StudioApp extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }
}
