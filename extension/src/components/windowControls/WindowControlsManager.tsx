import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';
import {
  calculateBrowserZoom,
  calculateInverseBrowserZoom,
  calculateScaledPx,
} from '@/utils/zoomUtils';
import TransparentWindowControl from './TransparentWindowControl';
import { setWindowControlsHeight } from '@/utils/windowControlUtils';

const WindowControlsManager = React.memo(() => {
  const { isCustomControls, rootStyle, isWindows, isLightMode } =
    useLucidStore();

  React.useEffect(() => {
    async function setTopBarStyles() {
      if (!isCustomControls) {
        const baseHeight = 64;
        const baseWidth = 135;
        const constant = 0.912872807;

        const normalZoom = calculateBrowserZoom();
        const inverseZoom = calculateInverseBrowserZoom();

        const finalControlHeight = Math.round(
          (normalZoom ** constant * 100) / 100 - 3
        );

        await setWindowControlsHeight(finalControlHeight);

        const paddingStart = calculateScaledPx(64, inverseZoom, 1);
        const paddingEnd = calculateScaledPx(baseWidth, inverseZoom, 1);

        rootStyle.setProperty('--top-bar-padding-start', `${paddingStart}px`);
        rootStyle.setProperty('--top-bar-padding-end', `${paddingEnd}px`);

        if (isWindows && !isCustomControls && !isLightMode) {
          const controlHeight = baseHeight;
          const controlWidth = calculateScaledPx(baseWidth, inverseZoom, 1);

          rootStyle.setProperty('--control-height', `${controlHeight}px`);
          rootStyle.setProperty('--control-width', `${controlWidth}px`);
        }
      }
    }

    setTopBarStyles();
    window.addEventListener('resize', setTopBarStyles);

    return () => {
      window.removeEventListener('resize', setTopBarStyles);
    };
  }, [isCustomControls, rootStyle, isLightMode, isWindows]);

  return (
    <>
      {isWindows ? (
        <div
          id='transperent-controls-container'
          className='transperent-controls-container'
          style={{ containerType: 'normal' }}
        >
          <TransparentWindowControl />
        </div>
      ) : null}
    </>
  );
});

export default WindowControlsManager;
