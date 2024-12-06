import type { StyleOptions } from "@/types/styles";

export type PlaybarMode = "compact" | "default" | "rounded";

export type PlaybarStyles = {
	[key in PlaybarMode]: StyleOptions;
};

export type PlaybarSettings = {
	mode: PlaybarMode;
	styles: PlaybarStyles;
};
