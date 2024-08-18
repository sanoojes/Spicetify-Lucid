export const extractFontName = (fontUrl: string): string => {
  const regex = /family=([^&]+)/;
  const match = fontUrl.match(regex);
  if (match?.[1]) {
    return match[1];
  }
  throw new Error('Invalid Google Fonts URL provided');
};

export const isValidFontUrl = (fontUrl: string): boolean => {
  const googleFontsRegex =
    /https:\/\/fonts.googleapis.com\/css2\?family=([^&]+)/;
  return googleFontsRegex.test(fontUrl);
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
