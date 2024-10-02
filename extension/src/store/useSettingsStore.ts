import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_APP_SETTINGS } from "@/constants/constants";
import type { SettingsStore } from "@/types/settingTypes";

export const useSettingsStore = create(
	persist<SettingsStore>(
		(set) => ({
			...DEFAULT_APP_SETTINGS,

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
				set(DEFAULT_APP_SETTINGS);
			},
		}),
		{
			name: "lucid-settings",
		},
	),
);
