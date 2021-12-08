/* ZeresPluginLibrary.Patcher */
export class Patcher {
  static unpatchAll(patches: any[] | string): void;
  static resolveModule(module: Function | object | string | any[]): any;
  static makeOverride(patch: Patch): Function;
  static rePatch(patch: Patch): void;
  static makePatch(module: any, functionName: string, name: string): Patch;

  // Only present in the global instance
  static getPatchesByCaller(name: string): any[];
  static before(caller: string, moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static after(caller: string, moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static instead(caller: string, moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static pushChildPatch(caller: string, moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { type?: string; displayName?: string; forcePatch?: boolean }): UnpatchCallback;

  static getPatchesByCaller(): any[];
  static before(moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static after(moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static instead(moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { displayName?: string; forcePatch?: boolean }): UnpatchCallback;
  static pushChildPatch(moduleToPatch: object, functionName: string, callback: PatchCallback, options?: { type?: string; displayName?: string; forcePatch?: boolean }): UnpatchCallback;
}

export type Patch = {
  name: string;
  module: any;
  functionName: string;
  originalFunction: Function;
  proxyFunction: Function;
  counter: number;
  children: {
    caller: string;
    type: 'before' | 'after' | 'instead';
    id: number;
    callback: Function;
    unpatch: UnpatchCallback;
  }[];
};

/* ZeresPluginLibrary.Patcher.Unpatch */
export type UnpatchCallback = () => void;

/* ZeresPluginLibrary.PatchCallback */
export type PatchCallback = (thisObject: object, arguments: any[], extraValue?: Function | any) => any;
