import { _ } from './index';
import { Selector } from './DOMTools';

/* ZeresPluginLibrary.ReactTools */
export class ReactTools {
  static Reflect(node: HTMLElement | _.jQuery | Selector): _.ReflectionInstance;
  static getReactInstance(node: HTMLElement | _.jQuery): object;
  static getReactProperty(node: HTMLElement | _.jQuery, path: string): any | undefined;
  static getOwnerInstance(
    node: HTMLElement | _.jQuery,
    options?: {
      include?: any[];
      exclude?: any[];
      filter?: (o: object) => boolean;
    }
  ): any | null;
  static createWrappedElement(element: HTMLElement | HTMLElement[]): object;
  static wrapElement(element: HTMLElement | HTMLElement[]): object;
}
