import { logError } from "@/utils/logUtils";

import type {
	ColorKey,
	ColorPalette,
	Colors,
	SpiceColorPalette,
	SpiceMapNames,
	THSL,
	paletteMap,
} from "@/types/colors";
import { hslToRgb, rgbToHex, rgbToHsl } from "@/utils/colorUtils";

const DYNAMIC_STYLES_ID = "lucid_dynamic_colors";
const CANVAS_SIZE = 16;
const RESIZE_SIZE = 16;
const CANVAS_ID = "dynamic_color_canvas";

const addWillChangeStyleSheet = () => {
	const ID = `${DYNAMIC_STYLES_ID}_will_change`;
	let style = document.getElementById(ID);
	if (!style) {
		style = document.createElement("style");
		style.id = ID;
		document.head.appendChild(style);
	}

	style.innerText =
		":root{\nwill-change: --spice-main,--spice-rgb-main,--spice-sidebar,--spice-rgb-sidebar,--spice-card,--spice-rgb-card,--spice-player,--spice-rgb-player,--spice-accent,--spice-rgb-accent,--spice-highlight,--spice-rgb-highlight,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-text,--spice-rgb-text,--spice-progress-bar,--spice-rgb-progress-bar,--spice-subtext,--spice-rgb-subtext,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 0.3s ease-in-out;\n}";
};

const getColorFromImage = async (imgSrc: string): Promise<Colors | undefined> => {
	let canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement | null;
	if (!canvas) {
		canvas = document.createElement("canvas");
		canvas.id = CANVAS_ID;
	}
	canvas.height = CANVAS_SIZE;
	canvas.width = CANVAS_SIZE;

	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) {
		logError("Failed to create canvas context");
		return;
	}

	let res: Colors | undefined;

	const image = new Image();
	image.src = imgSrc;

	const tryExtraction = async () => {
		try {
			const newImage = await createImageBitmap(image, {
				resizeHeight: RESIZE_SIZE,
				resizeWidth: RESIZE_SIZE,
				resizeQuality: "pixelated",
			});

			const areaSize = 2;
			const randomX = Math.floor(Math.random() * (CANVAS_SIZE - areaSize));
			const randomY = Math.floor(Math.random() * (CANVAS_SIZE - areaSize));

			ctx.drawImage(newImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

			const imageData = ctx.getImageData(randomX, randomY, areaSize, areaSize);

			const data = imageData.data;
			const rgb = { r: data[0], g: data[1], b: data[2] };
			const hsl = rgbToHsl(rgb);
			const hex = rgbToHex(rgb);
			const result = { rgb, hex, hsl };

			console.log(result);

			res = result;
		} catch (error) {
			console.error(error);

			logError("Error processing image");
		}
	};

	await new Promise<void>((resolve, reject) => {
		image.onload = async () => {
			await tryExtraction();
			resolve();
		};
		image.onerror = () => {
			logError("Failed to load image");
			reject("Failed to load image");
		};
	});

	return res;
};

export const addPaletteToStyles = (palette: SpiceColorPalette): void => {
	const rootVariables = palette.map(({ name, color }) => {
		return [
			`--spice-${name}: ${color.hex} !important;`,
			`--spice-rgb-${name}: ${color.rgb.r},${color.rgb.g},${color.rgb.b} !important;`,
		].join("");
	});

	let styleTag = document.getElementById(DYNAMIC_STYLES_ID);
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.id = DYNAMIC_STYLES_ID;
		document.head.appendChild(styleTag);
	}

	styleTag.innerText = `:root {${rootVariables.join("")}}`;

	console.log(styleTag);
};

export const resetDynamicColors = () => {
	const element = document.getElementById(DYNAMIC_STYLES_ID);
	if (element) element.remove();
};

export const addDynamicColorsFromImage = async (url: string): Promise<void> => {
	addWillChangeStyleSheet();

	const color = await getColorFromImage(url);
	if (!color) return;

	const mainPalette = generateLightnessPalette(color.hsl);

	const paletteMap: paletteMap = {
		button: 80,
		"selected-row": 95,
		"button-active": 80,
		player: 20,
		misc: 20,
		text: 90,
		"main-elevated": 20,
		subtext: 95,
		shadow: 0,
		main: 20,
		highlight: 20,
		sidebar: 8,
		card: 20,
		notification: 20,
		"notification-error": 80,
		"highlight-elevated": 20,
		"button-disabled": 20,
		accent: 80,
		"tab-active": 30,
	};

	const generateSpicePalette = (mainPalette: ColorPalette): SpiceColorPalette => {
		return Object.keys(paletteMap).map((name) => {
			const colorKey = paletteMap[name as SpiceMapNames];
			return {
				name,
				color: {
					hex: mainPalette[colorKey].hex,
					rgb: mainPalette[colorKey].rgb,
				},
			};
		});
	};

	const spicePalette = generateSpicePalette(mainPalette);
	addPaletteToStyles(spicePalette);
};

const generateLightnessPalette = ({ h, s }: THSL): ColorPalette => {
	const lightnessValues: ColorKey[] = [0, 5, 8, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
	const res: Partial<ColorPalette> = {};

	for (const l of lightnessValues) {
		const hsl = { h, s, l };

		const rgb = hslToRgb(hsl);
		const hex = rgbToHex(rgb);

		res[l] = { rgb, hex, hsl };
	}

	return res as ColorPalette;
};
