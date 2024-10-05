import type { StyleOptions } from "@/types/styles";

export type BackgroundMode = "animated" | "static" | "solid";

export type BackgroundStyle = {
	[key in BackgroundMode]: StyleOptions;
};

export type CustomBackground = {
	url: string | null;
};

export type BackgroundSettings = {
	mode: BackgroundMode;
	styles: BackgroundStyle;
	customBackgroundOverride: CustomBackground;
};
