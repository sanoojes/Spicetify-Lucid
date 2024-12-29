import type { THSL, TRGB } from "@/types/colors";

export const rgbToHsl = ({ r, g, b }: TRGB): THSL => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (delta !== 0) {
		s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

		if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
		else if (max === g) h = ((b - r) / delta + 2) * 60;
		else h = ((r - g) / delta + 4) * 60;
	}

	return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const rgbToHex = ({ r, g, b }: TRGB): string =>
	`#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;

export const hslToRgb = ({ h, s, l }: THSL): TRGB => {
	const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100);
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l / 100 - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
	else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
	else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
	else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
	else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
	else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
};
