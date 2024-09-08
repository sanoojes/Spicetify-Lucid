import React from 'react';
import Dropdown from '@/components/settings/ui/Dropdown';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import SliderSwitch from '@/components/ui/SliderSwitch';
import { useSettingsStore } from '@/store/useSettingsStore';
import type {
  BackgroundMode,
  BackgroundStyleSettings,
} from '@/types/settingTypes';
import CustomInput from '@/components/ui/CustomInput';

const BackgroundSettingsSection = React.memo(() => {
  const {
    backgroundMode,
    backgroundStyles,
    isDynamicColor,
    setBackgroundMode,
    setDynamicColor,
    updateBackgroundStyles,
  } = useSettingsStore();

  const handleSelect = (value: BackgroundMode) => {
    setBackgroundMode(value);
  };

  const backgroundOption: { label: string; value: BackgroundMode }[] = [
    { label: 'Animated', value: 'animated' },
    { label: 'Static', value: 'static' },
    { label: 'Solid', value: 'solid' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BackgroundStyleSettings
  ) => {
    const newValue = e.target.value.trim();

    updateBackgroundStyles(backgroundMode, key, newValue);
  };

  return (
    <>
      <SettingsCard
        title='Set Background'
        selectedValue={
          backgroundMode === 'animated'
            ? 'Animated Background'
            : backgroundMode === 'solid'
            ? 'Solid Background'
            : backgroundMode === 'static'
            ? 'Static Background'
            : undefined
        }
      >
        <div>
          <Dropdown
            options={backgroundOption}
            selectedValue={backgroundMode}
            onSelect={handleSelect}
            label='Select an option'
          />
        </div>
      </SettingsCard>
      {Object.entries(backgroundStyles[backgroundMode]).map(([key, value]) => (
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
              handleInputChange(e, key as keyof BackgroundStyleSettings)
            }
          />
        </SettingsCard>
      ))}
      <SettingsCard title='Dynamic Color (Experimental)'>
        <SliderSwitch
          currentValue={isDynamicColor}
          onChange={(value) => setDynamicColor(value)}
        />
      </SettingsCard>
    </>
  );
});

export default BackgroundSettingsSection;
