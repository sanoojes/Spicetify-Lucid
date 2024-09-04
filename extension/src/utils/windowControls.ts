import {
  calculateBrowserZoom,
  calculateInverseBrowserZoom,
  calculateScaledPx,
} from '@/utils/zoomUtils';
import { logToConsole } from '@/utils/logUtils';

async function setWindowControlsHeight(height: number) {
  try {
    if (Spicetify?.CosmosAsync?.post)
      await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
        type: 'update_titlebar',
        height: height,
      });

    logToConsole(`Control height set to ${height}px`);
  } catch (error) {
    logToConsole(`Error setting control height: ${height}`, { level: 'error' });
  }
}

export async function setTopBarStyles() {
  if (!window.isCustomControls) {
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

    window.rootStyle.setProperty(
      '--top-bar-padding-start',
      `${paddingStart}px`
    );
    window.rootStyle.setProperty('--top-bar-padding-end', `${paddingEnd}px`);

    if (window.isWindows && !window.isCustomControls && !window.isLightMode) {
      const controlHeight = baseHeight;

      const controlWidth = calculateScaledPx(baseWidth, inverseZoom, 1);

      window.rootStyle.setProperty('--control-height', `${controlHeight}px`);
      window.rootStyle.setProperty('--control-width', `${controlWidth}px`);
    }
  }
}

export async function checkForCustomControls() {
  if (document.getElementById('customControls')) {
    window.isCustomControls = true;
    document.querySelector('.lucid-transperent-window-controls')?.remove();
  }
}
