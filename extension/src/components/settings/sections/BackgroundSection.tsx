import React from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';
import Dropdown from '@/components/settings/ui/Dropdown';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import type { BackgroundOptions } from '@/types/background';
import CustomInput from '@/components/ui/CustomInput';
import SliderSwitch from '@/components/ui/SliderSwitch';

const BackgroundSection = React.memo(() => {
  const {
    selectedBackground,
    setSelectedBackground,
    backgroundOptions,
    setBackgroundOptions,
    isDynamicColor,
    setIsDynamicColor,
  } = useBackgroundContext();

  const [selectedValue, setSelectedValue] =
    React.useState<BackgroundOptions>(selectedBackground);

  const handleSelect = (value: BackgroundOptions) => {
    setSelectedValue(value);
  };

  const backgroundOption: { label: string; value: BackgroundOptions }[] = [
    { label: 'Animated', value: 'animated' },
    { label: 'Static', value: 'static' },
    { label: 'Solid', value: 'solid' },
  ];

  React.useEffect(
    () => setSelectedBackground(selectedValue),
    [selectedValue, setSelectedBackground]
  );

  // Handle general input changes (for non-color properties)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let newValue = e.target.value.trim();

    if (name === 'opacity' || name === 'brightness' || name === 'contrast') {
      newValue = `${Number.parseFloat(newValue)}`;
    } else if (name === 'blur') {
      newValue = newValue.replace(/[^0-9.]/g, '');
      newValue = `${newValue}px`;
    }

    setBackgroundOptions((prevOptions) => ({
      ...prevOptions,
      [selectedBackground]: {
        ...prevOptions[selectedBackground],
        [name]: newValue,
      },
    }));
  };

  return (
    <>
      <SettingsCard
        title='Set Background'
        selectedValue={
          selectedBackground === 'animated'
            ? 'Animated Background'
            : selectedBackground === 'solid'
            ? 'Solid Background'
            : selectedBackground === 'static'
            ? 'Static Background'
            : undefined
        }
      >
        <div>
          <Dropdown
            options={backgroundOption}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            label='Select an option'
          />
        </div>
      </SettingsCard>
      {Object.entries(backgroundOptions[selectedBackground]).map(
        ([key, value]) => (
          <SettingsCard key={key} title={`Set ${key}`}>
            <CustomInput
              name={key}
              type={
                key === 'opacity' ||
                key === 'brightness' ||
                key === 'contrast' ||
                key === 'saturation'
                  ? 'number'
                  : key === 'blur'
                  ? 'text'
                  : 'text'
              }
              placeholder={
                key === 'bgColor'
                  ? 'Value In Hex or Rgb'
                  : key === 'color'
                  ? 'Value In Hex or Rgb'
                  : key === 'opacity'
                  ? 'Value between 0 and 1'
                  : key === 'brightness'
                  ? 'Value between 0 and 2'
                  : key === 'contrast'
                  ? 'Value between 0 and 2'
                  : key === 'blur'
                  ? 'Value with px unit'
                  : 'Value In Hex or Rgb'
              }
              value={value || ''}
              step={
                key === 'opacity' || key === 'brightness' || key === 'contrast'
                  ? 0.01
                  : undefined
              }
              onChange={handleInputChange}
            />
          </SettingsCard>
        )
      )}
      <SettingsCard title='Dynamic Color (Experimental)'>
        <SliderSwitch
          currentValue={isDynamicColor}
          onChange={(value) => setIsDynamicColor(value)}
        />
      </SettingsCard>
    </>
  );
});

export default BackgroundSection;
