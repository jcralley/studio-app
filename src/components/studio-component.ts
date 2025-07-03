import { MobxLitElement } from '@adobe/lit-mobx';
import { TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { studioAppContext } from '../studio-app-context';
import { StudioAppProxy } from '../StudioAppProxy';
import type { MaybeStudioAppProxy } from '../StudioAppProxy';

export interface IStudioComponent {
  studioApp: StudioAppProxy | undefined;
  id: string;
}

export class StudioComponentProxy {
  _component: IStudioComponent;

  constructor(component: IStudioComponent) {
    this._component = component;
  }
}

export type MaybeStudioComponentProxy = StudioComponentProxy | undefined;

@customElement('studio-component')
export abstract class StudioComponent extends MobxLitElement {
  @consume({ context: studioAppContext })
  studioApp: MaybeStudioAppProxy;

  @state()
  proxy: MaybeStudioComponentProxy;

  @state()
  id: string;

  constructor() {
    super();
    this.id = crypto.randomUUID();
  }

  abstract render(): TemplateResult;
}
