import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StudioDocument, StudioDocumentProxy } from '../studio-document';
import type { MaybeStudioDocumentProxy } from '../studio-document';

export const SimulinkDocumentType = {
  name: 'SimulinkModel',
  component: 'simulink-block-diagram',
  extensions: ['slx', 'mdl']
};

export class SimulinkBlockDiagramProxy extends StudioDocumentProxy { }

@customElement('simulink-block-diagram')
export class SimulinkBlockDiagram extends StudioDocument {
  _createProxy(): MaybeStudioDocumentProxy {
    return new SimulinkBlockDiagramProxy(this);
  }

  render() {
    return html`
            <div>
                <h1>Simulink Block Diagram: ${this.name}</h1>
                <button @click=${this.close}>Close</button>
            </div>
        `;
  }
}
