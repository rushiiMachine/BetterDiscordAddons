/* ZeresPluginLibrary.PluginUpdater */
export class PluginUpdater {
  static checkForUpdate(pluginName: string, currentVersion: string, updateURL: string, versioner?: versioner, comparator?: comparator): void;
  static processUpdateCheck(pluginName: string, updateLink: string): Promise<void>;
  static defaultVersioner(currentVersion: string, content: string): string;
  static defaultComparator(currentVersion: string, content: string): boolean;
  static createUpdateButton(): HTMLElement;
  static downloadPlugin(pluginName: string, updateLink: string): void;
  static showUpdateNotice(pluginName: string, updateLink: string): void;
  static removeUpdateNotice(pluginName: string): void;
}

type versioner = (fileContent: string) => string;

type comparator = (currentVersion: string, remoteVersion: string) => boolean;
