// src/utils/fontUtils.ts

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const extractFontFamilyFromUrl = (url: string): string => {
  return (
    decodeURIComponent(
      url.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, ' ') || ''
    ) || ''
  );
};

export const loadFontFromUrl = (url: string, fontId: string) => {
  let customFont = document.getElementById(fontId) as HTMLLinkElement;
  if (!customFont) {
    customFont = document.createElement('link');
    customFont.rel = 'stylesheet';
    customFont.id = fontId;
    document.head.appendChild(customFont);
  }
  customFont.href = url;
};
