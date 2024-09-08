import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  BackgroundMode,
  BackgroundStyleSettings,
  FontSettings,
  GrainEffect,
  PlaybarMode,
  PlaybarStyleSettings,
  PlaylistImageMode,
  PlaylistViewMode,
  SettingsStore,
} from '@/types/settingTypes';
import { defaultSettings } from '@/constants/constants';

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      ...defaultSettings,

      updateFontSettings: (fontType, key, value) =>
        set((state) => ({
          fontSettings: {
            ...state.fontSettings,
            [fontType]: {
              ...state.fontSettings[fontType],
              [key]: value,
            },
          },
        })),

      setIsScrollMode: (isScrollMode: boolean) => set(() => ({ isScrollMode })),
      setBackgroundMode: (backgroundMode: BackgroundMode) =>
        set(() => ({ backgroundMode })),
      setFontSettings: (fontSettings: FontSettings) =>
        set(() => ({ fontSettings })),
      setGrainEffect: (grainEffect: GrainEffect) =>
        set(() => ({ grainEffect })),
      setPlaylistImageMode: (playlistImageMode: PlaylistImageMode) =>
        set(() => ({ playlistImageMode })),
      setPlaybarMode: (playbarMode: PlaybarMode) =>
        set(() => ({ playbarMode })),
      setPlaylistViewMode: (playlistViewMode: PlaylistViewMode) =>
        set(() => ({ playlistViewMode })),
      setDynamicColor: (isDynamicColor: boolean) =>
        set(() => ({ isDynamicColor })),
      updateBackgroundStyles: (
        mode: BackgroundMode,
        key: keyof BackgroundStyleSettings,
        value: string
      ) => {
        set((state) => ({
          ...state,
          backgroundStyles: {
            ...state.backgroundStyles,
            [mode]: {
              ...state.backgroundStyles[mode],
              [key]: value,
            },
          },
        }));
      },
      updatePlaybarStyles: (
        mode: PlaybarMode,
        key: keyof PlaybarStyleSettings,
        value: string
      ) => {
        set((state) => ({
          ...state,
          playbarStyles: {
            ...state.playbarStyles,
            [mode]: {
              ...state.playbarStyles[mode],
              [key]: value,
            },
          },
        }));
      },

      resetSettings: () => {
        set(defaultSettings);
      },
    }),
    {
      name: 'lucid-settings',
    }
  )
);
