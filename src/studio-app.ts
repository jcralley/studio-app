import { LitElement, html } from 'lit';
import { provide } from '@lit/context';
import { customElement } from 'lit/decorators.js';
import { studioAppContext } from './studio-app-context';
import { StudioAppProxy } from './proxies/studio-app-proxy';

@customElement('studio-app')
export class StudioApp extends LitElement {
  @provide({ context: studioAppContext })
  proxy: StudioAppProxy = new StudioAppProxy();

  render() {
    return html`
      <slot></slot>
    `;
  }
}
