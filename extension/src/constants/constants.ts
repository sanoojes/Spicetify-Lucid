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
  playlistImageMode: 'inherit',
  playbarMode: 'default',
  playbarStyles: defaultPlaybarStyles,
  fontFamily: 'Poppins',
  fontImportUrl:
    'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  playlistViewMode: 'card',
};
