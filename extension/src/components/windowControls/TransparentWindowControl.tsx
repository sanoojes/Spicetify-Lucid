import React from 'react';
import { setWindowControlsHeight } from '@/utils/windowControlUtils';
import {
  calculateBrowserZoom,
  calculateInverseBrowserZoom,
  calculateScaledPx,
} from '@/utils/zoomUtils';
import { useLucidStore } from '@/store/useLucidStore';

const TransparentWindowControl = React.memo(() => {
  const TransparentWindowControlRef = React.useRef<HTMLDivElement | null>(null);

  const { isCustomControls, rootStyle, isWindows, isLightMode } =
    useLucidStore();

  React.useEffect(() => {
    async function setTopBarStyles() {
      if (!isCustomControls && isWindows) {
        const baseHeight = 64;
        const baseWidth = 135;
        const inverseZoom = calculateInverseBrowserZoom();

        const constant = 0.912872807;

        const normalZoom = calculateBrowserZoom();

        const finalControlHeight = Math.round(
          (normalZoom ** constant * 100) / 100 - 3
        );

        await setWindowControlsHeight(finalControlHeight);

        const paddingStart = calculateScaledPx(64, inverseZoom, 1);
        const paddingEnd = calculateScaledPx(135, inverseZoom, 1);

        rootStyle.setProperty('--top-bar-padding-start', `${paddingStart}px`);
        rootStyle.setProperty('--top-bar-padding-end', `${paddingEnd}px`);

        if (isWindows && !isCustomControls && !isLightMode) {
          const controlHeight = baseHeight;
          const controlWidth = calculateScaledPx(baseWidth, inverseZoom, 1);

          if (TransparentWindowControlRef.current) {
            TransparentWindowControlRef.current.style.height = `${controlHeight}px`;
            TransparentWindowControlRef.current.style.width = `${controlWidth}px`;
          }
        }
      }
    }

    setTimeout(setTopBarStyles, 1000);
    window.addEventListener('resize', setTopBarStyles);

    return () => {
      window.removeEventListener('resize', setTopBarStyles);
    };
  }, [isCustomControls, rootStyle, isLightMode, isWindows]);

  return (
    <div
      ref={TransparentWindowControlRef}
      className='lucid-transperent-window-controls'
    />
  );
});

export default TransparentWindowControl;
