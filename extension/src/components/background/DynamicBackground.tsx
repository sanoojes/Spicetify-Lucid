import React, { useEffect } from 'react';
import { useBackgroundContext } from '@/context/BackgroundContext';
import { saveColors, removeColors } from '@/utils/colorUtils';

const DynamicBackground = () => {
  const { isDynamicColor } = useBackgroundContext();

  let styleElement = document.getElementById(
    'lucid_dynamic_colors'
  ) as HTMLStyleElement | null;
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'lucid_dynamic_colors';
    document.head.appendChild(styleElement);
  }

  React.useEffect(() => {
    if (isDynamicColor) {
      const songChangeHandler = () => {
        saveColors(styleElement, isDynamicColor)
          .then(() => console.log('[Lucid] Dynamic colors updated!'))
          .catch((error) =>
            console.error('[Lucid] Error updating dynamic colors:', error)
          );
      };
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
