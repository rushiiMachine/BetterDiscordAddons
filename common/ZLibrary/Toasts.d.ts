/* ZeresPluginLibrary.Toasts */
export class Toasts {
  static get ToastTypes(): Record<ToastTypes, string>;

  static success(content: string, options?: { icon?: string; timeout?: number }): Promise<void>;
  static info(content: string, options?: { icon?: string; timeout?: number }): Promise<void>;
  static warning(content: string, options?: { icon?: string; timeout?: number }): Promise<void>;
  static error(content: string, options?: { icon?: string; timeout?: number }): Promise<void>;
  static default(content: string, options?: { icon?: string; timeout?: number }): Promise<void>;
  static show(content: string, options?: { type?: ToastTypes; icon?: string; timeout?: number }): Promise<void>;
}

type ToastTypes = 'default' | 'error' | 'success' | 'warning' | 'info';
