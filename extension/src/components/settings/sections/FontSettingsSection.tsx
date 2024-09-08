import React, { type FC } from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { FontInput } from '@/components/settings/ui/FontInput';
import { useSettingsStore } from '@/store/useSettingsStore';
import { isValidUrl, extractFontFamilyFromUrl } from '@/utils/fontUtils';
import type { FontTypes } from '@/types/settingTypes';
import { FontToolTip } from '@/components/settings/sections/tooltip/FontTooltip';

const FontSettingsSection: FC = () => {
  const { fontSettings, updateFontSettings } = useSettingsStore();

  const fontTypes: FontTypes[] = ['title', 'body'];

  const handleFontChange = (newFont: string, selectedFontType: FontTypes) => {
    const isUrl = isValidUrl(newFont);
    const fontFamily = isUrl ? extractFontFamilyFromUrl(newFont) : newFont;

    updateFontSettings(selectedFontType, 'fontFamily', fontFamily);
    updateFontSettings(selectedFontType, 'url', isUrl ? newFont : '');
  };

  return (
    <>
      {fontTypes.map((type) => {
        const { fontFamily, url } = fontSettings[type];

        return (
          <SettingsCard
            key={type}
            title={`${type === 'title' ? 'Title' : 'Body'} Font Family`}
            selectedValue={fontFamily || 'Default Font (Spotify Mix)'}
            tooltip={<FontToolTip />}
          >
            <FontInput
              fontFamily={fontFamily}
              fontUrl={url}
              onFontChange={(newFont) => handleFontChange(newFont, type)}
            />
          </SettingsCard>
        );
      })}
    </>
  );
};

export default FontSettingsSection;
