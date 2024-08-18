import React from 'react';
import SettingsCard from '@/components/settings/ui/SettingsCard';
import { useBackgroundContext } from '@/context/BackgroundContext';
import { useFontContext } from '@/context/FontContext';
import { useGrainContext } from '@/context/GrainContext';
import { usePlaylistViewContext } from '@/context/PlaylistViewContext';

const ResetSection = () => {
  const { resetBackgroundSettings } = useBackgroundContext();
  const { resetFontSettings } = useFontContext();
  const { resetGrainSettings } = useGrainContext();
  const { resetPlaylistViewSettings } = usePlaylistViewContext();

  const handleSettingsReset = () => {
    if (
      confirm(
        'Are you sure you want to reset all background settings to their default values? This action cannot be undone.'
      )
    ) {
      resetBackgroundSettings();
      resetFontSettings();
      resetGrainSettings();
      resetPlaylistViewSettings();
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

export default ResetSection;
