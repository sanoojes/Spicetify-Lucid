import React from 'react';
import { saveColors, removeColors } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/useSettingsStore';
import { logToConsole } from '@/utils/logUtils';
import { useLucidStore } from '@/store/useLucidStore';

const DynamicBackground = React.memo(() => {
  const { isDynamicColor } = useSettingsStore();
  const { artworkData } = useLucidStore();
  const styleRef = React.useRef<HTMLStyleElement | null>(null);

  React.useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.id = 'lucid_dynamic_colors';
      document.head.appendChild(styleRef.current);
    }

    removeColors(styleRef.current);

    const updateColors = async () => {
      if (styleRef.current && artworkData.nowPlayingArtURL && isDynamicColor) {
        await saveColors(
          styleRef.current,
          isDynamicColor,
          artworkData.nowPlayingArtURL
        );
        logToConsole('Dynamic colors updated!');
      }
    };

    updateColors();
  }, [isDynamicColor, artworkData.nowPlayingArtURL]);

  return <div id='dynamic-colors' />;
});

export default DynamicBackground;
