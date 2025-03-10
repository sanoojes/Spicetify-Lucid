import Store from '@utils/state/store.ts';
import type {
  AnimatedBackgroundOptions,
  AppSettings,
  BackgroundMode,
  BorderSettings,
  Color,
  ColorSettings,
  CSSFilter,
  GrainSettings,
  PageSettings,
  PageStyle,
  PlaybarOption,
  PlaybarOptions,
  PlaybarSettings,
  PlaybarTypes,
  RightSidebarSettings,
  SettingsPosition,
  StaticBackgroundOptions,
  UMVSettings,
} from '@app/types/settings.ts';
import { deepmerge } from 'deepmerge-ts';
import { isValidAppSettings } from '@utils/settingsValidator.ts';

const defaultAppSettings: AppSettings = {
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
};
class AppSettingsStore extends Store<AppSettings> {
  constructor(
    initialState: AppSettings = defaultAppSettings,
    options = {
      persist: true,
      localStorageKey: 'lucid-theme-settings',
    }
  ) {
    super(initialState, options);
  }

  setPages(pages: Partial<PageSettings>) {
    this.setState((state) => ({ ...state, pages: { ...state.pages, ...pages } }));
  }

  setUMV(umv: Partial<UMVSettings>) {
    this.setState((state) => ({
      ...state,
      pages: {
        ...state.pages,
        umv: {
          ...state.pages.umv,
          ...umv,
        },
      },
    }));
  }
  setUMVOption(
    key: keyof UMVSettings['options'],
    options: Partial<UMVSettings['options'][keyof UMVSettings['options']]>
  ) {
    this.setState((state) => ({
      ...state,
      pages: {
        ...state.pages,
        umv: {
          ...state.pages.umv,
          options: {
            ...state.pages.umv.options,
            [key]: {
              ...state.pages.umv.options[key],
              ...options,
            },
          },
        },
      },
    }));
  }

  setPosition(position: SettingsPosition) {
    this.setState((state) => ({ ...state, position }));
  }

  setBackgroundMode(mode: BackgroundMode) {
    this.setState((state) => ({
      ...state,
      background: { ...state.background, mode },
    }));
  }

