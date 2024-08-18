import {
  calculateBrowserZoom,
  calculateInverseBrowserZoom,
  calculateScaledPx,
} from '@/utils/zoomUtils';

async function setWindowControlsHeight(height: number) {
  await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
    type: 'update_titlebar',
    height: height,
  });
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
