import Store from '@utils/state/store.ts';
import type {
  AnimatedBackgroundOptions,
  AppSettings,
  BackgroundMode,
  BorderSettings,
  Color,
  ColorSettings,
  CSSFilter,
  CustomImageSetting,
  GrainSettings,
  LocalImageSetting,
  PageImageStyle,
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
  UrlImageSetting,
} from '@app/types/settings.ts';
import { deepmerge } from 'deepmerge-ts';
import { isValidAppSettings } from '@utils/settingsValidator.ts';
import {
  APP_SETTINGS_KEY,
  CHANGELOG_DATA_STORAGE_KEY,
  LUCID_VERSION_STORAGE_KEY,
  DEFAULT_APP_SETTINGS,
  GUIDE_SCRIPT_CACHE_KEY,
  GUIDE_STORAGE_KEY,
  WORKER_SCRIPT_CACHE_KEY,
} from '@app/constant.ts';
import { showNotification } from '@utils/showNotification.ts';

class AppSettingsStore extends Store<AppSettings> {
  constructor(
    initialState: AppSettings = DEFAULT_APP_SETTINGS,
    options = {
      persist: true,
      localStorageKey: APP_SETTINGS_KEY,
    }
  ) {
    super(initialState, options);
  }

  setChangelog(showChangelog: boolean) {
    this.setState((state) => ({ ...state, showChangelog }));
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
  setUMVFilter(key: keyof UMVSettings['options'], filter: Partial<CSSFilter>) {
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
              filter: {
                ...state.pages.umv.options[key].filter,
                ...filter,
              },
            },
          },
        },
      },
    }));
  }

  setCustomImageType(type: CustomImageSetting['type']) {
    this.setState((state) => ({
      ...state,
      customImage: {
        ...state.customImage,
        type,
      },
    }));
  }
  setCustomImageOptions<T extends keyof CustomImageSetting['options']>(
    option: T,
    options: Partial<CustomImageSetting['options'][T]>
  ) {
    this.setState((state) => ({
      ...state,
      customImage: {
        ...state.customImage,
        options: {
          ...state.customImage.options,
          [option]: {
            ...state.customImage.options[option],
            ...options,
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
  setColorExtractorOptions(extractorOptions: Partial<ColorSettings['extractorOptions']>) {
    this.setState((state) => ({
      ...state,
      color: {
        ...state.color,
        extractorOptions: {
          ...state.color.extractorOptions,
          ...extractorOptions,
        },
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
  setPageImageStyle(imageStyle: PageImageStyle) {
    this.setState((state) => ({
      ...state,
      pages: {
        ...state.pages,
        imageStyle,
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
    try {
      this.setState(() => DEFAULT_APP_SETTINGS);
      localStorage.removeItem(GUIDE_STORAGE_KEY);
      localStorage.removeItem(GUIDE_SCRIPT_CACHE_KEY);
      localStorage.removeItem(WORKER_SCRIPT_CACHE_KEY);
      localStorage.removeItem(CHANGELOG_DATA_STORAGE_KEY);
      localStorage.removeItem(LUCID_VERSION_STORAGE_KEY);
      window.location.reload();
    } catch (e) {
      showNotification('Error reseting settings.', true, 5000);
      console.error('Error reseting settings.', e);
    }
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
        showNotification('Import failed: Invalid settings format.', true, 5000);
      } else {
        appSettingsStore.setState((state) => deepmerge(state, parsed));
        showNotification('Settings imported successfully!', false, 5000);
      }
    } catch (error) {
      console.error('Error importing settings:', error);
      showNotification('Import failed: Unable to parse settings JSON.', true, 5000);
    }
  }
}

const appSettingsStore = new AppSettingsStore();
export default appSettingsStore;
