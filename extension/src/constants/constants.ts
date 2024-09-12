import type {
  AppSettings,
  BackgroundStyleSettings,
  PlaybarStyleSettings,
} from '@/types/settingTypes';

//  Settings Local Key
export const SETTINGS_LOCAL_KEY: string = 'lucid:settings';

//  Settings
export const defaultBackgroundStyles: BackgroundStyleSettings = {
  solid: {
    opacity: 1,
    backgroundColor: 'var(--spice-main)',
  },
  static: {
    blur: 32,
    opacity: 1,
    saturation: 1.1,
    contrast: 1.2,
    brightness: 0.6,
    backgroundColor: 'var(--spice-main)',
  },
  animated: {
    blur: 32,
    time: 45,
    opacity: 1,
    saturation: 1.1,
    contrast: 1.2,
    brightness: 0.6,
    backgroundColor: 'var(--spice-main)',
  },
};

export const defaultPlaybarStyles: PlaybarStyleSettings = {
  compact: {
    opacity: 1,
    saturation: 1.1,
    contrast: 1.2,
    brightness: 0.8,
    borderRadius: 8,
    backdropBlur: 32,
    paddingX: 6,
    backgroundColor: 'rgba(var(--spice-rgb-card), 0.5)',
  },
  default: {
    opacity: 1,
    paddingX: 6,
    saturation: 1.1,
    contrast: 1.2,
    borderRadius: 8,
    brightness: 0.8,
    backdropBlur: 32,
    backgroundColor: 'rgba(var(--spice-rgb-card), 0.5)',
  },
};

export const defaultSettings: AppSettings = {
  backgroundMode: 'static',
  backgroundStyles: defaultBackgroundStyles,
  grainEffect: 'stary',
  isDynamicColor: false,
  isScrollMode: true,
  isCustomBackground: false,
  customBackgroundURL: '',
  playlistImageMode: 'inherit',
  playbarMode: 'default',
  playbarStyles: defaultPlaybarStyles,
  fontSettings: {
    title: { fontFamily: 'Poppins', url: '' },
    body: { fontFamily: 'Poppins', url: '' },
  },
  playlistViewMode: 'card',
};

export const RELEASES_URL =
  'https://api.github.com/repos/sanoojes/spicetify-lucid/releases';
