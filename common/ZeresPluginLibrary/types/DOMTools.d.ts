import { _ } from './index';

/* ZeresPluginLibrary.DOMTools */
export class DOMTools {
  static Selector: Selector;
  static ClassName: ClassName;
  static DOMObserver: DOMObserver;

  static get observer(): DOMObserver;
  static Q(selector: string): DocumentFragment | NodeList | HTMLElement;
  static query(selector: string, baseElement?: Element): Element | null;
  static queryAll(selector: string, baseElement?: Element): Element[];
  static parseHTML(html: string, fragment?: boolean): DocumentFragment | NodeList | HTMLElement;
  static createElement(html: string, fragment?: boolean): DocumentFragment | NodeList | HTMLElement;
  static escapeHTML(html: string): HTMLElement;
  static escapeID(id: string): string;
  static addClass(element: Element, ...classes: string[]): Element;
  static removeClass(element: Element, ...classes: string[]): Element;
  static toggleClass(element: Element, classname: string, indicator?: boolean): Element;
  static hasClass(element: Element, classname: string): boolean;
  static replaceClass(element: Element, oldName: string, newName: string): Element;
  static appendTo<T extends Node>(thisNode: T, thatNode: Node): T;
  static prependTo<T extends Node>(thisNode: T, thatNode: Node): T;
  static insertAfter<T extends Node>(thisNode: T, targetNode: Node): T;
  static after<T extends Node>(thisNode: T, newNode: Node): T;
  static next(element: Element, selector?: string): Element;
  static nextAll(element: Element): NodeList;
  static nextUntil(element: Element, selector: string): Element[];
  static previous(element: Element, selector: string): Element;
  static previousAll(element: Element, selector: string): Element[];
  static previousUntil(element: Element, selector: string): Element[];
  static indexInParent(node: Node): Number;
  static index(node: Node): Number;
  static parent(element: Element, selector: string): Element | null;
  static findChild(element: Element, selector: string): Element[];
  static findChildren(element: Element, selector: string): Element[];
  static parents(element: Element, selector?: string): Element[];
  static parentsUntil(element: Element, selector: string): Element[];
  static siblings(element: Element, selector?: string): Element[];
  static css(element: Element, attribute: string, value?: string): Element | string;
  static width(element: Element, value?: string): Element | string;
  static height(element: Element, value?: string): Element | string;
  static text(element: Element, text?: string): string;
  static innerWidth(element: Element): number;
  static innerHeight(element: Element): number;
  static outerWidth(element: Element): number;
  static outerHeight(element: Element): number;
  static offset(element: Element): DOMRect;
  static on(element: Element, event: string, delegate: string | Function, callback: Function): CancelListener;
  static once(element: Element, event: string, delegate: string | Function, callback?: Function): CancelListener;
  static off(element: Element | string, event?: string, delegate?: string | Function, callback?: Function): Element;
  static onMountChange<T extends HTMLElement>(node: T, callback: Function, onMount: boolean): T;
  static onMount<T extends HTMLElement>(node: T, callback: Function): T;
  static onUnmount<T extends HTMLElement>(node: T, callback: Function): T;
  static onAdded<T extends HTMLElement>(node: T, callback: Function): T;
  static onRemoved<T extends HTMLElement>(node: T, callback: Function): T;
  static wrap(elements: HTMLElement[]): DocumentFragment | NodeList | HTMLElement;
  static resolveElement(node: Element | _.jQuery): Element;
}

/* ZeresPluginLibrary.DOMTools.Selector */
export class Selector {
  constructor(classname: string);
  toString(): string;
  valueOf(): string;
  child(other: string | Selector): Selector;
  adjacent(other: string | Selector): Selector;
  sibling(other: string | Selector): Selector;
  descend(other: string | Selector): Selector;
  and(other: string | Selector): Selector;
}

/* ZeresPluginLibrary.DOMTools.ClassName */
export class ClassName {
  constructor(name: string);
  add(...classnames: string[]): ClassName;
  toString(): string;
  valueOf(): string;
}

/* ZeresPluginLibrary.DOMTools.Subscription */
export type Subscription = Record<string, any>;

/* ZeresPluginLibrary.DOMTools.DOMObserver */
export class DOMObserver {
  constructor();
  observe(): void;
  disconnect(): void;
  subscribe(callback: Function, filter: Function, bind: any, group: boolean): Subscription;
  unsubscribe(Subscription: Subscription): object;
  subscribeToQuerySelector(callback: Function, filter: Function, bind: any, group: boolean): Subscription;
}

/* ZeresPluginLibrary.DOMTools.DOMObserver.CancelListener */
export type CancelListener = () => void;
