/* ZeresPluginLibrary.ColorConverter */
export class ColorConverter {
  /* Undocumented */
  static getDarkness(color: unknown): number;
  static hex2int(color: string): number;
  static hex2rgb(color: string): string;
  static int2hex(color: number): string;
  static int2rgba(color: number, alpha: number): string;
  static isValidHex(color: string): boolean;
  /* End undocumented */

  static getRGB(color: string): number[];
  static darkenColor(color: string, percent: number): string;
  static lightenColor(color: string, percent: number): string;
  static rgbToAlpha(color: string, alpha: number): string;
}
