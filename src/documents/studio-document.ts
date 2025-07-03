import { StudioComponent, StudioComponentProxy } from '../components/studio-component';
import type { MaybeStudioComponentProxy, IStudioComponent } from '../components/studio-component';
import { customElement, property } from 'lit/decorators.js';

export interface StudioDocumentType {
  name: string;
  component: string;
  extensions: string[];
}

export interface IStudioDocument extends IStudioComponent {
  name: string;
}

export class StudioDocumentProxy extends StudioComponentProxy {
  _document: IStudioDocument;

  get id() {
    return this._document.id;
  }

  get name() {
    return this._document.name;
  }

  get document() {
    return this._document;
  }

  constructor(document: IStudioDocument) {
    super(document as IStudioComponent);
    this._document = document;
  }
}

export type MaybeStudioDocumentProxy = StudioDocumentProxy | undefined;

@customElement('studio-document')
export abstract class StudioDocument extends StudioComponent {
  @property({ type: String })
  name: string;

  constructor() {
    super();
    this.name = '=default=';
    this.proxy = this._createProxy() as MaybeStudioComponentProxy;
  }

  close() {
    this.studioApp?.closeDocument(this);
  }

  abstract _createProxy(): MaybeStudioDocumentProxy;
}

export type MaybeStudioDocument = StudioDocument | undefined;
