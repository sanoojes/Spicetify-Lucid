import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { FontInput } from '@/components/settings/ui/FontInput';
import { useSettingsStore } from '@/store/useSettingsStore';
import { isValidUrl, extractFontFamilyFromUrl } from '@/utils/fontUtils';
import type { FontTypes } from '@/types/settingTypes';
import { FontToolTip } from '@/components/settings/sections/tooltip/FontTooltip';

const FontSettingsSection = () => {
  const { fontSettings, updateFontSettings } = useSettingsStore();
  const fontTypes: FontTypes[] = ['title', 'body'];

  const handleFontChange = (newFont: string, selectedFontType: FontTypes) => {
    if (isValidUrl(newFont)) {
      const fontFamilyFromUrl = extractFontFamilyFromUrl(newFont);
      updateFontSettings(selectedFontType, 'url', newFont);
      updateFontSettings(selectedFontType, 'fontFamily', fontFamilyFromUrl);
    } else {
      updateFontSettings(selectedFontType, 'fontFamily', newFont);
      updateFontSettings(selectedFontType, 'url', '');
    }
  };

  return (
    <>
      {fontTypes.map((type) => (
        <SettingsCard
          key={type}
          title={`${type === 'title' ? 'Title' : 'Body'} Font Family`}
          selectedValue={
            fontSettings[type].fontFamily !== ''
              ? fontSettings[type].fontFamily
              : 'Default Font (Spotify Mix)'
          }
          tooltip={<FontToolTip />}
        >
          <FontInput
            fontFamily={fontSettings[type].fontFamily}
            fontUrl={fontSettings[type].url}
            onFontChange={(newFont) => handleFontChange(newFont, type)}
          />
        </SettingsCard>
      ))}
    </>
  );
};

export default FontSettingsSection;
