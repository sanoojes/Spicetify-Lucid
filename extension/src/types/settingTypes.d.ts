import type { ReactNode } from 'react';

// Component Props
type SettingSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

type SettingCardProps = {
  title?: string | null;
  tooltip?: ReactNode;
  selectedValue?: string | ReactNode;
  children: ReactNode;
};

type SettingSectionData = {
  key: string;
  title: string;
  content: ReactNode;
  description?: string;
}[];

// Type for Options
type BackgroundMode = 'animated' | 'static' | 'solid';
type GrainEffect = 'default' | 'stary' | 'none';
type PlaylistViewMode = 'default' | 'compact' | 'card';
type PlaylistImageMode = 'now-playing' | 'inherit' | 'none';
type PlaybarMode = 'compact' | 'default';

// Style Settings
type StyleOptions = {
  blur?: number;
  time?: number; // Time in seconds
  width?: number;
  height?: number;
  opacity?: number;
  contrast?: number;
  paddingX?: number;
  paddingY?: number;
  brightness?: number;
  saturation?: number;
  backdropBlur?: number;
  borderRadius?: number;
  backgroundColor?: string; // Hex color code
};

type CustomCSSProperties =
  | React.CSSProperties & {
      '--width'?: number | null;
      '--height'?: number | null;
      '--opacity'?: number | null;
      '--contrast'?: number | null;
      '--brightness'?: number | null;
      '--saturation'?: number | null;
      '--blur'?: string | null;
      '--time'?: string | null; // Time in seconds
      '--padding-x'?: string | null;
      '--padding-x'?: string | null;
      '--backdrop-blur'?: string | null;
      '--border-radius'?: string | null;
      '--background-color'?: string | null; // Hex color code
    };

type BackgroundStyleSettings = {
  [key in BackgroundMode]: StyleOptions;
};

type PlaybarStyleSettings = {
  [key in PlaybarMode]: StyleOptions;
};

type FontTypes = 'title' | 'body';

type FontSettings = {
  [key in FontTypes]: {
    fontFamily: string;
    url: string;
  };
};

// Theme Settings
type AppSettings = {
  fontSettings: FontSettings;
  backgroundMode: BackgroundMode;
  backgroundStyles: BackgroundStyleSettings;
  isScrollMode: boolean;
  isDynamicColor: boolean;
  grainEffect: GrainEffect;
  playlistImageMode: PlaylistImageMode;
  playlistViewMode: PlaylistViewMode;
  playbarMode: PlaybarMode;
  playbarStyles: PlaybarStyleSettings;
  isCustomBackground: boolean;
  customBackgroundURL: string;
};

// Settings Actions
type SettingsActions = {
  updateFontSettings: (
    fontType: FontTypes,
    key: keyof FontSettings[FontTypes],
    value: string
  ) => void;
  setIsCustomBackground: (isCustomBackground: boolean) => void;
  setCustomBackgroundURL: (customBackgroundURL: string) => void;
  setFontSettings: (fontSettings: FontSettings) => void;
  setBackgroundMode: (backgroundMode: BackgroundMode) => void;
  updateBackgroundStyles: (
    mode: BackgroundMode,
    key: keyof BackgroundStyleSettings,
    value: string
  ) => void;
  updatePlaybarStyles: (
    mode: PlaybarMode,
    key: keyof PlaybarStyleSettings,
    value: string
  ) => void;
  setIsScrollMode: (isDynamicColor: boolean) => void;
  setDynamicColor: (isDynamicColor: boolean) => void;
  setGrainEffect: (grainEffect: GrainEffect) => void;
  setPlaylistImageMode: (playlistImageMode: PlaylistImageMode) => void;
  setPlaybarMode: (playbarMode: PlaybarMode) => void;
  setPlaylistViewMode: (playlistViewMode: PlaylistViewMode) => void;
  resetSettings: () => void;
};

// Settings Store Type
type SettingsStore = AppSettings & SettingsActions;

export type {
  FontSettings,
  FontTypes,
  BackgroundMode,
  GrainEffect,
  PlaybarMode,
  PlaylistViewMode,
  PlaylistImageMode,
  StyleOptions,
  SettingCardProps,
  SettingSectionProps,
  BackgroundStyleSettings,
  PlaybarStyleSettings,
  SettingSectionData,
  AppSettings,
  SettingsActions,
  SettingsStore,
  CustomCSSProperties,
};
