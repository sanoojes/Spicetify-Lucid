import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import { useSettingsStore } from '@/store/settingsStore';
import type { GrainEffect } from '@/types/settings';

const GrainSection = () => {
  const grainsOptions: { label: string; value: GrainEffect }[] = [
    { label: 'Stary', value: 'stary' },
    { label: 'Default', value: 'default' },
    { label: 'None', value: 'none' },
  ];

  const { grainEffect, setGrainEffect } = useSettingsStore();

  const handleSelect = (value: GrainEffect) => {
    setGrainEffect(value);
  };

  return (
    <div>
      <SettingsCard title='Set Grains' selectedValue={grainEffect}>
        <Dropdown
          options={grainsOptions}
          onSelect={handleSelect}
          selectedValue={grainEffect}
        />
      </SettingsCard>
    </div>
  );
};

export default GrainSection;
