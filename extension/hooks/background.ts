import { npvState } from '@store/npv.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { lazyLoadElementByTag } from '@utils/lazyLoadUtils.ts';
import appSettingsStore from '@store/setting.ts';
import BackgroundElement from '@components/background.ts';

export function mountBackground() {
  const backgroundMain = new BackgroundElement();

  const settings = appSettingsStore.getState();
  const bgState = settings.background;
  const isCustomImage = settings.background.options.static.isCustomImage;

  backgroundMain.mode = bgState.mode;
  backgroundMain.setOptions(bgState.options);
  backgroundMain.image = isCustomImage
    ? settings.background.options.static.customImageURL
    : npvState.getState().url || '';

  let unsubscribeNpv: (() => void) | null = null;
  if (!isCustomImage) {
    unsubscribeNpv = npvState.subscribe((state) => {
      backgroundMain.image = state.url || '';
    });
  }

  appSettingsStore.subscribe((state) => {
    const updatedBg = state.background;
    const useCustom = updatedBg.options.static.isCustomImage;

    // Update mode and options regardless
    backgroundMain.mode = updatedBg.mode;
    backgroundMain.setOptions(updatedBg.options);

    if (useCustom) {
      if (unsubscribeNpv) {
        unsubscribeNpv();
        unsubscribeNpv = null;
      }
      backgroundMain.image = updatedBg.options.static.customImageURL;
    } else {
      if (!unsubscribeNpv) {
        unsubscribeNpv = npvState.subscribe((state) => {
          backgroundMain.image = state.url || '';
        });
      }
      backgroundMain.image = npvState.getState().url || '';
    }
  }, 'background');

  let backgroundContainer = document.getElementById('lucid-bg');
  if (!backgroundContainer) {
    backgroundContainer = createElement('div');
    backgroundContainer.id = 'lucid-bg';
    lazyLoadElementByTag('main').prepend(backgroundMain);
  } else {
    backgroundContainer.appendChild(backgroundMain);
  }
}
