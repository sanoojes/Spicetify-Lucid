import type { BrowserOptions } from 'extract-colors';

export type ImageOptions = {
  url: string;
  isTonal: boolean;
  isDark: boolean;
  extractorOptions: Partial<BrowserOptions>;
};
export type ColorOptions = { hex: string; isTonal: boolean; isDark: boolean };
export type ColorMessage =
  | { type: 'image'; options: ImageOptions }
  | { type: 'color'; options: ColorOptions };
