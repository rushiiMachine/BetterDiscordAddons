/* ZeresPluginLibrary.Utilities */
export class Utilities {
  static stableSort(list: any[], comparator: Function): void;
  static memorizeObject(object: object): any; // TODO: Proxy
  static supressErrors(method: Function, description: string): Function;
  static isNil(anything: any): boolean;
  static formatToString(string: string, values: object): string;
  static formatString(string: string, values: object): string;
  static findInReactTree(tree: object, searchFilter: Function): any;
  static findInTree(tree: object, searchFilter: Function, options?: { walkable?: string[] | null; ignore?: string[] }): any;
  static getNestedProp(obj: object, path: string): any[]; //TODO
  static className(...argument: any[]): string;
  static extend(extendee: object, ...extenders: object[]): object;
  static deepclone(value: any): any;
  static deepfreeze<T extends any>(object: T, exclude: Function): T;
  static removeFromArray(array: any[], item: any): any[];
  static debounce(executor: Function, delay: number): (...args: any[]) => void;
  static readFile(path: string): Promise<string>;
  static fileExists(path: string): Promise<string>;
}
