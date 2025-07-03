import { makeAutoObservable } from 'mobx';
import { IStudioApp } from './studio-app';
import { StudioDocument, StudioDocumentProxy } from './documents/studio-document';

export class StudioAppProxy {
  studioApp: IStudioApp;
  openDocuments: StudioDocumentProxy[];
  owner: string;

  openDocument(documentPath: string) {
    this.studioApp?.openDocument(documentPath);
  }

  closeDocument(document: StudioDocument) {
    this.studioApp?.closeDocument(document);
  }

  addOpenDocument(document: StudioDocumentProxy) {
    const existing = this.openDocuments.find((doc) => doc.id === document.id);
    if (!existing) {
      this.openDocuments = [...this.openDocuments, document];
    }
  }

  removeOpenDocument(docOrId: string | StudioDocumentProxy) {
    if (typeof docOrId === 'string') {
      this.openDocuments = this.openDocuments.filter((doc) => doc.id === docOrId);
    } else if (docOrId instanceof StudioDocumentProxy) {
      this.openDocuments = this.openDocuments.filter((doc) => doc === docOrId);
    }
  }

  changeOwner(name: string) {
    this.owner = name;
  }

  get counterTitle() {
    return `${this.owner} Counter Title`;
  }

  constructor(studioApp: IStudioApp) {
    this.studioApp = studioApp;
    this.openDocuments = [];
    this.owner = 'Default';
    makeAutoObservable(this);
  }
}

export type MaybeStudioAppProxy = StudioAppProxy | undefined;
