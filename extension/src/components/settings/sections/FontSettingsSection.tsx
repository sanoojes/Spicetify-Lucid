import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { FontInput } from '@/components/settings/ui/FontInput';
import { useSettingsStore } from '@/store/settingsStore';

const FontSettingsSection = () => {
  const { fontFamily } = useSettingsStore();

  return (
    <div>
      <SettingsCard
        title='Font Family'
        selectedValue={fontFamily}
        tooltip={<FontToolTip />}
      >
        <FontInput />
      </SettingsCard>
    </div>
  );
};

export default FontSettingsSection;

const FontToolTip = () => {
  return (
    <div>
      <div>
        <img
          width='12rem'
          height='15rem'
          src='https://sanooj.is-a.dev/Spicetify-Lucid/assets/tooltip/font-url.png'
          alt='google font url img'
          style={{ width: '12rem', height: '15rem', borderRadius: '4px' }}
        />
      </div>
      <div>
        <h4>Usage:</h4>
        <li>Font Name (If Installed)</li>
        <li>URL (Google Fonts)</li>
      </div>
    </div>
  );
};
