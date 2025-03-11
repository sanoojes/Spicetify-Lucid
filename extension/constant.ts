import type { AppSettings } from '@app/types/settings.ts';

export const APPLICATION_VERSION = window?.lucid?.version ?? '2.0.0';
export const GUIDE_STORAGE_KEY = 'lucid-guided-tour';
export const WORKER_SCIRPT_URLS = [
  'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/main/src/workers/getColor.js',
  'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/src/workers/getColor.js',
];
export const WORKER_SCRIPT_CACHE_KEY = 'LUCID_COLOR_SCRIPT_CACHE';
export const DEFAULT_COLOR = '#1bc858';
export const GUIDE_SCRIPT_CACHE_KEY = 'LUCID_GUIDE_SCRIPT_CACHE';
export const GUIDE_SCRIPT_URLS = [
  'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/main/src/guidedTour.js',
  'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/src/guidedTour.js',
];
export const APP_SETTINGS_KEY = 'lucid-theme-settings';
export const LUCID_VERSION_STORAGE_KEY = 'lucid-current-version';
export const CHANGELOG_DATA_URLS = [
  'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/main/changelog.json',
  'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/changelog.json',
];
export const CHANGELOG_DATA_STORAGE_KEY = 'lucid-changelog-data';

export const DEFAULT_APP_SETTINGS = {
  showChangelog: true,
  position: 'nav',
  background: {
    mode: 'static',
    options: {
      static: {
        isCustomImage: false,
        customImageURL: 'https://picsum.photos/1920/1080?random',
        filter: {
          blur: 32,
          brightness: 60,
          saturate: 150,
        },
      },
      solid: {
        color: { hex: '#1a211c', alpha: 100 },
      },
      animated: {
        filter: {
          blur: 32,
          brightness: 60,
          saturate: 150,
        },
      },
    },
  },
  color: {
    customColor: { hex: '#00ffa1', alpha: 100 },
    isTonal: true,
    isCustom: false,
    isDynamic: false,
  },
  pages: {
    panelGap: 8,
    hideHomeHeader: false,
    style: 'card',
    umv: {
      type: 'normal',
      options: {
        expanded: {
          isScroll: false,
          isScaling: true,
          filter: { blur: 0 },
        },
        normal: {
          isScroll: false,
          isScaling: true,
          filter: { blur: 8 },
        },
        npv: {
          isScroll: false,
          isScaling: true,
          filter: { blur: 8 },
        },
      },
    },
  },
  border: {
    thickness: 1,
    color: { hex: '#454545', alpha: 50 },
    style: 'solid',
  },
  control: {
    height: 40,
  },
  font: {
    fontFamily: 'Poppins',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
    isGoogleFonts: true,
  },
  grains: {
    type: 'starry',
  },
  rightSidebar: {
    isCustomBg: false,
    mode: 'normal',
    position: 'bottom right',
    blur: 16,
    size: 240,
    color: { hex: '#1a211c', alpha: 50 },
  },
  playbar: {
    type: 'normal',
    hideIcons: true,
    options: {
      normal: {
        height: 80,
        paddingX: 8,
        bgColor: {
          hex: '',
          alpha: 50,
        },
        bgOpacity: 100,
        borderRadius: 8,
        backdropFilter: { blur: 32, saturate: 150, brightness: 60 },
      },
      compact: {
        height: 64,
        paddingX: 8,
        bgColor: {
          hex: '',
          alpha: 50,
        },
        bgOpacity: 100,
        borderRadius: 8,
        backdropFilter: { blur: 32, saturate: 150, brightness: 60 },
      },
    },
    isFloating: true,
  },
} satisfies AppSettings;
