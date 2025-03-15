import type { AppSettings } from '@app/types/settings.ts';
export const GITHUB_PATH =
  'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/main';
export const JSDELIVER_PATH =
  'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main';

export const APPLICATION_VERSION = window?.lucid?.version ?? '2.0.0';
export const GUIDE_STORAGE_KEY = 'lucid-guided-tour';
export const WORKER_SCIRPT_URLS = [
  `${GITHUB_PATH}/src/workers/getColor.js`,
  `${JSDELIVER_PATH}/src/workers/getColor.js`,
];
export const WORKER_SCRIPT_CACHE_KEY = 'LUCID_COLOR_SCRIPT_CACHE';
export const DEFAULT_COLOR = '#1bc858';
export const GUIDE_SCRIPT_CACHE_KEY = 'LUCID_GUIDE_SCRIPT_CACHE';
export const GUIDE_SCRIPT_URLS = [
  `${GITHUB_PATH}/src/guidedTour.js`,
  `${JSDELIVER_PATH}/src/guidedTour.js`,
];
export const APP_SETTINGS_KEY = 'lucid-theme-settings';
export const LUCID_VERSION_STORAGE_KEY = 'lucid-current-version';
export const CHANGELOG_DATA_URLS = [
  `${GITHUB_PATH}/changelog.json`,
  `${JSDELIVER_PATH}/changelog.json`,
];
export const CHANGELOG_DATA_STORAGE_KEY = 'lucid-changelog-data';

export const DB_NAME = 'LucidIDB';

export const ICON_CSS_URLS = [
  `${GITHUB_PATH}/src/icons.css`,
  `${JSDELIVER_PATH}/src/icons.css`,
  `${GITHUB_PATH}/styles/icons.css`,
  `${JSDELIVER_PATH}/styles/icons.css`,
];
export const ICON_CSS_CACHE_KEY = 'LUCID_CSS_SCRIPT_CACHE';
export const ICON_CSS_STYLE_ID = 'lucid-icons';

export const DEFAULT_APP_SETTINGS = {
  showChangelog: true,
  position: 'nav',
  background: {
    mode: 'static',
    options: {
      static: {
        isCustomImage: false,
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
    extractorOptions: {
      pixels: 360000,
      distance: 0.1,
      hueDistance: 0.2,
      lightnessDistance: 0.2,
      saturationDistance: 0.2,
    },
  },
  pages: {
    panelGap: 8,
    hideHomeHeader: false,
    style: 'card',
    imageStyle: 'default',
    umv: {
      type: 'normal',
      options: {
        expanded: {
          isScroll: false,
          isScaling: true,
          filter: { blur: 0 },
        },
        custom: {
          url: 'https://picsum.photos/1920/1080?random',
          isScroll: false,
          isScaling: true,
          filter: { blur: 8 },
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
        bgColor: { hex: '', alpha: 50 },
        bgOpacity: 100,
        imageRadius: 8,
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
        imageRadius: 8,
        borderRadius: 8,
        backdropFilter: { blur: 32, saturate: 150, brightness: 60 },
      },
    },
    isFloating: true,
  },
  customImage: {
    type: 'url',
    options: { url: { data: 'https://picsum.photos/1920/1080?random' }, local: null },
  },
} satisfies AppSettings;
