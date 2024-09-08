import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { SettingsStore } from '@/types/settingTypes';
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

      setIsScrollMode: (isScrollMode) => set(() => ({ isScrollMode })),
      setIsCustomBackground: (isCustomBackground) =>
        set(() => ({ isCustomBackground })),
      setCustomBackgroundURL(customBackgroundURL) {
        set(() => ({ customBackgroundURL }));
      },
      setBackgroundMode: (backgroundMode) => set(() => ({ backgroundMode })),
      setFontSettings: (fontSettings) => set(() => ({ fontSettings })),
      setGrainEffect: (grainEffect) => set(() => ({ grainEffect })),
      setPlaylistImageMode: (playlistImageMode) =>
        set(() => ({ playlistImageMode })),
      setPlaybarMode: (playbarMode) => set(() => ({ playbarMode })),
      setPlaylistViewMode: (playlistViewMode) =>
        set(() => ({ playlistViewMode })),
      setDynamicColor: (isDynamicColor) => set(() => ({ isDynamicColor })),
      updateBackgroundStyles: (mode, key, value) => {
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
      updatePlaybarStyles: (mode, key, value) => {
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
