import React from 'react';
import { saveColors, removeColors } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/settingsStore';

const DynamicBackground = () => {
  const { isDynamicColor } = useSettingsStore();
  const styleRef = React.useRef<HTMLStyleElement | null>(null);

  Spicetify.React.useEffect(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      styleRef.current.id = 'lucid_dynamic_colors';
      document.head.appendChild(styleRef.current);
    }

    const updateColors = async () => {
      try {
        if (styleRef.current && window.currentArtUrl) {
          await saveColors(styleRef.current, isDynamicColor);
          console.log('[Lucid] Dynamic colors updated!');
        }
      } catch (error) {
        console.error('[Lucid] Error updating dynamic colors:', error);
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
};

export default DynamicBackground;
