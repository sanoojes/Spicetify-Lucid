import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import {
  isValidUrl,
  extractFontFamilyFromUrl,
  loadFontFromUrl,
} from '@/utils/fontUtils';
import type { FontTypes } from '@/types/settingTypes';
import { logDebug } from '@/utils/logUtils';

export const useFontManager = () => {
  const { fontSettings } = useSettingsStore();

  const updateCssVariable = React.useCallback(
    (fontType: string, fontFamily: string) => {
      document.documentElement.style.setProperty(
        `--${fontType}-font-to-use`,
        fontFamily
      );
    },
    []
  );

  const handleFontChange = React.useCallback(
    (fontType: FontTypes) => {
      const { url, fontFamily } = fontSettings[fontType];

      if (isValidUrl(url)) {
        const extractedFontFamily = extractFontFamilyFromUrl(url);
        loadFontFromUrl(url, `${fontType}-font`);
        updateCssVariable(fontType, extractedFontFamily);
      } else {
        updateCssVariable(fontType, fontFamily);
      }
    },
    [fontSettings, updateCssVariable]
  );

  React.useEffect(() => {
    for (const fontType of Object.keys(fontSettings)) {
      handleFontChange(fontType as FontTypes);
    }

    logDebug('useFontManager effect ran.');
  }, [fontSettings, handleFontChange]);
};
