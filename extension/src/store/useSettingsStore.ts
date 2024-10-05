import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_APP_SETTINGS } from "@/constants/settingsStore";
import type { SettingsStore } from "@/types/settingTypes";

export const useSettingsStore = create(
	persist<SettingsStore>(
		(set) => ({
			...DEFAULT_APP_SETTINGS,

			setBackgroundSettings: (newBackgroundSettings) =>
				set((state) => ({
					backgroundSettings: {
						...state.backgroundSettings,
						...newBackgroundSettings,
					},
				})),

			setCustomBackgroundOverride: (url) =>
				set((state) => ({
					backgroundSettings: {
						...state.backgroundSettings,
						customBackgroundOverride: {
							...state.backgroundSettings.customBackgroundOverride,
							url,
						},
					},
				})),

			setBorderColor: (color) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						borderSettings: {
							...state.interfaceSettings.borderSettings,
							color,
						},
					},
				})),
			setBorderStyle: (style) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						borderSettings: {
							...state.interfaceSettings.borderSettings,
							style,
						},
					},
				})),

			setBorderThickness: (thickness) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						borderSettings: {
							...state.interfaceSettings.borderSettings,
							thickness,
						},
					},
				})),

			setBackgroundStyles: (newStyles, mode) =>
				set((state) => ({
					backgroundSettings: {
						...state.backgroundSettings,
						styles: {
							...state.backgroundSettings.styles,
							[mode]: {
								...state.backgroundSettings.styles[mode],
								...newStyles,
							},
						},
					},
				})),
			setColorSettings: (newColorSettings) =>
				set((state) => ({
					colorSettings: { ...state.colorSettings, ...newColorSettings },
				})),
			setBorderSettings: (borderSettings) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						borderSettings: {
							...state.interfaceSettings.borderSettings,
							...borderSettings,
						},
					},
				})),
			setPlaybarSettings: (newPlaybarSettings) =>
				set((state) => ({
					playbarSettings: { ...state.playbarSettings, ...newPlaybarSettings },
				})),
			setInterfaceSettings: (newInterfaceSettings) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						...newInterfaceSettings,
					},
				})),

			setBackgroundMode: (mode) =>
				set((state) => ({
					backgroundSettings: { ...state.backgroundSettings, mode },
				})),

			updateBackgroundStyle: (mode, key, value) =>
				set((state) => ({
					backgroundSettings: {
						...state.backgroundSettings,
						styles: {
							...state.backgroundSettings.styles,
							[mode]: {
								...state.backgroundSettings.styles[mode],
								[key]: value,
							},
						},
					},
				})),

			setFont: (fontType, fontData) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						fontSettings: {
							...state.interfaceSettings.fontSettings,
							[fontType]: {
								...fontData,
							},
						},
					},
				})),

			setGrainEffect: (grainEffect) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						grainSettings: {
							...state.interfaceSettings.grainSettings,
							grainEffect,
						},
					},
				})),

			setIsScrollMode: (isScrollMode) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						pagesSettings: {
							...state.interfaceSettings.pagesSettings,
							isScrollMode,
						},
					},
				})),

			setPagesBackgroundImageMode: (backgroundImageMode) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						pagesSettings: {
							...state.interfaceSettings.pagesSettings,
							backgroundImageMode,
						},
					},
				})),

			setPlaylistViewMode: (playlistViewMode) =>
				set((state) => ({
					interfaceSettings: {
						...state.interfaceSettings,
						pagesSettings: {
							...state.interfaceSettings.pagesSettings,
							playlistViewMode,
						},
					},
				})),

			setIsDynamicColor: (isDynamicColor) =>
				set((state) => ({
					colorSettings: { ...state.colorSettings, isDynamicColor },
				})),

			updatePlaybarStyle: (mode, key, value) =>
				set((state) => ({
					playbarSettings: {
						...state.playbarSettings,
						styles: {
							...state.playbarSettings.styles,
							[mode]: {
								...state.playbarSettings.styles[mode],
								[key]: value,
							},
						},
					},
				})),

			setPlaybarMode: (mode) =>
				set((state) => ({
					playbarSettings: {
						...state.playbarSettings,
						mode,
					},
				})),

			// Reset all settings to default
			resetAllSettings: () => {
				set(DEFAULT_APP_SETTINGS);
			},
		}),
		{
			name: "lucid-settings",
		},
	),
);
