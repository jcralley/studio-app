import { makeAutoObservable } from 'mobx';

export class StudioAppProxy {
  owner: string;

  changeOwner(name: string) {
    this.owner = name;
  }

  get counterTitle() {
    return `${this.owner} Counter Title`;
  }

  constructor() {
    this.owner = 'Default';
    makeAutoObservable(this);
  }
} 
