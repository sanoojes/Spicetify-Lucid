import type { BackgroundMode } from "@/types/background";
import type { BorderRadius, BorderStyle } from "@/types/border";
import type { DropdownOption } from "@/types/dropdown";
import type { GrainEffect } from "@/types/grains";
import type { SettingsPositions } from "@/types/main";
import type { NpvMode, NpvPosition } from "@/types/npv";
import type { PlaylistBackgroundImageMode, PlaylistViewMode } from "@/types/pages";
import type { PlaybarMode } from "@/types/playbar";

export const BACKGROUND_MODE_OPTIONS: DropdownOption<BackgroundMode>[] = [
	{ label: "Animated", value: "animated" },
	{ label: "Static", value: "static" },
	{ label: "Solid", value: "solid" },
];

export const PLAYBAR_MODE_OPTIONS: DropdownOption<PlaybarMode>[] = [
	{ label: "Compact", value: "compact" },
	{ label: "Default", value: "default" },
	{ label: "Rounded", value: "rounded" },
];

export const GRAIN_MODE_OPTIONS: DropdownOption<GrainEffect>[] = [
	{ label: "Starry", value: "starry" },
	{ label: "Default", value: "default" },
	{ label: "none", value: "none" },
];

export const PLAYLIST_BACKGROUND_MODE_OPTIONS: DropdownOption<PlaylistBackgroundImageMode>[] = [
	{ label: "Now Playing", value: "now-playing" },
	{ label: "Playlist Cover", value: "inherit" },
	{ label: "none", value: "none" },
];

export const PLAYLIST_VIEW_MODE_OPTIONS: DropdownOption<PlaylistViewMode>[] = [
	{ label: "Card", value: "card" },
	{ label: "Compact Card", value: "compact-card" },
	{ label: "Compact", value: "compact" },
	{ label: "Default", value: "default" },
];

export const BORDER_STYLE_OPTIONS: DropdownOption<BorderStyle>[] = [
	{ label: "None", value: "none" },
	{ label: "Hidden", value: "hidden" },
	{ label: "Dotted", value: "dotted" },
	{ label: "Dashed", value: "dashed" },
	{ label: "Solid", value: "solid" },
	{ label: "Double", value: "double" },
	{ label: "Groove", value: "groove" },
	{ label: "Ridge", value: "ridge" },
	{ label: "Inset", value: "inset" },
	{ label: "Outset", value: "outset" },
];

export const BORDER_RADIUS_OPTIONS: DropdownOption<BorderRadius>[] = [
	// { label: "Custom", value: "custom" }, // TODO
	{ label: "Card", value: "card" },
	{ label: "Rounded", value: "rounded" },
];

export const SETTINGS_ACCESS_MODE_OPTIONS: DropdownOption<SettingsPositions>[] = [
	{ label: "Profile Context Menu", value: "context-menu" },
	{ label: "Global Nav", value: "nav" },
];

export const NPV_MODE_OPTIONS: DropdownOption<NpvMode>[] = [
	{ label: "Compact", value: "compact" },
	{ label: "Normal", value: "normal" },
];

export const NPV_POSITION_OPTIONS: DropdownOption<NpvPosition>[] = [
	{ label: "Left", value: "left" },
	{ label: "Right", value: "right" },
];
