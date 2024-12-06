import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_APP_SETTINGS } from "@/constants/settingsStore";
import { addToast } from "@/services/toastService";
import type { SettingsStore } from "@/types/settingTypes";

const isValidSettings = (data: unknown): data is SettingsStore => {
  return (
    typeof data === "object" &&
    data !== null &&
    "backgroundSettings" in data &&
    "interfaceSettings" in data &&
    "playbarSettings" in data &&
    "colorSettings" in data &&
    typeof (data as SettingsStore).backgroundSettings === "object" &&
    "mode" in (data as SettingsStore).backgroundSettings &&
    "styles" in (data as SettingsStore).backgroundSettings &&
    typeof (data as SettingsStore).interfaceSettings === "object" &&
    "borderSettings" in (data as SettingsStore).interfaceSettings &&
    "fontSettings" in (data as SettingsStore).interfaceSettings &&
    typeof (data as SettingsStore).playbarSettings === "object" &&
    "mode" in (data as SettingsStore).playbarSettings &&
    typeof (data as SettingsStore).colorSettings === "object" &&
    "isDynamicColor" in (data as SettingsStore).colorSettings
  );
};

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set, get) => ({
      ...DEFAULT_APP_SETTINGS,

      exportSettings: () => {
        const state = get();
        return JSON.stringify(state);
      },

      importSettings: (json: string) => {
        try {
          const importedSettings = JSON.parse(json);

          if (!isValidSettings(importedSettings)) {
            throw new Error("Invalid settings structure");
          }

          set(importedSettings);
          addToast("Settings imported successfully!");
          return true;
        } catch (error) {
          const errorMessage =
            error instanceof SyntaxError
              ? "Failed to parse JSON: Please ensure your input is valid JSON."
              : error instanceof Error
              ? error.message
              : "An unknown error occurred.";

          addToast(errorMessage, true);
          return false;
        }
      },

      setBackgroundSettings: (newBackgroundSettings) =>
        set((state) => ({
          backgroundSettings: {
            ...state.backgroundSettings,
            ...newBackgroundSettings,
          },
        })),

      setNpvMode: (mode) =>
        set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            mode,
          },
        })),

      setNpvBlur: (blur) =>
        set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            blur,
          },
        })),

      setCompactNpvPosition: (position) =>
        set((state) => ({
          npvSettings: {
            ...state.npvSettings,
            position,
          },
        })),

      setSettingAccessPosition: (settingAccessPosition) =>
        set(() => ({ settingAccessPosition })),

      setControlHeight: (height) =>
        set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            controlSettings: {
              height,
            },
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

      setRoundedBorderRadius: (value) =>
        set((state) => ({
          interfaceSettings: {
            ...state.interfaceSettings,
            borderSettings: {
              ...state.interfaceSettings.borderSettings,
              roundedRadius: value,
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
      version: 1.1,
      migrate: (persistedState) => {
        const state = {
          ...DEFAULT_APP_SETTINGS,
          ...(persistedState as SettingsStore),
        };

        return state;
      },
    }
  )
);
