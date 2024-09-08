import React, { type FC } from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { useSettingsStore } from '@/store/useSettingsStore';

const ResetSettingsSection: FC = () => {
  const { resetSettings } = useSettingsStore();

  const handleSettingsReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all settings to their default values? This action cannot be undone.'
      )
    ) {
      resetSettings();
    }
  };

  return (
    <SettingsCard title='Reset to Default'>
      <button
        type='button'
        className='button reset-button'
        onClick={handleSettingsReset}
      >
        Reset
      </button>
    </SettingsCard>
  );
};

export default ResetSettingsSection;
