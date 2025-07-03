import { makeAutoObservable } from 'mobx';
import { IStudioApp } from './studio-app';
import { StudioDocument } from './documents/studio-document';

export class StudioAppProxy {
  studioApp: IStudioApp;
  owner: string;

  openDocument(documentPath: string) {
    this.studioApp?.openDocument(documentPath);
  }

  closeDocument(document: StudioDocument) {
    this.studioApp?.closeDocument(document);
  }

  changeOwner(name: string) {
    this.owner = name;
  }

  get counterTitle() {
    return `${this.owner} Counter Title`;
  }

  constructor(studioApp: IStudioApp) {
    this.studioApp = studioApp;
    this.owner = 'Default';
    makeAutoObservable(this);
  }
}
