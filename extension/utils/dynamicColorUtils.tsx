import type { Color, ColorPalette, ExtractedColors } from "@/types/colors";
import { contrastRatio, darkenColor, lightenColor, rgbToHex } from "@/utils/colorUtils";
import { logError } from "@/utils/logUtils";
import { createCanvas, loadImage } from "canvas";

// Function to extract dominant colors from an image
async function extractDominantColorsFromImage(imageUrl: string): Promise<ExtractedColors | Error> {
	try {
		const image = await loadImage(imageUrl);

		// Aggressive Image Reduction
		const reductionFactor = 10;
		const reducedWidth = Math.max(image.width / reductionFactor, 10);
		const reducedHeight = Math.max(image.height / reductionFactor, 10);

		const canvas = createCanvas(reducedWidth, reducedHeight);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, reducedWidth, reducedHeight);

		const imageData = ctx.getImageData(0, 0, reducedWidth, reducedHeight);
		const pixelData = imageData.data;

		const colorCounts: { [key: string]: number } = {};
		const colorMap: { [key: string]: Color } = {};

		// Sample a small percentage of pixels
		const samplePercentage = 0.2;
		const pixelSampleSize = Math.floor(pixelData.length * samplePercentage);

		for (let i = 0; i < pixelSampleSize; i += 4) {
			const r = pixelData[i];
			const g = pixelData[i + 1];
			const b = pixelData[i + 2];
			const colorKey = `${r}-${g}-${b}`;
			colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
			colorMap[colorKey] = { r, g, b, hex: rgbToHex(r, g, b) };
		}

		const sortedColors = Object.entries(colorCounts)
			.sort((a, b) => b[1] - a[1])
			.map(([key]) => colorMap[key]);

		const baseColor = sortedColors[0];
		let secondaryColor = sortedColors[1];
		let tertiaryColor = sortedColors[2];
		let colorIndex = 2;

		while (!secondaryColor || contrastRatio(baseColor, secondaryColor) < 2.5) {
			if (colorIndex >= sortedColors.length) {
				secondaryColor = lightenColor(baseColor, 0.2);
				break;
			}
			secondaryColor = sortedColors[colorIndex];
			colorIndex++;
		}

		while (
			!tertiaryColor ||
			contrastRatio(baseColor, tertiaryColor) < 2.5 ||
			contrastRatio(secondaryColor, tertiaryColor) < 2.5
		) {
			if (colorIndex >= sortedColors.length) {
				tertiaryColor = lightenColor(secondaryColor, 0.2);
				break;
			}
			tertiaryColor = sortedColors[colorIndex];
			colorIndex++;
		}

		return {
			baseColor,
			secondaryColor,
			tertiaryColor,
		};
	} catch (error) {
		logError("Error extracting colors: ", error);
		return error as Error;
	}
}

let colorExtractionTimeout: number | null = null;

export async function applyExtractedColorsToCSS(
	styleElement: HTMLElement,
	isDynamicColor: boolean,
	currentArtUrl: string,
): Promise<ExtractedColors | null> {
	if (!isDynamicColor || !currentArtUrl) return null;

	return new Promise<ExtractedColors | null>((resolve) => {
		if (colorExtractionTimeout) {
			clearTimeout(colorExtractionTimeout);
		}

		colorExtractionTimeout = setTimeout(async () => {
			try {
				const extractedColors = await extractDominantColorsFromImage(currentArtUrl);

				if (extractedColors instanceof Error) {
					logError(`Error extracting colors: ${extractedColors.message}`);
					resolve(null);
					return;
				}

				const colorPalette = generateDarkModePalette(extractedColors);

				applyColorPaletteToCSS(styleElement, colorPalette);

				resolve(extractedColors);
			} catch (error) {
				logError("Error saving colors to style: ", error instanceof Error ? error.message : error);
				resolve(null);
			}
		}, 200);
	});
}

export function applyColorPaletteToCSS(styleElement: HTMLElement, colorPalette: ColorPalette) {
	let styleContent = `:root {${Object.entries(colorPalette)
		.map(
			([name, color]) =>
				`\n--spice-${name}: ${color.hex} !important;\n--spice-rgb-${name}: ${color.r}, ${color.g}, ${color.b} !important;`,
		)
		.join("")}\n}`;
	styleContent +=
		":root{\nwill-change: --spice-main,--spice-rgb-main,--spice-sidebar,--spice-rgb-sidebar,--spice-card,--spice-rgb-card,--spice-player,--spice-rgb-player,--spice-accent,--spice-rgb-accent,--spice-highlight,--spice-rgb-highlight,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-text,--spice-rgb-text,--spice-progress-bar,--spice-rgb-progress-bar,--spice-subtext,--spice-rgb-subtext,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 0.3s ease-in-out;\n}";

	styleElement.textContent = styleContent;
}

export async function resetCSSColorVariables(styleElement: HTMLElement) {
	styleElement.textContent =
		":root{\nwill-change: --spice-main,--spice-rgb-main,--spice-sidebar,--spice-rgb-sidebar,--spice-card,--spice-rgb-card,--spice-player,--spice-rgb-player,--spice-accent,--spice-rgb-accent,--spice-highlight,--spice-rgb-highlight,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-text,--spice-rgb-text,--spice-progress-bar,--spice-rgb-progress-bar,--spice-subtext,--spice-rgb-subtext,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 0.3s ease-in-out;\n}";
}

function generateDarkModePalette({ baseColor, secondaryColor, tertiaryColor }: ExtractedColors): ColorPalette {
	return {
		main: darkenColor(secondaryColor, 0.4),
		sidebar: darkenColor(secondaryColor, 0.5),
		card: darkenColor(tertiaryColor, 0.5),
		player: darkenColor(secondaryColor, 0.6),
		"progress-bar": lightenColor(secondaryColor, 0.6),
		accent: lightenColor(baseColor, 0.4),
		highlight: lightenColor(secondaryColor, 0.2),
		button: lightenColor(tertiaryColor, 0.4),
		"button-active": lightenColor(tertiaryColor, 0.4),
		text: lightenColor(baseColor, 0.9),
		subtext: lightenColor(secondaryColor, 0.9),
		primary: baseColor,
		secondary: secondaryColor,
		tertiary: tertiaryColor,
	};
}
