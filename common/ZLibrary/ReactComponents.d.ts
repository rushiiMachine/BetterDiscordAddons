import { Component as ReactComponent } from 'react';

/* ZeresPluginLibrary.ReactComponents */
export class ReactComponents {
  static getComponentByName(name: string, selector: object): Promise<ReactComponent>;
  static getComponent(name: string, selector: object, filter: Function): Promise<ReactComponent>;
}
