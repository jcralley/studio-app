import { StudioAppProxy } from '../StudioAppProxy';
import { StudioDocument } from './studio-document';
import { StudioDocumentType } from './StudioDocumentType';
import './simulink/simulink-block-diagram';
import { getFileExtension } from '../utils/path';

export class StudioDocumentFactory {
  studioApp: StudioAppProxy;
  documentTypes: StudioDocumentType[];
  extensionMap: Map<string, StudioDocumentType>;

  addDocumentType(type: StudioDocumentType) {
    const existingType = this.documentTypes.find((docType) => docType.name === type.name);
    if (!existingType) {
      this.documentTypes = [...this.documentTypes, type];
      // add the extension mappings
      type.extensions.forEach((ext) => this._mapExtension(ext, type));
    }
  }

  _mapExtension(ext: string, type: StudioDocumentType) {
    // if the extension does not already have a mapping, add one
    if (!this.extensionMap.has(ext)) {
      this.extensionMap.set(ext, type);
    }
  }

  createDocument(documentPath: string): StudioDocument | undefined {
    // 1. extract extension from documentPath
    // 2. lookup extension in typeMap
    // 3. create instance of document of correct type
    console.log(`Creating Document: ${documentPath}`);
    const extension = getFileExtension(documentPath);
    if (extension) {
      const type = this.extensionMap.get(extension);
      if (type) {
        const doc = document.createElement(type.component) as StudioDocument;
        doc.name = documentPath;
        return doc;
      }
    }
    return undefined;
  }

  constructor(studioApp: StudioAppProxy) {
    this.studioApp = studioApp;
    this.documentTypes = [];
    this.extensionMap = new Map();
  }
}
