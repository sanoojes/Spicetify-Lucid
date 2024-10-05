import type { StyleOptions } from "@/types/styles";

export type PlaybarMode = "compact" | "default";

export type PlaybarStyles = {
	[key in PlaybarMode]: StyleOptions;
};

export type PlaybarSettings = {
	mode: PlaybarMode;
	styles: PlaybarStyles;
};
