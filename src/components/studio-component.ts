import { MobxLitElement } from '@adobe/lit-mobx';
import { TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { studioAppContext } from '../studio-app-context';
import { StudioAppProxy } from '../StudioAppProxy';

@customElement('studio-component')
export abstract class StudioComponent extends MobxLitElement {
  @consume({ context: studioAppContext })
  studioApp: StudioAppProxy | undefined;

  abstract render(): TemplateResult;
}
