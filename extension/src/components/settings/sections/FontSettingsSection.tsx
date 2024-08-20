import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { FontInput } from '@/components/settings/ui/FontInput';
import { useSettingsStore } from '@/store/settingsStore';

const FontSettingsSection = () => {
  const { fontFamily } = useSettingsStore();

  return (
    <div>
      <SettingsCard title='Font Family' selectedValue={fontFamily}>
        <FontInput />
      </SettingsCard>
    </div>
  );
};

export default FontSettingsSection;
