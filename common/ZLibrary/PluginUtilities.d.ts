/* ZeresPluginLibrary.PluginUtilities */
export class PluginUtilities {
  static loadData(name: string, key: string, defaultData: object): object;
  static saveData(name: string, key: string, data: object): object;
  static loadSettings(name: string, defaultData: object): object;
  static saveSettings(name: string, data: object): object;
  static getBDFolder(): string;
  static getPluginsFolder(): string;
  static getThemesFolder(): string;
  static addOnSwitchListener(callback: Function): void;
  static removeOnSwitchListener(callback: Function): void;
  static addStyle(id: string, css: string): void;
  static removeStyle(id: string): void;
  static addScript(id: string, url: string): Promise<void>;
  static removeScript(id: string): void;
}
