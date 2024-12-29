export type ColorSettings = {
	isDynamicColor: boolean;
};

export type THSL = { h: number; s: number; l: number };
export type THEX = string;
export type TRGB = { r: number; g: number; b: number };
export type Colors = { hex: THEX; rgb: TRGB; hsl: THSL };
export type ColorKey = 0 | 5 | 8 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 99 | 100;
export type ColorPalette = { [key in ColorKey]: Colors };
export type SpicePaletteEntry = {
	name: string;
	color: { hex: THEX; rgb: TRGB };
};
export type SpiceColorPalette = SpicePaletteEntry[];

export type SpiceMapNames =
	| "button"
	| "selected-row"
	| "button-active"
	| "player"
	| "misc"
	| "text"
	| "main-elevated"
	| "subtext"
	| "shadow"
	| "main"
	| "highlight"
	| "sidebar"
	| "card"
	| "notification"
	| "notification-error"
	| "highlight-elevated"
	| "button-disabled"
	| "accent"
	| "tab-active";

export type paletteMap = { [key in SpiceMapNames]: ColorKey };
