import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';
import { useSettingsStore } from '@/store/useSettingsStore';

const StaticBackground = () => {
  const { customBackgroundURL, isCustomBackground } = useSettingsStore();
  const { artworkData } = useLucidStore();

  const backgroundImage = isCustomBackground
    ? customBackgroundURL || ''
    : artworkData?.nowPlayingArtURL || '';

  return (
    <div
      className='static-background'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );
};

export default StaticBackground;
