import type { DropdownOption } from "@/types/dropdown";

export const BACKGROUND_MODE_OPTIONS: DropdownOption[] = [
	{ label: "Animated", value: "animated" },
	{ label: "Static", value: "static" },
	{ label: "Solid", value: "solid" },
];

export const PLAYBAR_MODE_OPTIONS: DropdownOption[] = [
	{ label: "Compact", value: "compact" },
	{ label: "Default", value: "default" },
];

export const GRAIN_MODE_OPTIONS: DropdownOption[] = [
	{ label: "Starry", value: "starry" },
	{ label: "Default", value: "default" },
	{ label: "none", value: "none" },
];

export const PLAYLIST_BACKGROUND_MODE_OPTIONS: DropdownOption[] = [
	{ label: "Now Playing", value: "now-playing" },
	{ label: "Playlist Cover", value: "inherit" },
	{ label: "none", value: "none" },
];

export const PLAYLIST_VIEW_MODE_OPTIONS: DropdownOption[] = [
	{ label: "Card", value: "card" },
	{ label: "Compact", value: "compact" },
	{ label: "Default", value: "default" },
];

export const BORDER_STYLE_OPTIONS: DropdownOption[] = [
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
