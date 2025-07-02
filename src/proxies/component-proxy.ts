import { makeObservable, observable } from 'mobx';

export class ComponentProxy {
  title: string;

  constructor() {
    this.title = '';
    makeObservable(this, {
      title: observable
    });
  }
}
