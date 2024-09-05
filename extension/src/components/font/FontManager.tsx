import React from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import {
  isValidUrl,
  extractFontFamilyFromUrl,
  loadFontFromUrl,
} from '@/utils/fontUtils';
import type { FontTypes } from '@/types/settingTypes';

const FontManager = () => {
  const { fontSettings } = useSettingsStore();

  const updateCssVariable = (fontType: string, fontFamily: string) => {
    document.documentElement.style.setProperty(
      `--${fontType}-font-to-use`,
      fontFamily
    );
  };

  const handleFontChange = (fontType: FontTypes) => {
    const { url, fontFamily } = fontSettings[fontType];

    if (isValidUrl(url)) {
      const extractedFontFamily = extractFontFamilyFromUrl(url);
      loadFontFromUrl(url, `${fontType}-font`);
      updateCssVariable(fontType, extractedFontFamily);
    } else {
      updateCssVariable(fontType, fontFamily);
    }
  };

  React.useEffect(() => {
    for (const fontType of Object.keys(fontSettings)) {
      handleFontChange(fontType as FontTypes);
    }
  }, [fontSettings]);

  return null;
};

export default FontManager;
