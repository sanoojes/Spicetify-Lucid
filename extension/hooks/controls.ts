import appSettingsStore from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { isWindows } from '@utils/platformUtils.ts';

function getZoom() {
  const zoom = Math.round((window.outerHeight / window.innerHeight) * 100) / 100;
  const inverseZoom = Math.round((window.innerHeight / window.outerHeight) * 100) / 100;
  return { zoom, inverseZoom };
}
const isV46Above = Spicetify?.Platform?.version >= '1.2.46';

function mountTransparentWindowControls(height: number) {
  const { zoom, inverseZoom } = getZoom();

  const normalHeight = height === 0 ? 1 : height || (isV46Above ? 32 : 64);

  const transparentStyles = lazyLoadStyleById('transparent-controls');

  if (normalHeight === 0) {
    transparentStyles.textContent = `
:root {--zoom: ${zoom};--inverse-zoom: ${inverseZoom};}
body::after {content: ""; height: 0; width: 0; position: fixed; top: 0; right: 0;}`;
    return;
  }

  const controlWidth = Math.round(135 * inverseZoom);
  const scaledHeight = height / zoom;
  const minHeight = 32 / zoom;
  const topOffset = isV46Above ? (scaledHeight - Math.min(minHeight, scaledHeight)) / 2 : 0;
  const controlHeight = normalHeight / zoom - topOffset * 2;

  transparentStyles.textContent = `
:root {--zoom: ${zoom};--inverse-zoom: ${inverseZoom};}
body:after {content: ""; height: var(--control-height, ${controlHeight}px); width: var(--control-width, ${controlWidth}px); position: fixed; top: ${topOffset}px; right: 0; -webkit-backdrop-filter: brightness(2.1); backdrop-filter: brightness(2.1); pointer-events: none;}
html[dir="rtl"] body:after{left: 0;right: inherit}
body.hide-transparent-controls:after{display: none; content: none;}`;
}

async function updateTitlebarHeight(height: number) {
  await Spicetify?.Platform?.ControlMessageAPI?._updateUiClient?.updateTitlebarHeight({ height });
  await Spicetify?.Platform?.UpdateAPI?._updateUiClient?.updateTitlebarHeight({ height });
  await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
    type: 'update_titlebar',
    height: `${height}px`,
  });
}

function mountControls(height = appSettingsStore.getState().control.height) {
  updateTitlebarHeight(height)
    .then(() => mountTransparentWindowControls(height))
    .catch((err) => console.error('Failed to update titlebar:', err));
}

function intervalCall() {
  const intervalId = setInterval(() => mountControls(), 300);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 10000);
}

export default () => {
  if (isWindows()) {
    mountControls();
    intervalCall();
    window.addEventListener('resize', intervalCall);
    document.addEventListener('fullscreenchange', () => {
      document.body.classList.toggle(
        'hide-transparent-controls',
        document.fullscreenElement !== null
      );
    });
    appSettingsStore.subscribe((state) => mountControls(state.control.height), 'control');
  }
};
