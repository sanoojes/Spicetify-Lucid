// deno-lint-ignore ban-types
type Stringify<T extends string> = T | (string & {}); // just to trick the compiler

type Color = string;
export interface ColorState {
  mode: Stringify<'default' | 'dynamic' | 'custom'>;
  accentColor: Color;
  isTinted: boolean;
  isDark: boolean;
}

export interface CSSFilter {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  opacity?: number;
  blur?: number;
}

export interface BodyClassState {
  hideHomeHeader: boolean;
  newHome: boolean;
  flexyHome: boolean;
}

type BackgroundMode = Stringify<'solid' | 'static' | 'animated'>;
type BackgroundImageMode = Stringify<'custom' | 'player' | 'page'>;
export interface BackgroundState {
  mode: BackgroundMode;
  options: {
    // For Animated and Static
    filter: CSSFilter;
    imageMode: BackgroundImageMode;
    imageSrc: string | null;

    // Solid Background
    color: Color;

    // Animated Background
    autoStopAnimation: boolean;
  };
}

type FontState = {
  family: string;
  variants: string[];
};

export type BorderStyle = Stringify<
  'none' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'
>;

type BorderState = {
  color: Color;
  hoverColor: Color;
  thickness: number;
  style: BorderStyle;
};

export interface UIPreferencesState {
  titleFont: FontState;
  // variableFont: GoogleFont;
  bodyFont: FontState;

  border: BorderState;

  windowControlHeight: number;
}

type UnderMainViewTypes = Stringify<'default' | 'playing' | 'custom-img' | 'custom-color' | 'none'>;
export interface UnderMainViewState {
  type: UnderMainViewTypes;

  isScrolling: boolean;
  isScaling: boolean;

  filter: CSSFilter;
  customUrl: string;

  customColor: Color;
}

type SettingModalAccessPoint = Stringify<'menu' | 'nav'>;
export interface SettingModalState {
  accessPoint: SettingModalAccessPoint;
  isFloating: boolean;
  floatingPosition: { x: number; y: number };
}

type PlayerTypes = Stringify<'compact' | 'default'>;
export type PlayerStyle = {
  height: number;
  width: number; // !! width is in percentage
  bgColor: Color | null; // null for default
  bgOpacity: number;
  paddingX: number;
  borderRadius: number;
  coverArtRadius: number;
  backdropFilter: CSSFilter;
};

export interface NextSongCardState {
  show: boolean;
  height: number;
  paddingX: number;
  paddingY: number;
  coverArtSize: number;
  removeNextUp: boolean;
  isFloating: boolean;
  position: Stringify<'left' | 'right'>;
}
export type PlayerState = {
  mode: PlayerTypes;
  autoHide: boolean;
  isFloating: boolean;
  hideExtraIcon: boolean;
  defaultStyle: PlayerStyle;
  compactStyle: PlayerStyle;
  nextSongCard: NextSongCardState;
};

export type PageMode = Stringify<'card' | 'compact-card' | 'compact' | 'default'>;
export type PageCoverImageMode = Stringify<'hidden' | 'as-bg' | 'default'>;
export type PageState = {
  mode: PageMode;
  coverMode: PageCoverImageMode;
  homeCardGap: number;
  panelGap: number;
};

type AutoHideBaseState = {
  autoHide: boolean;
  hoverTargetWidth: number;
};

export type LibraryState = AutoHideBaseState & {};
export type RightSidebarState = AutoHideBaseState & {
  mode: Stringify<'compact' | 'default'>;
  positionX: Stringify<'right' | 'left'>;
  positionY: Stringify<'top' | 'bottom'>;
  compactBackdropFilter: CSSFilter;
  compactSize: number;
};
export type GlobalNavState = AutoHideBaseState & {
  floating: boolean;
};

export interface AppState {
  color: ColorState;
  bg: BackgroundState;
  umv: UnderMainViewState;
  page: PageState;
  bodyClass: BodyClassState;
  settingModal: SettingModalState;
  uiPreferences: UIPreferencesState;
  player: PlayerState;
  library: LibraryState;
  rightSidebar: RightSidebarState;
  globalNav: GlobalNavState;
}
