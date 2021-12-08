import { _ } from './index';

/* ZeresPluginLibrary.Tooltip */
export class Tooltip {
  constructor(
    node: HTMLElement | _.jQuery,
    tip: string,
    options?: {
      style?: string;
      side?: 'top' | 'bottom' | 'left' | 'right';
      preventFlip?: boolean;
      disabled?: boolean;
    }
  );
  static create(
    node: HTMLElement | _.jQuery,
    tip: string,
    options?: {
      style?: string;
      side?: 'top' | 'bottom' | 'left' | 'right';
      preventFlip?: boolean;
      disabled?: boolean;
    }
  ): Tooltip;

  get container(): Element;
  get canShowAbove(): boolean;
  get canShowBelow(): boolean;
  get canShowLeft(): boolean;
  get canShowRight(): boolean;

  observer?: MutationObserver;

  disable(): void;
  enable(): void;
  hide(): void;
  show(): void;
  showAbove(): void;
  showBelow(): void;
  showLeft(): void;
  showRight(): void;
  centerHorizontally(): void;
  centerVertically(): void;
}
