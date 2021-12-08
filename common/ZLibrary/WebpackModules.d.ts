/* ZeresPluginLibrary.WebpackModules */
export class WebpackModules {
  static require: Function;

  static find(filter: (module: Module) => boolean, first?: boolean): Module | Module[];
  static findAll(filter: (module: Module) => boolean): Module[];
  static findByUniqueProperties(props: any, first?: boolean): Module | Module[];
  static findByDisplayName(name: string): Module;

  static getModule(filter: (module: any) => boolean, first?: boolean): Module | Module[];
  static getIndex(filter: (module: any) => boolean): number | null;
  static getIndexByModule(module: any): Number | null;
  static getModules(filter: Function): Module[];
  static getModuleByName(name: string, fallback: Function): Module;
  static getByDisplayName(name: string): Module;
  static getByRegex(regex: RegExp, first?: boolean): Module | Module[];
  static getByPrototypes(...prototypes: string[]): Module;
  static getAllByPrototypes(...prototypes: string[]): Module | Module[];
  static getByProps(...props: string[]): Module;
  static getAllByProps(...props: string[]): Module | Module[];
  static getByString(...props: string[]): Module;
  static getAllByString(...strings: string[]): Module | Module[];
  static getByIndex(index: number): Module;
  static getAllModules(): any[];
}

type Module = any;

/* ZeresPluginLibrary.WebpackModules.Filters */
export class Filters {
  static byProperties(props: string[], filter: Filters_Filter): Filters_Filter;
  static byPrototypeFields(fields: string[], filter: Filters_Filter): Filters_Filter;
  static byCode(search: RegExp, filter: Filters_Filter): Filters_Filter;
  static byString(...search: string[]): Filters_Filter;
  static byDisplayName(name: string, filter: Filters_Filter): Filters_Filter;
  static combine(...filters: Filters_Filter[]): Filters_Filter;
}

type Filters_Filter = (module: any) => boolean;
