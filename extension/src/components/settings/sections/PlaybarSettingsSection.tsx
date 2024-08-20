import React, { type ChangeEvent } from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import { useSettingsStore } from '@/store/settingsStore';
import type { PlaybarMode, PlaybarStyleSettings } from '@/types/settingTypes';
import CustomInput from '@/components/ui/CustomInput';

const PlaybarSettingsSection = () => {
  const grainsOptions: { label: string; value: PlaybarMode }[] = [
    { label: 'Compact', value: 'compact' },
    { label: 'Default', value: 'default' },
  ];

  const { playbarMode, setPlaybarMode, playbarStyles, updatePlaybarStyles } =
    useSettingsStore();

  const handleSelect = (value: PlaybarMode) => {
    setPlaybarMode(value);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof PlaybarStyleSettings
  ) => {
    const newValue = e.target.value.trim();

    updatePlaybarStyles(playbarMode, key, newValue);
  };

  return (
    <>
      <SettingsCard title='Set Playbar Mode' selectedValue={playbarMode}>
        <Dropdown
          options={grainsOptions}
          onSelect={handleSelect}
          selectedValue={playbarMode}
        />
      </SettingsCard>
      {Object.entries(playbarStyles[playbarMode]).map(([key, value]) => (
        <SettingsCard
          key={key}
          title={`Set ${
            key === 'backgroundColor'
              ? 'background color'
              : key === 'backdropBlur'
              ? 'backdrop blur'
              : key === 'borderRadius'
              ? 'border radius'
              : key
          }`}
        >
          <CustomInput
            type={key === 'backgroundColor' ? 'text' : 'number'}
            name={key}
            step={0.01}
            value={value}
            onChange={(e) =>
              handleInputChange(e, key as keyof PlaybarStyleSettings)
            }
          />
        </SettingsCard>
      ))}
    </>
  );
};

export default PlaybarSettingsSection;
