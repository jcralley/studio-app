import { html, css } from 'lit';
import { StudioDocument } from './studio-document';
import { customElement, property } from 'lit/decorators.js';

@customElement('studio-app-start')
export class StudioAppStart extends StudioDocument {
  static styles = css`
        :host {
            display: flex;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            align-items: center;
            justify-content: center;
            background-color: #2c2e5c;
        }
    `;

  constructor() {
    super('StartPage');
  }

  @property({ type: String, attribute: false })
  documentPath: string = '';

  openDocument() {
    this.studioApp?.openDocument(this.documentPath);
    this.documentPath = '';
  }

  _updateDocumentPath(e: Event) {
    const input = e.target as HTMLInputElement;
    this.documentPath = input.value;
  }

  _handleKeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.openDocument();
    }
  }

  render() {
    return html`
            <div>
                <input
                    type="text"
                    placeholder="Enter Document Name..."
                    .value=${this.documentPath}
                    @input=${this._updateDocumentPath}
                    @keypress=${this._handleKeypress}
                />
                <button ?disabled=${!this.documentPath.trim()} @click=${this.openDocument}>
                    Open
                </button>
            </div>
        `;
  }
}
