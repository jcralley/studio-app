import { LitElement, html } from 'lit';
import { provide } from '@lit/context';
import { customElement, state } from 'lit/decorators.js';
import { studioAppContext } from './studio-app-context';
import { StudioAppProxy } from './StudioAppProxy';
import { StudioAppStart } from './documents/studio-app-start';
import { StudioDocumentFactory } from './documents/StudioDocumentFactory';
import { StudioDocument } from './documents/studio-document';
import { SimulinkDocumentType } from './documents/simulink/simulink-block-diagram';

export interface IStudioApp {
  openDocument(documentPath: string): void;
  closeDocument(document: StudioDocument): void;
}

@customElement('studio-app')
export class StudioApp extends LitElement implements IStudioApp {
  @provide({ context: studioAppContext })
  proxy: StudioAppProxy;

  @state()
  documentFactory: StudioDocumentFactory;

  @state()
  currentDocument: StudioDocument | undefined;

  startPage: StudioAppStart;

  constructor() {
    super();
    this.proxy = new StudioAppProxy(this);
    this.documentFactory = new StudioDocumentFactory(this.proxy);
    this.documentFactory.addDocumentType(SimulinkDocumentType);
    this.startPage = new StudioAppStart();
    this.appendChild(this.startPage);
  }

  openDocument(documentPath: string) {
    console.log(`Opening Document: ${documentPath}`);
    this.currentDocument = this.documentFactory.createDocument(documentPath);
    if (this.currentDocument) {
      this.removeChild(this.startPage);
      this.appendChild(this.currentDocument);
      console.log(`Document created! ${this.currentDocument?.name}`);
    } else {
      console.log(`Failed to create Document!`);
    }
  }

  closeDocument(document: StudioDocument) {
    console.log(`Closing Document: ${document.name}`);
    if (this.currentDocument === document) {
      this.removeChild(this.currentDocument);
      this.currentDocument = undefined;
      this.appendChild(this.startPage);
    }
  }

  render() {
    return html`
            <slot></slot>
        `;
  }
}
