import type { BackgroundMode, BackgroundSettings, BackgroundStyle } from "@/types/background";
import type { BorderSettings, BorderStyle } from "@/types/border";
import type { ButtonProps } from "@/types/button";
import type { ColorSettings } from "@/types/colors";
import type { DropdownSetting } from "@/types/dropdown";
import type { FontData, FontTypes } from "@/types/font";
import type { GrainEffect } from "@/types/grains";
import type { InputSetting } from "@/types/input";
import type { InterfaceSettings } from "@/types/interface";
import type { SettingsPositions } from "@/types/main";
import type { NpvMode, NpvPosition, NpvSettings } from "@/types/npv";
import type { PlaylistBackgroundImageMode, PlaylistViewMode } from "@/types/pages";
import type { PlaybarMode, PlaybarSettings, PlaybarStyles } from "@/types/playbar";
import type { StyleOptions } from "@/types/styles";
import type { ToggleSetting } from "@/types/toggle";
import type { CSSProperties, ReactNode } from "react";

// Settings Store Start
export type ThemeSettings = {
	backgroundSettings: BackgroundSettings;
	interfaceSettings: InterfaceSettings;
	colorSettings: ColorSettings;
	playbarSettings: PlaybarSettings;
	settingAccessPosition: SettingsPositions;
	npvSettings: NpvSettings;
};

export type MainSettingsActions = {
	setSettingAccessPosition: (settingAccessPosition: SettingsPositions) => void;
	setBackgroundSettings: (backgroundSettings: BackgroundSettings) => void;
	setBackgroundStyles: (styles: StyleOptions, mode: BackgroundMode) => void;
	setInterfaceSettings: (interfaceSettings: InterfaceSettings) => void;
	setColorSettings: (colorSettings: ColorSettings) => void;
	setBorderSettings: (borderSettings: BorderSettings) => void;
	setPlaybarSettings: (playbarSettings: PlaybarSettings) => void;
	resetAllSettings: () => void;
};

export type SubSettingsActions = {
	exportSettings: () => string;

	importSettings: (json: string) => boolean;

	setBackgroundMode: (mode: BackgroundMode) => void;

	setNpvMode: (mode: NpvMode) => void;

	setNpvBlur: (mode: number) => void;

	setCompactNpvPosition: (position: NpvPosition) => void;

	setControlHeight: (height: number) => void;

	setBorderThickness: (thickness: number) => void;

	setBorderStyle: (style: BorderStyle) => void;

	setRoundedBorderRadius: (value: number) => void;

	setBorderColor: (color: string) => void;

	updateBackgroundStyle: (mode: keyof BackgroundStyle, key: keyof StyleOptions, value: number | string) => void;

	setCustomBackgroundOverride: (url: string) => void;

	setFont: (fontType: FontTypes, fontData: FontData) => void;

	setGrainEffect: (grainEffect: GrainEffect) => void;

	setIsScrollMode: (isScrollMode: boolean) => void;

	setPagesBackgroundImageMode: (backgroundImageMode: PlaylistBackgroundImageMode) => void;

	setPlaylistViewMode: (playlistViewMode: PlaylistViewMode) => void;

	setIsDynamicColor: (isDynamicColor: boolean) => void;

	setPlaybarMode: (mode: PlaybarMode) => void;

	updatePlaybarStyle: (mode: keyof PlaybarStyles, key: keyof StyleOptions, value: number | string) => void;
};

export type SettingsActions = MainSettingsActions & SubSettingsActions;

export type SettingsStore = ThemeSettings & SettingsActions;

// Settings Store End

// Settings Components Start
export type SectionProps = {
	title: string;
	description?: string;
	children?: ReactNode;
};

export type BaseSettingCardProps = {
	title: string;
	tooltip?: ReactNode;
	children?: ReactNode;
	selectedValue?: string | ReactNode;
	style?: CSSProperties;
};

export type InputCardProps = BaseSettingCardProps & {
	type: "input";
	settings: InputSetting;
};

export type ToggleCardProps = BaseSettingCardProps & {
	type: "toggle";
	settings: ToggleSetting;
};

export type DropdownCardProps = BaseSettingCardProps & {
	type: "dropdown";
	settings: DropdownSetting;
};

export type ButtonCardProps = BaseSettingCardProps & {
	type: "button";
	settings: ButtonProps;
};

export type NormalCardProps = BaseSettingCardProps & {
	type: "normal";
	children: ReactNode;
	settings?: null;
};

export type SettingCardProps = InputCardProps | ToggleCardProps | DropdownCardProps | ButtonCardProps | NormalCardProps;

export type SettingsCardSection = {
	id: string;
	sectionName?: string;
	conditionalRender: boolean;
	cardProps: SettingCardProps;
};

export type SettingCardMap = SettingsCardSection[];
// Settings Components End
