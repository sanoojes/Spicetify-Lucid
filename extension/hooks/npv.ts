import appSettingsStore from '@store/setting.ts';
import { alphaToHex } from '@utils/colors/convert.ts';

function mountNPVStyles(settings = appSettingsStore.getState().rightSidebar) {
  if (settings.position) {
    document.body.setAttribute('npv-position', settings.position);
  } else document.body.removeAttribute('npv-position');
  if (settings.mode) {
    document.body.setAttribute('npv-mode', settings.mode);
  } else document.body.removeAttribute('npv-mode');

  document.body.style.setProperty('--npv-blur', `${settings.blur}px`);
  if (settings.isCustomBg)
    document.body.style.setProperty(
      '--npv-bg-color',
      `${settings.color.hex}${alphaToHex(settings.color.alpha)}`
    );
  else document.body.style.removeProperty('--npv-bg-color');

  function updateVariable(value: number) {
    document.body.style.setProperty('--npv-size', `${value}px`);
  }

  updateVariable(settings.size);
}

export function mountNPV() {
  mountNPVStyles();

  appSettingsStore.subscribe((state) => {
    mountNPVStyles(state.rightSidebar);
  }, 'rightSidebar');
}
