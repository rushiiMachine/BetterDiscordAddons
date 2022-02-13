/**
 * Based on BDPluginLibrary v1.2.26, commit 65ff498b055cfafe38a0debff9729f38d59405cf
 */

/* Typing imports */
import { BdApiModule } from '@bandagedbd/bdapi';
import * as jQuery_ from 'jquery';
import { DOMTools, Selector } from './DOMTools';

/* Exports */
export interface ZeresPluginLibrary {
  ColorConverter: typeof import('./ColorConverter').ColorConverter;
  ContextMenu: import('./ContextMenu').ContextMenu;
  DiscordAPI: _.DiscordAPI;
  DiscordClasses: _.DiscordClasses;
  DiscordClassModules: _.DiscordClassModules;
  DiscordContextMenu: _.DiscordContextMenu;
  DiscordModules: _.DiscordModules;
  DiscordSelectors: _.DiscordSelectors;
  DCM: _.DCM;
  DOMTools: typeof DOMTools;
  Logger: typeof import('./Logger').Logger;
  Modals: typeof import('./Modals').Modals;
  Patcher: typeof import('./Patcher').Patcher;
  PluginUpdater: typeof import('./PluginUpdater').PluginUpdater;
  PluginUtilities: typeof import('./PluginUtilities').PluginUtilities;
  Popouts: typeof import('./Popouts').Popouts;
  ReactComponents: typeof import('./ReactComponents').ReactComponents;
  ReactTools: typeof import('./ReactTools').ReactTools;
  Settings: import('./Settings').Settings;
  Toasts: typeof import('./Toasts').Toasts;
  Tooltip: typeof import('./Tooltip').Tooltip;
  Utilities: typeof import('./Utilities').Utilities;
  WebpackModules: typeof import('./WebpackModules').WebpackModules;

  buildPlugin(config: PluginConfig): [BasePlugin, ZeresPluginLibrary];
}

export type PluginConfig = import('./BasePlugin').PluginConfig;
export type BasePlugin = typeof import('./BasePlugin').BasePlugin;

declare global {
  namespace NodeJS {
    interface Globals {
      ZeresPluginLibrary: ZeresPluginLibrary;
      ZLibrary: ZeresPluginLibrary;
      BdApi: typeof BdApi;
    }
  }
  var BDFDB: any; // eslint-disable-line no-var
  var ZeresPluginLibrary: ZeresPluginLibrary; // eslint-disable-line no-var
  var ZLibrary: ZeresPluginLibrary; // eslint-disable-line no-var
}

// DO NOT USE DIRECTLY
declare namespace _ {
  /* External typings */
  type jQuery = typeof jQuery_;

  /* ZeresPluginLibrary.DiscordAPI */
  type DiscordAPI = any;

  /* ZeresPluginLibrary.DiscordClasses */
  type DiscordClasses = any;

  /* ZeresPluginLibrary.DiscordClassModules */
  type DiscordClassModules = any;

  /* ZeresPluginLibrary.DiscordContextMenu */
  type DiscordContextMenu = any;

  /* ZeresPluginLibrary.DiscordModules */
  type DiscordModules = any;

  /* ZeresPluginLibrary.DiscordSelectors */
  type DiscordSelectors = any;

  type DCM = any;

  class Listenable {
    addListener(callback: Function): Function;
    removeListener(callback: Function): void;
    alertListeners(data?: any): void;
  }

  // reflection.js / ReflectionInstance
  class ReflectionInstance {
    constructor(element: HTMLElement | jQuery | Selector);

    // get el(): any; // if it is jQuery then whatever node[0] is otherwise HTMLElement | jQuery | Selector
    // TODO: finish later
  }
}
