import { _ } from './index';

/* ZeresPluginLibrary.ContextMenu */
export type ContextMenu = {
  Menu: typeof Menu;
  ItemGroup: typeof ItemGroup;
  MenuItem: typeof MenuItem;
  TextItem: typeof TextItem;
  ImageItem: typeof ImageItem;
  SubMenuItem: typeof SubMenuItem;
  ToggleItem: typeof ToggleItem;

  updateDiscorMenu(menu: HTMLElement | _.jQuery): void;
};

/* ZeresPluginLibrary.ContextMenu.Menu */
export class Menu {
  constructor(scroll?: boolean);

  addGroup(contextGroup: ItemGroup): this;
  addItems(contextGroup: ItemGroup): this;
  addItems(...contextItems: MenuItem[]): this;
  show(x: number, y: number): void;
  removeMenu(): void;
  attachTo(menuItem: HTMLElement | _.jQuery): void;
}

/* ZeresPluginLibrary.ContextMenu.ItemGroup */
export class ItemGroup {
  addItems(...contextItems: MenuItem[]): this;
  getElement(): HTMLElement;
}

/* ZeresPluginLibrary.ContextMenu.MenuItem */
export class MenuItem {
  constructor(label: string, options?: { danger?: boolean; callback?: (event: MouseEvent) => any });
}

/* ZeresPluginLibrary.ContextMenu.TextItem */
export class TextItem extends MenuItem {
  constructor(
    label: string,
    options?: {
      hint?: string;
      danger?: boolean;
      callback?: (event: MouseEvent) => any;
    }
  );
}

/* ZeresPluginLibrary.ContextMenu.ImageItem */
export class ImageItem extends MenuItem {
  constructor(
    label: string,
    imageSrc: string,
    options?: {
      hint?: string;
      danger?: boolean;
      callback?: (event: MouseEvent) => any;
    }
  );
}

/* ZeresPluginLibrary.ContextMenu.SubMenuItem */
export class SubMenuItem extends MenuItem {
  constructor(
    label: string,
    subMenu: Menu,
    options?: {
      hint?: string;
      danger?: boolean;
      callback?: (event: MouseEvent) => any;
    }
  );
}

/* ZeresPluginLibrary.ContextMenu.ToggleItem */
export class ToggleItem extends MenuItem {
  constructor(
    label: string,
    checked: boolean,
    options?: {
      hint?: string;
      danger?: boolean;
      callback?: (isChecked: boolean) => any;
    }
  );
}
