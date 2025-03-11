import appSettingsStore from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { isWindows } from '@utils/platformUtils.ts';

function getZoom() {
  const zoom = Math.round((window.outerHeight / window.innerHeight) * 100) / 100;
  const inverseZoom = Math.round((window.innerHeight / window.outerHeight) * 100) / 100;
  return { zoom, inverseZoom };
}
const isV46 = Spicetify?.Platform?.version >= '1.2.46';

function mountTransparentWindowControls(height: number) {
  const { zoom, inverseZoom } = getZoom();

  const ch = isV46
    ? height > 32
      ? Math.max(32, Math.round(height / (2 * zoom)))
      : height / zoom
    : height / zoom;
  const cw = Math.round(135 * inverseZoom);
  const top = isV46 ? (height / zoom - Math.min(32 / zoom, height)) / 2 : 0;

  const transparentStyles = lazyLoadStyleById('transparent-controls');
  transparentStyles.textContent = `
    body::after {
      content: "";
      height: var(--control-height, ${ch}px);
      width: var(--control-width, ${cw}px);
      position: fixed;
      top: ${top}px;
      right: 0;
      -webkit-backdrop-filter: brightness(2.1);
      backdrop-filter: brightness(2.1);
    }
  `;
}

async function updateTitlebarHeight(height: number) {
  await Spicetify?.Platform?.ControlMessageAPI?._updateUiClient?.updateTitlebarHeight({ height });
  await Spicetify?.Platform?.UpdateAPI?._updateUiClient?.updateTitlebarHeight({
    height,
  });
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

    appSettingsStore.subscribe((state) => mountControls(state.control.height), 'control');
  }
};
