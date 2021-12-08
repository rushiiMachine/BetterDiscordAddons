import { _ } from './index';
import { Component as ReactComponent } from 'react';

/* ZeresPluginLibrary.Settings */
export type Settings = {
  SettingGroup: typeof SettingGroup;
  SettingPanel: typeof SettingPanel;
  SettingField: typeof SettingField;
  Keybind: typeof Keybind;
  FilePicker: typeof FilePicker;
  Switch: typeof Switch;
  Textbox: typeof Textbox;
  ColorPicker: typeof ColorPicker;
  Dropdown: typeof Dropdown;
  RadioGroup: typeof RadioGroup;
  Slider: typeof Slider;
};

/* ZeresPluginLibrary.Settings.SettingGroup */
export class SettingGroup extends _.Listenable {
  constructor(groupName: string, options?: { callback?: Function; collapsible?: boolean; shown?: boolean });

  getElement(): HTMLElement;
  append(...nodes: HTMLElement[] | _.jQuery[] | SettingField[] | SettingGroup[]): this;
  appendTo(node: HTMLElement): this;
  onChange(): void;
}

/* ZeresPluginLibrary.Settings.SettingPanel */
export class SettingPanel extends _.Listenable {
  constructor(onChange: Function, ...nodes: HTMLElement[] | _.jQuery[] | SettingField[] | SettingGroup[]);

  static build(onChange: Function, ...nodes: HTMLElement[] | _.jQuery[] | SettingField[] | SettingGroup[]): HTMLElement;

  getElement(): HTMLElement;
  append(...nodes: HTMLElement[] | _.jQuery[] | SettingField[] | SettingGroup[]): this;
  onChange(): void;
}

/* ZeresPluginLibrary.Settings.SettingField */
export class SettingField extends _.Listenable {
  constructor(name: string, note: string, onChange: Function, settingType: ReactComponent | HTMLElement, props?: { noteOnTop?: boolean });

  getElement(): HTMLElement;
  onChange(): void;
  onAdded(): void;
  onRemoved(): void;
}

/* ZeresPluginLibrary.Settings.Keybind */
export class Keybind extends SettingField {
  constructor(name: string, note: string, value: number[], onChange: Function, options?: { disabled?: boolean });
}

/* ZeresPluginLibrary.Settings.FilePicker */
export class FilePicker extends SettingField {
  constructor(
    name: string,
    note: string,
    onChange: Function,
    options?: {
      disabled?: boolean;
      accept?: string | string[];
      multiple?: boolean;
    }
  );
}

/* ZeresPluginLibrary.Settings.Switch */
export class Switch extends SettingField {
  constructor(name: string, note: string, isChecked: boolean, onChange: Function, options?: { disabled?: boolean });
}

/* ZeresPluginLibrary.Settings.Textbox */
export class Textbox extends SettingField {
  constructor(name: string, note: string, value: string, onChange: Function, options?: { placeholder?: string; disabled?: boolean });
}

/* ZeresPluginLibrary.Settings.ColorPicker */
export class ColorPicker extends SettingField {
  constructor(name: string, note: string, value: string, onChange: Function, options?: { disabled?: boolean; colors?: number[] });

  static get presetColors(): number[];
}

/* ZeresPluginLibrary.Settings.Dropdown */
export class Dropdown extends SettingField {
  constructor(
    name: string,
    note: string,
    defaultValue: any,
    values: DropdownItem[],
    onChange: Function,
    options?: {
      clearable?: boolean;
      searchable?: boolean;
      disabled?: boolean;
    }
  );
}

type DropdownItem = {
  label: string;
  value: any;
};

/* ZeresPluginLibrary.Settings.RadioGroup */
export class RadioGroup extends SettingField {
  constructor(
    name: string,
    note: string,
    defaultValue: any,
    values: RadioItem[],
    onChange: Function,
    options?: {
      disabled: boolean;
    }
  );
}

type RadioItem = {
  name: string;
  value: any;
  desc: string;
  color: string;
};

/* ZeresPluginLibrary.Settings.Slider */
export class Slider extends SettingField {
  constructor(
    name: string,
    note: string,
    min: number,
    max: number,
    value: number,
    onChange: Function,
    options?: {
      disabled?: boolean;
      fillStyles?: object;
      markers?: number[];
      stickToMarkers?: boolean;
      equidistant?: boolean;
      onValueRender?: SliderRenderValue;
      renderValue?: SliderRenderValue;
      units?: string;
    }
  );
}

type SliderRenderValue = (value: number) => string;
