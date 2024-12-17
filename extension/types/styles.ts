import type { CSSProperties } from "react";

// Style Settings
export type FCStyleOptions = { style: StyleOptions };

export type StyleOptions = {
	blur?: number;
	time?: number; // Time in seconds
	width?: number;
	height?: number;
	opacity?: number;
	contrast?: number;
	paddingX?: number;
	paddingY?: number;
	brightness?: number;
	saturation?: number;
	backdropBlur?: number;
	borderRadius?: number;
	backgroundColor?: string; // Hex color code
};

export type CustomCSSProperties = CSSProperties & {
	"--width"?: string;
	"--height"?: string;
	"--opacity"?: number;
	"--contrast"?: number;
	"--brightness"?: number;
	"--saturation"?: number;
	"--blur"?: string;
	"--time"?: string; // Time in seconds
	"--padding-x"?: string;
	"--backdrop-blur"?: string;
	"--border-radius"?: string;
	"--background-color"?: string; // Hex color code
};
