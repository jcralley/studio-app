import { StudioComponent } from '../components/studio-component';
import { customElement } from 'lit/decorators.js';

@customElement('studio-document')
export abstract class StudioDocument extends StudioComponent {
  name: string = '';

  constructor(name: string) {
    super();
    this.name = name;
  }

  close() {
    this.studioApp?.closeDocument(this);
  }
}
