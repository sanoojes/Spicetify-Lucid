import React, { useMemo } from 'react';
import Dropdown from '@/components/settings/ui/Dropdown';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import SliderSwitch from '@/components/ui/SliderSwitch';
import { useSettingsStore } from '@/store/useSettingsStore';
import type {
  BackgroundMode,
  BackgroundStyleSettings,
} from '@/types/settingTypes';
import CustomInput from '@/components/ui/CustomInput';
import SettingsCardWrapper from '../SettingsCardWrapper';

const BackgroundSettingsSection: React.FC = React.memo(() => {
  const {
    backgroundMode,
    isDynamicColor,
    setDynamicColor,
    customBackgroundURL,
    setCustomBackgroundURL,
    backgroundStyles,
    setBackgroundMode,
    updateBackgroundStyles,
    isCustomBackground,
    setIsCustomBackground,
  } = useSettingsStore();

  const backgroundOptions = useMemo<{ label: string; value: BackgroundMode }[]>(
    () => [
      { label: 'Animated', value: 'animated' },
      { label: 'Static', value: 'static' },
      { label: 'Solid', value: 'solid' },
    ],
    []
  );

  const handleSelect = (value: BackgroundMode) => {
    setBackgroundMode(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BackgroundStyleSettings
  ) => {
    const newValue = e.target.value.trim();
    updateBackgroundStyles(backgroundMode, key, newValue);
  };

  const getSelectedValue = () => {
    switch (backgroundMode) {
      case 'animated':
        return 'Animated Background';
      case 'static':
        return 'Static Background';
      case 'solid':
        return 'Solid Background';
      default:
        return undefined;
    }
  };

  const handleURLInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomBackgroundURL(value);
  };

  return (
    <>
      <SettingsCard title='Set Background' selectedValue={getSelectedValue()}>
        <Dropdown
          options={backgroundOptions}
          selectedValue={backgroundMode}
          onSelect={handleSelect}
          label='Select an option'
        />
      </SettingsCard>
      {backgroundStyles[backgroundMode] &&
        Object.entries(backgroundStyles[backgroundMode]).map(([key, value]) => (
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
      {backgroundMode === 'static' && (
        <SettingsCardWrapper>
          <SettingsCard title='Set Static Background URL'>
            <SliderSwitch
              currentValue={isCustomBackground}
              onChange={(value) => setIsCustomBackground(value)}
            />
          </SettingsCard>
          {isCustomBackground && (
            <SettingsCard title='Enter your custom url'>
              <CustomInput
                name='Custom Url'
                onChange={handleURLInput}
                placeholder='Enter custom url here'
                type='text'
                value={customBackgroundURL}
                isURL={true}
              />
            </SettingsCard>
          )}
        </SettingsCardWrapper>
      )}
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
