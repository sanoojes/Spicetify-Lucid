import {
  adjustBrightnessAndSaturation,
  contrastRatio,
  darkenColor,
  lightenColor,
  luminance,
  rgbToHex,
} from '@/utils/colorUtils';
import { createCanvas, loadImage } from 'canvas';
import type { ColorPalette, Color, ExtractedColors } from '@/types/colors';
import { logToConsole } from './logUtils';

// Function to extract dominant colors from an image
async function extractDominantColorsFromImage(
  imageUrl: string
): Promise<ColorPalette | Error> {
  try {
    const image = await loadImage(imageUrl);

    // Aggressive Image Reduction
    const reductionFactor = 10;
    const reducedWidth = Math.max(image.width / reductionFactor, 10);
    const reducedHeight = Math.max(image.height / reductionFactor, 10);

    const canvas = createCanvas(reducedWidth, reducedHeight);
    const ctx = canvas.getContext('2d');
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

    const colorPalette: ColorPalette = generateDarkModePalette({
      baseColor,
      secondaryColor,
      tertiaryColor,
    });

    return colorPalette;
  } catch (error) {
    logToConsole(`Error extracting colors: ${error}`);
    return error as Error;
  }
}

let colorExtractionTimeout: NodeJS.Timeout | null = null;

export async function applyExtractedColorsToCSS(
  styleElement: HTMLElement,
  isDynamicColor: boolean,
  currentArtUrl: string
): Promise<ColorPalette | null> {
  if (!isDynamicColor || !currentArtUrl) return null;

  return new Promise<ColorPalette | null>((resolve) => {
    if (colorExtractionTimeout) {
      clearTimeout(colorExtractionTimeout);
    }

    colorExtractionTimeout = setTimeout(async () => {
      try {
        const colorPalette = await extractDominantColorsFromImage(
          currentArtUrl
        );

        if (colorPalette instanceof Error) {
          logToConsole(`Error extracting colors: ${colorPalette.message}`);
          resolve(null);
          return;
        }

        const styleContent = `
          :root {
            ${Object.entries(colorPalette)
              .map(
                ([name, color]) =>
                  `\n--spice-${name}: ${color.hex} !important;
--spice-rgb-${name}: ${color.r}, ${color.g}, ${color.b} !important;\n`
              )
              .join('')}
            
            will-change: 
              --spice-main, 
              --spice-sidebar,
              --spice-card,
              --spice-player,
              --spice-accent,
              --spice-highlight,
              --spice-button,
              --spice-button-active,
              --spice-text,
              --spice-progress-bar,
              --spice-subtext,
              --spice-primary,
              --spice-secondary,
              --spice-tertiary;

            transition: all 0.3s ease-in-out;
          }
        `;

        styleElement.textContent = styleContent;

        resolve(colorPalette);
      } catch (error) {
        logToConsole(
          `Error saving colors to style: ${
            error instanceof Error ? error.message : error
          }`,
          { level: 'error' }
        );
        resolve(null);
      }
    }, 200);
  });
}

export async function resetCSSColorVariables(styleElement: HTMLElement) {
  styleElement.textContent = `:root{
  will-change: 
    --spice-main, 
    --spice-sidebar,
    --spice-card,
    --spice-player,
    --spice-accent,
    --spice-highlight,
    --spice-button,
    --spice-button-active,
    --spice-text,
    --spice-progress-bar,
    --spice-subtext,
    --spice-primary,
    --spice-secondary,
    --spice-tertiary;

  transition: all 0.2s ease-in-out;
}`;
}

function generateDarkModePalette({
  baseColor,
  secondaryColor,
  tertiaryColor,
}: ExtractedColors): ColorPalette {
  return {
    main: darkenColor(secondaryColor, 0.4),
    sidebar: darkenColor(secondaryColor, 0.5),
    card: darkenColor(tertiaryColor, 0.5),
    player: darkenColor(secondaryColor, 0.6),
    'progress-bar': lightenColor(secondaryColor, 0.6),
    accent: lightenColor(baseColor, 0.4),
    highlight: lightenColor(secondaryColor, 0.2),
    button: lightenColor(tertiaryColor, 0.4),
    'button-active': lightenColor(tertiaryColor, 0.4),
    text: lightenColor(baseColor, 0.9),
    subtext: lightenColor(secondaryColor, 0.9),
    primary: baseColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
  };
}
