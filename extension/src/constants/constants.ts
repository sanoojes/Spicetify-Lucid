import type { BackgroundCustomOptions } from '@/types/background';

export const BACKGROUND_LOCAL_KEY: string = 'lucid:background';

export const DEFAULT_BACKGROUND_OPTIONS: BackgroundCustomOptions = {
  animated: {
    blur: '62px',
    opacity: '1',
    contrast: '1.1',
    brightness: '0.8',
    saturation: '1.5',
    time: '35s', // time in seconds
  },
  static: {
    blur: '32px',
    opacity: '1',
    contrast: '1.1',
    saturation: '1.2',
    brightness: '0.8',
  },
  solid: {
    opacity: '1',
    bgColor: 'var(--spice-main, #202020)',
    brightness: '0.9',
    backdropBlur: '0',
  },
};
