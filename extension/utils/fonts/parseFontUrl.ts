export function parseFontFamilyFromGFonts(url: string): string | null {
  try {
    const urlObject = new URL(url);
    const fontFamilyParam = urlObject.searchParams.get('family');

    if (fontFamilyParam) {
      const fontFamilyName = fontFamilyParam.split(':')[0].split(';')[0];
      return fontFamilyName.replace(/\+/g, ' ');
    }
    return null;
  } catch (error) {
    console.error('Error parsing Google Fonts URL:', error);
    return null;
  }
}