  setStaticBackgroundOptions(options: Partial<StaticBackgroundOptions>) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: {
          ...state.background.options,
          static: { ...state.background.options.static, ...options },
        },
      },
    }));
  }

  setStaticBackgroundFilter(filter: Partial<CSSFilter>) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: {
          ...state.background.options,
          static: {
            ...state.background.options.static,
            filter: {
              ...state.background.options.static.filter,
              ...filter,
            },
          },
        },
      },
    }));
  }
  setAnimatedBackgroundFilter(filter: Partial<CSSFilter>) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: {
          ...state.background.options,
          animated: {
            ...state.background.options.animated,
            filter: {
              ...state.background.options.animated.filter,
              ...filter,
            },
          },
        },
      },
    }));
  }

  setStaticBgFilter(filter: CSSFilter) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: {
          ...state.background.options,
          static: {
            ...state.background.options.static,
            filter: {
              ...state.background.options.static.filter,
              ...filter,
            },
          },
        },
      },
    }));
  }

  setSolidBackgroundColor(color: Partial<Color>) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: {
          ...state.background.options,
          solid: {
            ...state.background.options.solid,
            color: { ...state.background.options.solid.color, ...color },
          },
        },
      },
    }));
  }

  setAnimatedBackgroundOptions(options: AnimatedBackgroundOptions) {
    this.setState((state) => ({
      ...state,
      background: {
        ...state.background,
        options: { ...state.background.options, animated: options },
      },
    }));
  }

  setBorder(border: Partial<BorderSettings>) {
    this.setState((state) => ({
      ...state,
      border: { ...state.border, ...border },
    }));
  }
  setBorderColor(color: Partial<Color>) {
    this.setState((state) => ({
      ...state,
      border: {
        ...state.border,
        color: {
          ...state.border.color,
          ...color,
        },
      },
    }));
  }

  setControlHeight(height: number) {
    this.setState((state) => ({
      ...state,
      control: { ...state.control, height },
    }));
  }

  setFont(font: Partial<AppSettings['font']>) {
    this.setState((state) => ({ ...state, font: { ...state.font, ...font } }));
  }

  setGrains(grains: AppSettings['grains']) {
    this.setState((state) => ({
      ...state,
      grains: { ...state.grains, ...grains },
    }));
  }

  setRightSidebar(rightSidebar: Partial<RightSidebarSettings>) {
    this.setState((state) => ({
      ...state,
      rightSidebar: { ...state.rightSidebar, ...rightSidebar },
    }));
  }

  setColor(color: Partial<ColorSettings>) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        ...color,
      },
    }));
  }

  setPageStyle(style: PageStyle) {
    this.setState((state) => ({
      ...state,
      pages: {
        ...state.pages,
        style,
      },
    }));
  }

  setPlaybar(playbar: Partial<PlaybarSettings>) {
    this.setState((state) => ({
      ...state,
      playbar: {
        ...state.playbar,
        ...playbar,
      },
    }));
  }

  setPlaybarOptions(type: PlaybarTypes, value: Partial<PlaybarOption>) {
    this.setState((state) => ({
      ...state,
      playbar: {
        ...state.playbar,
        options: {
          ...state.playbar.options,
          [type]: {
            ...state.playbar.options[type],
            ...value,
          },
        },
      },
    }));
  }
  setPlaybarFilter(type: keyof PlaybarOptions, value: Partial<CSSFilter>) {
    this.setState((state) => ({
      ...state,
      playbar: {
        ...state.playbar,
        options: {
          ...state.playbar.options,
          [type]: {
            ...state.playbar.options[type],
            backdropFilter: {
              ...state.playbar.options[type].backdropFilter,
              ...value,
            },
          },
        },
      },
    }));
  }

  setRightSidebarColor(color: Partial<Color>) {
    this.setState((state) => ({
      ...state,
      rightSidebar: {
        ...state.rightSidebar,
        color: { ...state.rightSidebar.color, ...color },
      },
    }));
  }

  setGrainsType(type: GrainSettings['type']) {
    this.setState((state) => ({
      ...state,
      grains: {
        ...state.grains,
        type,
      },
    }));
  }

  setDynamicColor(isDynamic: boolean) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        isDynamic,
      },
    }));
  }

  setIsCustomColor(isCustom: boolean) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        isCustom,
      },
    }));
  }
  setCustomColor(color: Partial<Color>) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        customColor: { ...state.color.customColor, ...color },
      },
    }));
  }
  setTonalColor(isTonal: boolean) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        isTonal,
      },
    }));
  }

  resetState() {
    this.setState(() => defaultAppSettings);
  }

  exportSettings(): string {
    const state = appSettingsStore.getState();
    return JSON.stringify(state, null, 0);
  }

  importSettings(json: string): void {
    try {
      const parsed = JSON.parse(json);
      if (!isValidAppSettings(parsed)) {
        console.error('Invalid settings format.');
        Spicetify?.showNotification('Import failed: Invalid settings format.', true, 5000);
      } else {
        appSettingsStore.setState((state) => deepmerge(state, parsed));
        Spicetify?.showNotification('Settings imported successfully!', false, 5000);
      }
    } catch (error) {
      console.error('Error importing settings:', error);
      Spicetify?.showNotification('Import failed: Unable to parse settings JSON.', true, 5000);
    }
  }
}

const appSettingsStore = new AppSettingsStore();

window.lucid = {
  config: () => appSettingsStore.getState(),
  reset: () => {
    appSettingsStore.resetState();
    window.location.reload();
  },
  store: appSettingsStore,
};
export default appSettingsStore;
