import { extractColors } from 'extract-colors';

export async function extractFromImage(src: string) {
  const imageUrl = src.replace('spotify:image:', 'https://i.scdn.co/image/');
  const colors = await extractColors(imageUrl, {
    distance: 0.15,
    lightnessDistance: 0.2,
    saturationDistance: 0.2,
    hueDistance: 0.2,
    crossOrigin: 'anonymous',
  });

  return colors?.[1] || colors[0];
}
