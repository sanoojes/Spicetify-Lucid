import React, { type ChangeEvent, type FC } from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import Dropdown from '@/components/settings/ui/Dropdown';
import { useSettingsStore } from '@/store/useSettingsStore';
import type { PlaybarMode, PlaybarStyleSettings } from '@/types/settingTypes';
import CustomInput from '@/components/ui/CustomInput';

const PlaybarSettingsSection: FC = () => {
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

  const getTitle = (key: string) => {
    switch (key) {
      case 'backgroundColor':
        return 'background color';
      case 'backdropBlur':
        return 'backdrop blur';
      case 'borderRadius':
        return 'border radius';
      default:
        return key;
    }
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
      {Object.entries(playbarStyles[playbarMode] || {}).map(([key, value]) => (
        <SettingsCard key={key} title={`Set ${getTitle(key)}`}>
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
