import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { useSettingsStore } from '@/store/settingsStore';

const ResetSettingsSection = () => {
  const { resetSettings } = useSettingsStore();

  const handleSettingsReset = () => {
    if (
      confirm(
        'Are you sure you want to reset all background settings to their default values? This action cannot be undone.'
      )
    ) {
      resetSettings();
    }
  };

  return (
    <div>
      <SettingsCard title={'Reset to Default'}>
        <button
          type='button'
          className='button reset-button'
          onClick={handleSettingsReset}
        >
          Reset
        </button>
      </SettingsCard>
    </div>
  );
};

export default ResetSettingsSection;
