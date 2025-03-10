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
export type StaticBackgroundOptions = {
  isCustomImage: boolean;
  customImageURL: string;
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

export type PageType = 'normal' | 'expanded' | 'npv';

export type PageOption = {
  isScaling: boolean;
  isScroll: boolean;
  filter: CSSFilter | null;
};
export type PageOptions = Record<PageType, PageOption>;

export type UMVSettings = {
  type: 'npv' | 'normal';
  options: PageOptions;
};

export type PageStyle = 'card' | 'compact-card' | 'compact' | 'default';
export type PageSettings = {
  panelGap: number;
  hideHomeHeader: boolean;
  style: PageStyle;
  umv: UMVSettings;
};

export type ColorSettings = {
  isDynamic: boolean;
  isCustom: boolean;
  isTonal: boolean;
  customColor: Color;
};

export type PlaybarTypes = 'compact' | 'normal';
export type PlaybarOption = {
  backdropFilter: CSSFilter;
  height: number;
  paddingX: number;
  bgColor: Color;
  bgOpacity: number;
  borderRadius: number;
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
};
