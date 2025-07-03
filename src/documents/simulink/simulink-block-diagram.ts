import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StudioDocument } from '../studio-document';

export const SimulinkDocumentType = {
  name: 'SimulinkModel',
  component: 'simulink-block-diagram',
  extensions: ['slx', 'mdl'],
};

@customElement('simulink-block-diagram')
export class SimulinkBlockDiagram extends StudioDocument {
  render() {
    return html`
            <div>
                <h1>Simulink Block Diagram: ${this.name}</h1>
                <button @click=${this.close}>Close</button>
            </div>
        `;
  }
}
