import { npvState } from '@store/npv.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { lazyLoadElementByTag } from '@utils/lazyLoadUtils.ts';
import appSettingsStore from '@store/setting.ts';
import BackgroundElement from '@components/background.ts';
import { getImage } from '@app/imageDb.ts';

let backgroundMain: BackgroundElement | null = null;
let unsubscribeNpv: (() => void) | null = null;

function handleLocalImageChange(event: Event) {
  if (backgroundMain) {
    backgroundMain.image =
      (event as CustomEvent).detail?.payload?.data ?? npvState.getState().url ?? '';
  }
}

export function mountBackground() {
  if (backgroundMain) return;

  backgroundMain = new BackgroundElement();
  const container = getBackgroundContainer();

  const setImage = (src: string) => {
    if (backgroundMain) backgroundMain.image = src;
  };

  const subscribe = () => {
    if (!unsubscribeNpv) {
      unsubscribeNpv = npvState.subscribe((state) => {
        if (
          !appSettingsStore.getState().background.options.static.isCustomImage &&
          backgroundMain
        ) {
          setImage(state.url || '');
        }
      });
    }
  };

  const unsubscribe = () => {
    if (unsubscribeNpv) {
      unsubscribeNpv();
      unsubscribeNpv = null;
    }
    window.removeEventListener('lucid-local-image-change', handleLocalImageChange);
  };

  const updateBackground = async (settings = appSettingsStore.getState()) => {
    if (!backgroundMain) return;
    const { background: bgState, customImage } = settings;
    backgroundMain.mode = bgState.mode;
    backgroundMain.setOptions(bgState.options);

    if (bgState.options.static.isCustomImage) {
      unsubscribe();
      if (customImage.type === 'url') {
        setImage(customImage.options.url.data);
      } else if (customImage.type === 'local') {
        try {
          const imageData = await getImage();
          setImage(imageData?.[0]?.data || npvState.getState().url || '');
          window.addEventListener('lucid-local-image-change', handleLocalImageChange);
        } catch {
          console.error('Error setting local image.');
        }
      }
    } else {
      subscribe();
      window.removeEventListener('lucid-local-image-change', handleLocalImageChange);
      setImage(npvState.getState().url || '');
    }
  };

  updateBackground();
  appSettingsStore.subscribe((state) => updateBackground(state), 'background');
  appSettingsStore.subscribe((state) => updateBackground(state), 'customImage');
  container.appendChild(backgroundMain);
}

function getBackgroundContainer() {
  let container = document.getElementById('lucid-bg');
  if (!container) {
    container = createElement('div');
    container.id = 'lucid-bg';
    lazyLoadElementByTag('main').prepend(container);
  }
  return container;
}
