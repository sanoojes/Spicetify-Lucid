import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  BackgroundMode,
  BackgroundStyleSettings,
  SettingsStore,
} from '@/types/settingTypes';
import { defaultSettings } from '@/constants/constants';

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      ...defaultSettings,

      setBackgroundMode: (backgroundMode) => set(() => ({ backgroundMode })),
      setFontFamily: (fontFamily) => set(() => ({ fontFamily })),
      setFontImportUrl: (fontImportUrl) => set(() => ({ fontImportUrl })),
      setGrainEffect: (grainEffect) => set(() => ({ grainEffect })),
      setPlaylistImageMode: (playlistImageMode) =>
        set(() => ({ playlistImageMode })),
      setPlaybarMode: (playbarMode) => set(() => ({ playbarMode })),
      setPlaybarStyles: (playbarStyles) => set(() => ({ playbarStyles })),
      setPlaylistViewMode: (playlistViewMode) =>
        set(() => ({ playlistViewMode })),
      setDynamicColor: (isDynamicColor) => set((state) => ({ isDynamicColor })),
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

      resetSettings: () => {
        set(defaultSettings);
      },
    }),
    {
      name: 'lucid-settings',
    }
  )
);
