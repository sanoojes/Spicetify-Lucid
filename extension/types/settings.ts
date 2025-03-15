import type { BrowserOptions } from 'extract-colors';
import { KeyIsOptional } from 'deepmerge-ts';

export type CSSFilter = {
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: string;
  hueRotate?: string;
  invert?: string;
  opacity?: number;
  saturate?: number;
  sepia?: string;
};

export type Color = { hex: string; alpha: number };

export type UrlImageSetting = { url: string };

export type SlideshowSetting = {
  isSlideshow: boolean;
  timeDelay: number;
};
export type LocalImageSetting = {
  selectedIds: number[];
  slideshow: SlideshowSetting;
};

export type StaticBackgroundOptions = {
  isCustomImage: boolean;
  filter: CSSFilter;
};
export type SolidBackgroundOptions = {
  color: Color;
};
export type AnimatedBackgroundOptions = { filter: CSSFilter };

export type BackgroundOptions = {
  static: StaticBackgroundOptions;
  solid: SolidBackgroundOptions;
  animated: AnimatedBackgroundOptions;
};
export type BackgroundMode = keyof BackgroundOptions;

export type Background = {
  mode: BackgroundMode;
  options: BackgroundOptions;
};
export type BorderSettings = {
  thickness: number;
  color: Color;
  style: BorderStyle;
};
export type BorderStyle =
  | 'none'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

export type SettingsPosition = 'context-menu' | 'nav';

export type RightSidebarMode = 'compact' | 'normal';
export type RightSidebarPosition = 'bottom left' | 'bottom right' | 'top left' | 'top right';

export type RightSidebarSettings = {
  mode: RightSidebarMode;
  position: RightSidebarPosition;
  blur: number;
  size: number;
  isCustomBg: boolean;
  color: Color;
};

export type PageOption = {
  isScaling: boolean;
  isScroll: boolean;
  filter: CSSFilter | null;
};
export type PageOptions = {
  normal: PageOption;
  expanded: PageOption;
  npv: PageOption;
  custom: PageOption & { url: string };
};
export type PageType = keyof PageOptions;

export type UMVSettings = {
  type: 'normal' | 'npv' | 'custom';
  options: PageOptions;
};

export type PageStyle = 'card' | 'compact-card' | 'compact' | 'default';
export type PageImageStyle = 'hidden' | 'as-bg' | 'default';
export type PageSettings = {
  panelGap: number;
  hideHomeHeader: boolean;
  style: PageStyle;
  imageStyle: PageImageStyle;
  umv: UMVSettings;
};

export type ColorSettings = {
  isDynamic: boolean;
  isCustom: boolean;
  isTonal: boolean;
  customColor: Color;
  extractorOptions: Partial<BrowserOptions>;
};

export type PlaybarTypes = 'compact' | 'normal';
export type PlaybarOption = {
  backdropFilter: CSSFilter;
  height: number;
  paddingX: number;
  bgColor: Color;
  bgOpacity: number;
  borderRadius: number;
  imageRadius: number;
};
export type PlaybarOptions = {
  [key in PlaybarTypes]: PlaybarOption;
};
export type PlaybarSettings = {
  type: PlaybarTypes;
  options: PlaybarOptions;
  isFloating: boolean;
  hideIcons: boolean;
};

export type GrainSettings = { type: 'default' | 'starry' | 'none' };

export type CustomImageSetting = {
  type: 'url' | 'local';
  options: {
    url: {
      data: string;
    };
    local: null;
  };
};
export type CustomImageTypes = CustomImageSetting['type'];

export type AppSettings = {
  showChangelog: boolean;
  position: SettingsPosition;
  background: Background;
  border: BorderSettings;
  pages: PageSettings;
  color: ColorSettings;
  control: { height: number };
  font: { fontFamily: string; fontUrl: string | null; isGoogleFonts: boolean };
  grains: GrainSettings;
  playbar: PlaybarSettings;
  rightSidebar: RightSidebarSettings;
  customImage: CustomImageSetting;
};
