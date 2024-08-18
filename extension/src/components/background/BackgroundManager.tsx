import React from 'react';
import StaticBackground from '@/components/background/StaticBackground';
import AnimatedBackground from '@/components/background/AnimatedBackground';
import SolidBackground from '@/components/background/SolidBackground';
import { useBackgroundContext } from '@/context/BackgroundContext';
import type { CustomBackgroundStyle } from '@/types/background';
import DynamicBackground from '@/components/background/DynamicBackground';

const BackgroundManager = () => {
  const { selectedBackground, backgroundOptions } = useBackgroundContext();

  const [dynamicStyle, setDynamicStyle] = React.useState<CustomBackgroundStyle>(
    {}
  );

  React.useEffect(() => {
    setDynamicStyle({
      '--background-color': backgroundOptions[selectedBackground].bgColor,
      '--opacity': backgroundOptions[selectedBackground].opacity,
      '--brightness': backgroundOptions[selectedBackground].brightness,
      '--contrast': backgroundOptions[selectedBackground].contrast,
      '--time': backgroundOptions[selectedBackground].time,
      '--blur': backgroundOptions[selectedBackground].blur,
      '--saturation': backgroundOptions[selectedBackground].saturation,
      '--backdrop-blur': backgroundOptions[selectedBackground].backdropBlur,
    });
  }, [selectedBackground, backgroundOptions]);

  return (
    <div className='background-wrapper' style={dynamicStyle}>
      {selectedBackground === 'animated' && <AnimatedBackground />}
      {selectedBackground === 'static' && <StaticBackground />}
      {selectedBackground === 'solid' && <SolidBackground />}
      <DynamicBackground />
    </div>
  );
};

export default BackgroundManager;
