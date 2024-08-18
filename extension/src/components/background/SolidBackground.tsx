import React, { type CSSProperties } from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';
import type { CustomBackgroundStyle } from '@/types/background';

const SolidBackground = () => {
  const { backgroundOptions, selectedBackground } = useBackgroundContext();
  return (
    <div
      className='solid-background'
      style={
        {
          '--background-color': backgroundOptions[selectedBackground].bgColor,
        } as CustomBackgroundStyle
      }
    />
  );
};

export default SolidBackground;
