import React from 'react';
import StaticBackground from '@/components/background/StaticBackground';
import AnimatedBackground from '@/components/background/AnimatedBackground';
import SolidBackground from '@/components/background/SolidBackground';
import { useSettingsStore } from '@/store/useSettingsStore';
import type { CustomCSSProperties } from '@/types/settingTypes';
import { logDebug } from '@/utils/logUtils';

/**
 * Renders Background and Manages Background Styles
 */
const BackgroundManager = React.memo(() => {
  logDebug('Render <BackgroundManager />');

  const { backgroundMode, backgroundStyles } = useSettingsStore();

  const [dynamicStyle, setDynamicStyle] = React.useState<CustomCSSProperties>(
    {}
  );

  React.useEffect(() => {
    setDynamicStyle({
      '--background-color': backgroundStyles[backgroundMode]?.backgroundColor,
      '--opacity': backgroundStyles[backgroundMode]?.opacity,
      '--brightness': backgroundStyles[backgroundMode]?.brightness,
      '--contrast': backgroundStyles[backgroundMode]?.contrast,
      '--time': `${backgroundStyles[backgroundMode]?.time || 0}s`,
      '--blur': `${backgroundStyles[backgroundMode]?.blur || 0}px`,
      '--saturation': backgroundStyles[backgroundMode]?.saturation,
      '--backdrop-blur': `${
        backgroundStyles[backgroundMode]?.backdropBlur || 0
      }px`,
    });
  }, [backgroundMode, backgroundStyles]);

  return (
    <div className='background-wrapper' style={dynamicStyle}>
      {backgroundMode === 'animated' && <AnimatedBackground />}
      {backgroundMode === 'static' && <StaticBackground />}
      {backgroundMode === 'solid' && <SolidBackground />}
    </div>
  );
});

export default BackgroundManager;
