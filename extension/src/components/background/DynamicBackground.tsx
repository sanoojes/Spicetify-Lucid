import React from 'react';
import { saveColors, removeColors } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/settingsStore';

const DynamicBackground = () => {
  const { isDynamicColor } = useSettingsStore();

  let styleElement = document.getElementById(
    'lucid_dynamic_colors'
  ) as HTMLStyleElement | null;
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'lucid_dynamic_colors';
    document.head.appendChild(styleElement);
  }

  const songChangeHandler = () => {
    saveColors(styleElement, isDynamicColor)
      .then(() => console.log('[Lucid] Dynamic colors updated!'))
      .catch((error) =>
        console.error('[Lucid] Error updating dynamic colors:', error)
      );
  };

  React.useEffect(() => {
    if (isDynamicColor) {
      Spicetify.Player.addEventListener('songchange', songChangeHandler);
      saveColors(styleElement, isDynamicColor)
        .then(() => console.log('[Lucid] Dynamic colors applied initially!'))
        .catch((error) =>
          console.error(
            '[Lucid] Error applying dynamic colors initially:',
            error
          )
        );
      return () => {
        Spicetify.Player.removeEventListener('songchange', songChangeHandler);
        removeColors(styleElement);
      };
    }
    removeColors(styleElement);
  }, [isDynamicColor, styleElement]);

  return <div id='dynamic-colors' />;
};

export default DynamicBackground;
