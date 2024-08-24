import { createCanvas, loadImage } from 'canvas';
import type { Color, ColorPalette } from '@/types/colors';

// Helper functions
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function luminance(r: number, g: number, b: number): number {
  const [r1, g1, b1] = [r / 255, g / 255, b / 255];
  const [r2, g2, b2] = [
    r1 <= 0.03928 ? r1 / 12.92 : ((r1 + 0.055) / 1.055) ** 2.4,
    g1 <= 0.03928 ? g1 / 12.92 : ((g1 + 0.055) / 1.055) ** 2.4,
    b1 <= 0.03928 ? b1 / 12.92 : ((b1 + 0.055) / 1.055) ** 2.4,
  ];
  return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
}

function darkenColor(color: Color, factor: number): Color {
  return {
    ...color,
    r: Math.max(0, Math.round(color.r * factor)),
    g: Math.max(0, Math.round(color.g * factor)),
    b: Math.max(0, Math.round(color.b * factor)),
    hex: rgbToHex(
      Math.max(0, Math.round(color.r * factor)),
      Math.max(0, Math.round(color.g * factor)),
      Math.max(0, Math.round(color.b * factor))
    ),
  };
}

function lightenColor(color: Color, factor: number): Color {
  return {
    ...color,
    r: Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
    g: Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
    b: Math.min(255, Math.round(color.b + (255 - color.b) * factor)),
    hex: rgbToHex(
      Math.min(255, Math.round(color.r + (255 - color.r) * factor)),
      Math.min(255, Math.round(color.g + (255 - color.g) * factor)),
      Math.min(255, Math.round(color.b + (255 - color.b) * factor))
    ),
  };
}

function contrastRatio(color1: Color, color2: Color): number {
  const lum1 = luminance(color1.r, color1.g, color1.b);
  const lum2 = luminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Function to adjust the brightness and saturation of a color
function adjustColor(
  color: Color,
  brightnessFactor: number,
  saturationFactor: number
): Color {
  const r = Math.max(0, Math.min(255, Math.round(color.r * brightnessFactor)));
  const g = Math.max(0, Math.min(255, Math.round(color.g * brightnessFactor)));
  const b = Math.max(0, Math.min(255, Math.round(color.b * brightnessFactor)));
  return {
    ...color,
    r,
    g,
    b,
    hex: rgbToHex(r, g, b),
  };
}

// Function to extract dominant colors from an image
async function getColors(imageUrl: string): Promise<ColorPalette | Error> {
  try {
    const image = await loadImage(imageUrl);

    // Aggressive Image Reduction
    const reductionFactor = 20;
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

    const colorPalette: ColorPalette = {
      main: darkenColor(baseColor, 0.8),
      sidebar: darkenColor(secondaryColor, 0.9),
      card: darkenColor(tertiaryColor, 0.9),
      accent: lightenColor(tertiaryColor, 0.4),
      highlight: lightenColor(secondaryColor, 0.2),
      button: lightenColor(tertiaryColor, 0.4),
      'button-active': lightenColor(tertiaryColor, 0.4),
      text: lightenColor(baseColor, 0.8),
      subtext: lightenColor(baseColor, 0.9),
      primary: baseColor,
      secondary: secondaryColor,
      tertiary: tertiaryColor,
    };

    const colorsToAdjust = [
      colorPalette.main,
      colorPalette.sidebar,
      colorPalette.card,
    ];
    for (let color of colorsToAdjust) {
      if (luminance(color.r, color.g, color.b) > 0.3) {
        color.r = Math.max(0, Math.round(color.r * 0.7));
        color.g = Math.max(0, Math.round(color.g * 0.7));
        color.b = Math.max(0, Math.round(color.b * 0.7));
        color.hex = rgbToHex(color.r, color.g, color.b);
      }

      color = adjustColor(color, 0.5, 2);
    }

    if (colorPalette.accent && colorPalette.main) {
      const contrast = contrastRatio(colorPalette.accent, colorPalette.main);
      if (contrast < 4.5) {
        colorPalette.accent = lightenColor(colorPalette.accent, 0.2);
      }
    }

    return colorPalette;
  } catch (error) {
    console.error('Error extracting colors:', error);
    return error as Error;
  }
}

export async function saveColors(
  styleElement: HTMLElement,
  isDynamicColor: boolean
): Promise<ColorPalette | null> {
  if (!isDynamicColor || !window.currentArtUrl) return null;

  try {
    const colorPalette = await getColors(window.currentArtUrl);

    if (colorPalette instanceof Error) {
      console.error('[Lucid] Error extracting colors:', colorPalette.message);
      return null;
    }

    const styleContent = `
      :root {
        ${Object.entries(colorPalette)
          .map(
            ([name, color]) =>
              `--spice-${name}: ${color.hex} !important;
               --spice-rgb-${name}: ${color.r}, ${color.g}, ${color.b} !important;`
          )
          .join('\n')}
      }
    `;

    styleElement.textContent = styleContent;

    return colorPalette;
  } catch (error) {
    console.error('Error saving colors to style:', error);
    return null;
  }
}

export async function removeColors(styleElement: HTMLElement) {
  styleElement.textContent = '';
}
