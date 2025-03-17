import { npvState } from '@store/npv.ts';
import appSettingsStore from '@store/setting.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { showNotification } from '@utils/showNotification.ts';
import { alphaToHex } from '@utils/colors/convert.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import { getImageData } from '@app/imageDb.ts';

let backgroundWrapper = document.querySelector('lucid-bg-wrapper');
let backgroundElem: HTMLDivElement | null = backgroundWrapper?.querySelector(
  'lucid-bg'
) as HTMLDivElement | null;
let staticBgImage: HTMLImageElement | null = null;
let solidBgElem: HTMLDivElement | null = null;
let animatedBgWrapper: HTMLDivElement | null = null;

const setSolidBg = () => {
  staticBgImage = null;
  animatedBgWrapper = null;
  if (!backgroundElem) addBgToDOM();
  if (!solidBgElem && backgroundElem) {
    solidBgElem = createElement('div', {
      className: 'solid-bg',
      style: {
        backgroundColor: 'var(--solid-bg-color, var(--clr-surface))',
        height: '100%',
        width: '100%',
      },
    });
    backgroundElem.innerHTML = '';
    backgroundElem.appendChild(solidBgElem);
  }
};

const setStaticBg = () => {
  solidBgElem = null;
  animatedBgWrapper = null;
  if (!backgroundElem) addBgToDOM();
  if (!staticBgImage && backgroundElem) {
    staticBgImage = createElement('img', {
      className: 'static-bg',
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        filter: 'var(--static-bg-filter)',
      },
    });

    backgroundElem.innerHTML = '';
    backgroundElem.appendChild(staticBgImage);
  }
};

const setAnimatedBg = () => {
  staticBgImage = null;
  solidBgElem = null;
  if (!backgroundElem) addBgToDOM();
  if (!animatedBgWrapper && backgroundElem) {
    animatedBgWrapper = createElement('div', {
      className: 'animated-bg-wrapper',
      style: {
        position: 'relative',
        height: '100%',
        width: '100%',
      },
    });

    backgroundElem.innerHTML = `
<style>
.img{ position: absolute; border-radius: 20em; width: 200%; animation: animBg 40s linear infinite;}
.img-0 { right: 30%; top: 0; z-index: 2 }
.img-1 { animation-direction: reverse; bottom: 0; left: 0; z-index: 1}
.img-2 { animation-direction: reverse; right: -50%; top: -20%; width: 300%; z-index: 0 }
@keyframes animBg { 0% { transform: rotate(0deg) translate3d(0px,0px,0px); } to { transform: rotate(1turn) translate3d(0px,0px,0px); } }
</style>
`;
    for (let i = 0; i < 3; i++) {
      const imageDiv = createElement('img', {
        className: `img img-${i}`,
        style: {
          willChange: 'transform',
          backgroundImage: 'url(var(--image-url))',
        },
      });
      animatedBgWrapper.appendChild(imageDiv);
    }

    backgroundElem.appendChild(animatedBgWrapper);
  }
};

const setBackground = (settings = appSettingsStore.getState()) => {
  const background = settings.background;
  switch (background.mode) {
    case 'solid': {
      if (!solidBgElem) setSolidBg();

      const { hex, alpha } = background.options.solid.color;
      solidBgElem?.style.setProperty('--solid-bg-color', `${hex}${alphaToHex(alpha)}`);
      break;
    }
    case 'static': {
      if (!staticBgImage) setStaticBg();
      if (!staticBgImage) return;

      const { filter, isCustomImage } = background.options.static;

      if (isCustomImage) {
        staticBgImage.setAttribute('custom-image', '');
      } else {
        staticBgImage.removeAttribute('custom-image');
      }

      staticBgImage.style.setProperty('--static-bg-filter', serializeCSSFilters(filter));
      reloadImage();
      break;
    }
    case 'animated': {
      if (!animatedBgWrapper) setAnimatedBg();
      if (!animatedBgWrapper) return;

      const { filter } = background.options.animated;
      if (animatedBgWrapper) {
        animatedBgWrapper.style.filter = serializeCSSFilters(filter);
      }
      reloadImage();
      break;
    }
    default: {
      console.error('Unexpected background mode:', background.mode);
      showNotification('Unexpected error setting background.');
      break;
    }
  }
};

const setImage = (imageUrl: string) => {
  if (backgroundElem && imageUrl) {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      if (!backgroundElem) {
        addBgToDOM();
      }
      if (staticBgImage) staticBgImage.src = imageUrl ?? '';
      if (animatedBgWrapper) {
        const elems = animatedBgWrapper.querySelectorAll('img');
        for (const elem of elems) {
          elem.src = imageUrl ?? '';
        }
      }
    };
  }
};

const addBgToDOM = () => {
  if (!backgroundWrapper) {
    backgroundWrapper = createElement('div', {
      className: 'lucid-bg-wrapper',
      style: {
        display: 'block',
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: '-1',
        top: '0',
        left: '0',
        overflow: 'hidden',
      },
    });
    const mainElement = document.getElementById('main');
    (mainElement ?? document.body).prepend(backgroundWrapper);
  }

  if (!backgroundElem) {
    backgroundElem = createElement('div', {
      className: 'lucid-bg',
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      },
    });
    backgroundWrapper.prepend(backgroundElem);
  }
};

export const reloadImage = async () => {
  const settings = appSettingsStore.getState();
  if (settings.background.mode === 'solid') return;

  let imageUrl: string | null = '';

  if (settings.background.options.static.isCustomImage) {
    if (settings.customImage.type === 'local') {
      imageUrl = await getImageData();
    } else {
      imageUrl = settings.customImage.options.url.data;
    }
  } else {
    imageUrl = npvState.getState().url;
  }
  setImage(imageUrl ?? '');
};

export function mountBackground() {
  addBgToDOM();
  setBackground();
  reloadImage();

  appSettingsStore.subscribe((state) => {
    setBackground(state);
  }, 'background');

  appSettingsStore.subscribe(() => {
    reloadImage();
  }, 'customImage.type');

  npvState.subscribe(() => {
    reloadImage();
  });
}
