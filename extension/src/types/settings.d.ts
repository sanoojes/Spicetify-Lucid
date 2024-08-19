import type { ReactNode } from 'react';

// Component Props
type SettingSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

type SettingCardProps = {
  title?: string | null;
  tooltip?: string;
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
  backgroundColor?: string; // Hex color code
};

type CustomCSSProperties =
  | React.CSSProperties & {
      '--blur'?: string | null;
      '--backdrop-blur'?: string | null;
      '--time'?: string | null; // Time in seconds
      '--height'?: number | null;
      '--width'?: number | null;
      '--padding-x'?: number | null;
      '--padding-x'?: number | null;
      '--opacity'?: number | null;
      '--brightness'?: number | null;
      '--saturation'?: number | null;
      '--contrast'?: number | null;
      '--background-color'?: string | null; // Hex color code
    };

type BackgroundStyleSettings = {
  [key in BackgroundMode]: StyleOptions;
};

type PlaybarStyleSettings = {
  [key in PlaybarMode]: StyleOptions;
};

// Theme Settings
type AppSettings = {
  fontFamily: string;
  fontImportUrl: string;
  backgroundMode: BackgroundMode;
  backgroundStyles: BackgroundStyleSettings;
  isDynamicColor: boolean;
  grainEffect: GrainEffect;
  playlistViewMode: PlaylistViewMode;
  playbarMode: PlaybarMode;
  playbarStyles: PlaybarStyleSettings;
};

// Settings Actions
type SettingsActions = {
  setFontFamily: (fontFamily: string) => void;
  setFontImportUrl: (fontImportUrl: string) => void;
  setBackgroundMode: (backgroundMode: BackgroundMode) => void;
  updateBackgroundStyles: (
    mode: BackgroundMode,
    key: keyof BackgroundStyleSettings,
    value: string
  ) => void;
  setDynamicColor: (isDynamicColor: boolean) => void;
  setGrainEffect: (grainEffect: GrainEffect) => void;
  setPlaybarMode: (playbarMode: PlaybarMode) => void;
  setPlaybarStyles: (playbarStyles: PlaybarStyleSettings) => void;
  setPlaylistViewMode: (playlistViewMode: PlaylistViewMode) => void;
  resetSettings: () => void;
};

// Settings Store Type
type SettingsStore = AppSettings & SettingsActions;

export type {
  BackgroundMode,
  GrainEffect,
  PlaybarMode,
  PlaylistViewMode,
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
