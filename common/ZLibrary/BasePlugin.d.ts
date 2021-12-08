import { SettingPanel, SettingField } from './Settings';

type JSONValue = string | number | boolean | null;

type BaseSetting = {
  id: string;
  name: string;
  note: string;
};

export type PluginSetting =
  | ({
      type: 'category';
      collapsible: boolean;
      shown: boolean;
      settings: PluginSetting[];
    } & Omit<BaseSetting, 'note'>)
  | ({
      type: 'color' | 'file';
      value: string;
    } & BaseSetting)
  | ({ type: 'switch'; value: boolean } & BaseSetting)
  | ({
      type: 'textbox';
      value: JSONValue;
      placeholder: JSONValue;
    } & BaseSetting)
  | ({
      type: 'keybind';
      value: number[];
    } & BaseSetting)
  | ({
      type: 'slider';
      value: number;
      min: number;
      max: number;
      markers?: number[];
      stickToMarkers?: boolean;
    } & BaseSetting)
  | ({
      type: 'radio';
      value: JSONValue;
      options: { name: string; value: JSONValue; desc: string; color: string }[];
    } & BaseSetting)
  | ({
      type: 'dropdown';
      value: JSONValue;
      options: {
        label: string;
        value: JSONValue;
      }[];
    } & BaseSetting);

export type PluginConfig = {
  info: {
    name: string;
    description: string;
    version: string;
    mainAuthor?: {
      name: string;
      link?: string;
    };
    authors: {
      name: string;
      discord_id?: string;
      github_username?: string;
      twitter_username?: string;
    }[];
    website?: string;
    source?: string;
    invite?: string;
    donate?: string;
    patreon?: string;
  };
  changelog?: {
    title: string;
    type?: string;
    items: string[];
  }[];
  defaultConfig?: PluginSetting[];
  
  strings?: unknown; // find out what this is
};

export abstract class BasePlugin {
  constructor();

  _enabled: boolean;
  defaultSettings: PluginSetting[];
  _hasConfig: boolean;
  _config: PluginConfig;

  settings: Record<string, JSONValue>;

  getName(): string;
  getDescription(): string;
  getVersion(): string;
  getAuthor(): string;
  get strings(): unknown; //TODO
  set strings(strings: unknown); //TODO
  get isEnabled(): boolean;

  load(): void;
  start(): Promise<void>;
  stop(): void;

  showSettingsModal(): void;
  showChangelog(footer: any): void; //TODO
  saveSettings(settings: any): void; //TODO
  loadSettings(defaultSettings: any): void;
  buildSetting(data: { name: string; note: string; type: string; value: any; onChange: () => void, id: string }): SettingField;
  buildSettingsPanel(): SettingPanel;
}
