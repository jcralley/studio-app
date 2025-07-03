import { LitElement, html } from 'lit';
import { provide } from '@lit/context';
import { customElement, state } from 'lit/decorators.js';
import { studioAppContext } from './studio-app-context';
import { StudioAppProxy } from './StudioAppProxy';
import { StudioAppStart } from './documents/studio-app-start';
import { StudioDocumentFactory } from './documents/StudioDocumentFactory';
import { StudioDocument, StudioDocumentProxy } from './documents/studio-document';
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
    this.currentDocument = this.startPage;

    this.appendChild(this.startPage);
  }

  openDocument(documentPath: string) {
    console.log(`Opening Document: ${documentPath}`);
    const lastDocument = this.currentDocument;

    // look at open documents and see if we already have this name
    const existing = this.proxy.openDocuments.find((doc) => doc.name === documentPath);
    if (!existing) {
      this.currentDocument = this.documentFactory.createDocument(documentPath);
      if (this.currentDocument) {
        if (this.currentDocument?.proxy) {
          this.proxy.addOpenDocument(this.currentDocument.proxy as StudioDocumentProxy);
        }
        if (lastDocument) {
          this.removeChild(lastDocument);
        }
        this.appendChild(this.currentDocument);
        console.log(`Document Created: ${this.currentDocument?.name}`);
      } else {
        console.log(`Failed to Create Document!`);
      }
    } else {
      console.log(`Document ${existing.name} already open!`);
    }
  }

  closeDocument(document: StudioDocument) {
    console.log(`Closing Document: ${document.name}`);
    this.proxy.removeOpenDocument(document.proxy as StudioDocumentProxy);
    let nextDocument: StudioDocument = this.startPage;
    if (this.proxy.openDocuments.length > 0) {
      nextDocument = this.proxy.openDocuments[0].document as StudioDocument;
    }
    if (this.currentDocument === document) {
      this.removeChild(this.currentDocument);
      this.currentDocument = nextDocument;
      this.appendChild(nextDocument);
    }
  }

  render() {
    return html`
            <slot></slot>
        `;
  }
}
