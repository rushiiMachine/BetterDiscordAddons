/* ZeresPluginLibrary.Logger */
export class Logger {
  // Only present in the global instance
  static stacktrace(module: string, message: string, error: Error): void;
  static err(module: string, ...message: string[]): void;
  static warn(module: string, ...message: any[]): void;
  static info(module: string, ...message: any[]): void;
  static debug(module: string, ...message: any[]): void;
  static log(module: string, ...message: any[]): void;
  static _log(module: string, message: any | any[], type: LogTypes): void;

  static stacktrace(message: string, error: Error): void;
  static err(...message: string[]): void;
  static warn(...message: any[]): void;
  static info(...message: any[]): void;
  static debug(...message: any[]): void;
  static log(...message: any[]): void;
  static _log(message: any | any[], type: LogTypes): void;
}

export type LogTypes = {
  err: 'error';
  error: 'error';
  dbg: 'debug';
  debug: 'debug';
  log: 'log';
  warn: 'warn';
  info: 'info';
};
