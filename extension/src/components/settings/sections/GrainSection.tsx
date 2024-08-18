import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import type { GrainOptions } from '@/types/grain';
import { useGrainContext } from '@/context/GrainContext';

const GrainSection = () => {
  const grainsOptions: { label: string; value: GrainOptions }[] = [
    { label: 'Stary', value: 'stary' },
    { label: 'Default', value: 'default' },
    { label: 'None', value: 'none' },
  ];

  const { selectedGrain, setSelectedGrain } = useGrainContext();

  const handleSelect = (value: GrainOptions) => {
    setSelectedGrain(value);
  };

  return (
    <div>
      <SettingsCard title='Set Grains' selectedValue={selectedGrain}>
        <Dropdown
          options={grainsOptions}
          onSelect={handleSelect}
          selectedValue={selectedGrain}
        />
      </SettingsCard>
    </div>
  );
};

export default GrainSection;
