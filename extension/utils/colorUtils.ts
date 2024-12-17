import type { Color } from "@/types/colors";

const rgbToHex = (r: number, g: number, b: number): string =>
	`#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;

const luminance = (r: number, g: number, b: number): number => {
	const [r1, g1, b1] = [r / 255, g / 255, b / 255];
	const [r2, g2, b2] = [
		r1 <= 0.03928 ? r1 / 12.92 : ((r1 + 0.055) / 1.055) ** 2.4,
		g1 <= 0.03928 ? g1 / 12.92 : ((g1 + 0.055) / 1.055) ** 2.4,
		b1 <= 0.03928 ? b1 / 12.92 : ((b1 + 0.055) / 1.055) ** 2.4,
	];
	return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
};

const darkenColor = (color: Color, factor: number): Color => ({
	...color,
	r: Math.max(0, Math.round(color.r * factor)),
	g: Math.max(0, Math.round(color.g * factor)),
	b: Math.max(0, Math.round(color.b * factor)),
	hex: rgbToHex(
		Math.max(0, Math.round(color.r * factor)),
		Math.max(0, Math.round(color.g * factor)),
		Math.max(0, Math.round(color.b * factor)),
	),
});

const lightenColor = (color: Color, factor: number): Color => ({
	...color,
	r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
	g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
	b: Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
	hex: rgbToHex(
		Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
		Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
		Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
	),
});

const contrastRatio = (color1: Color, color2: Color): number => {
	const lum1 = luminance(color1.r, color1.g, color1.b);
	const lum2 = luminance(color2.r, color2.g, color2.b);
	const lighter = Math.max(lum1, lum2);
	const darker = Math.min(lum1, lum2);
	return (lighter + 0.05) / (darker + 0.05);
};

const adjustBrightnessAndSaturation = (color: Color, brightnessFactor: number): Color => ({
	...color,
	r: Math.max(0, Math.min(255, Math.round(color.r * brightnessFactor))),
	g: Math.max(0, Math.min(255, Math.round(color.g * brightnessFactor))),
	b: Math.max(0, Math.min(255, Math.round(color.b * brightnessFactor))),
	hex: rgbToHex(
		Math.max(0, Math.min(255, Math.round(color.r * brightnessFactor))),
		Math.max(0, Math.min(255, Math.round(color.g * brightnessFactor))),
		Math.max(0, Math.min(255, Math.round(color.b * brightnessFactor))),
	),
});

export { contrastRatio, adjustBrightnessAndSaturation, darkenColor, lightenColor, luminance, rgbToHex };
