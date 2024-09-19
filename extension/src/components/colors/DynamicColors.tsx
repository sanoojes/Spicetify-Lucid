import React from 'react';
import { saveColors, removeColors } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useLucidStore } from '@/store/useLucidStore';
import { logToConsole } from '@/utils/logUtils';

const DynamicBackground = React.memo(() => {
  const { isDynamicColor } = useSettingsStore();
  const { artworkData } = useLucidStore();
  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const prevArtURL = React.useRef<string | null>(null);

  React.useEffect(() => {
    styleRef.current = document.createElement('style');
    styleRef.current.id = 'lucid_dynamic_colors';
    document.head.appendChild(styleRef.current);

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isDynamicColor) {
      if (styleRef.current) {
        removeColors(styleRef.current);
      }

      if (prevArtURL.current) {
        prevArtURL.current = null;
      }

      return;
    }

    if (isDynamicColor && artworkData.nowPlayingArtURL !== prevArtURL.current) {
      if (styleRef?.current && isDynamicColor && artworkData.nowPlayingArtURL) {
        saveColors(
          styleRef.current,
          isDynamicColor,
          artworkData.nowPlayingArtURL
        )
          .then(() => {
            logToConsole('Dynamic colors updated!', { level: 'info' });
          })
          .catch((error) => {
            logToConsole('Error updating colors:', { level: 'error' }, error);
          });
      }

      prevArtURL.current = artworkData.nowPlayingArtURL;
    }
  }, [isDynamicColor, artworkData.nowPlayingArtURL]);

  return <div id='dynamic-colors' />;
});

export default DynamicBackground;
