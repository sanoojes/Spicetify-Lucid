import { extractColors } from 'extract-colors';
import type { BrowserOptions, FinalColor } from 'extract-colors';

export async function getImageColor(
  imageUrl: string,
  options: BrowserOptions
): Promise<string | null> {
  try {
    const colors: FinalColor[] = await extractColors(imageUrl, options);
    const firstColor: FinalColor = colors[0];
    const hex = firstColor.hex;
    return hex;
  } catch (error) {
    console.error('Error extracting color.', error);
    return null;
  }
}
