import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { FontInput } from '@/components/settings/ui/FontInput';
import { useFontContext } from '@/context/FontContext';

const FontSection = () => {
  const { fontValue } = useFontContext();
  return (
    <div>
      <SettingsCard title='Font Family' selectedValue={fontValue}>
        <FontInput />
      </SettingsCard>
    </div>
  );
};

export default FontSection;
