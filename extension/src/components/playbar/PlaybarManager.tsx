import React from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import type { CustomCSSProperties } from '@/types/settingTypes';

const PlaybarManager = () => {
  const { playbarMode, playbarStyles } = useSettingsStore();

  React.useEffect(() => {
    document.body.classList.add(`playbar-${playbarMode}`);

    return () => {
      document.body.classList.remove(`playbar-${playbarMode}`);
    };
  }, [playbarMode]);

  const [dynamicStyle, setDynamicStyle] = React.useState<CustomCSSProperties>(
    {}
  );

  React.useEffect(() => {
    const newDynamicStyle = {
      '--background-color': playbarStyles[playbarMode]?.backgroundColor,
      '--opacity': playbarStyles[playbarMode]?.opacity,
      '--brightness': playbarStyles[playbarMode]?.brightness,
      '--contrast': playbarStyles[playbarMode]?.contrast,
      '--padding-x': `${playbarStyles[playbarMode]?.paddingX || 0}px`,
      '--padding-y': `${playbarStyles[playbarMode]?.paddingY || 0}px`,
      '--time': `${playbarStyles[playbarMode]?.time || 0}s`,
      '--blur': `${playbarStyles[playbarMode]?.blur || 0}px`,
      '--border-radius': `${playbarStyles[playbarMode]?.borderRadius || 8}px`,
      '--saturation': playbarStyles[playbarMode]?.saturation,
      '--backdrop-blur': `${playbarStyles[playbarMode]?.backdropBlur || 0}px`,
    };

    setDynamicStyle(newDynamicStyle);

    const rootPlaybar = document.querySelector(
      '.Root__now-playing-bar'
    ) as HTMLElement | null;

    if (rootPlaybar) {
      rootPlaybar.style.cssText = Object.entries(newDynamicStyle)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
    } else {
      console.error('Playbar element not found!');
    }
  }, [playbarMode, playbarStyles]);

  return <div id='playbar-styles' style={dynamicStyle} />;
};

export default PlaybarManager;
