import React from 'react';
import { saveColors, removeColors } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/settingsStore';
import { logToConsole } from '@/utils/logUtils';

const DynamicBackground = React.memo(() => {
  const { isDynamicColor } = useSettingsStore();
  const styleRef = React.useRef<HTMLStyleElement | null>(null);

  React.useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.id = 'lucid_dynamic_colors';
      document.head.appendChild(styleRef.current);
    }

    const updateColors = async () => {
      if (styleRef.current && window.currentArtUrl && isDynamicColor) {
        await saveColors(styleRef.current, isDynamicColor);
        logToConsole('Dynamic colors updated!');
      }
    };
    setTimeout(() => updateColors(), 1000);

    if (isDynamicColor) {
      Spicetify.Player.addEventListener('songchange', updateColors);

      return () => {
        Spicetify.Player.removeEventListener('songchange', updateColors);
        if (styleRef.current) removeColors(styleRef.current);
      };
    }

    removeColors(styleRef.current);
  }, [isDynamicColor]);

  return <div id='dynamic-colors' />;
});

export default DynamicBackground;
