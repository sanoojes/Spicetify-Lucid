import { npvState } from '@store/npv.ts';
import appSettingsStore from '@store/setting.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { showNotification } from '@utils/showNotification.ts';
import { alphaToHex } from '@utils/colors/convert.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import { getImageData } from '@app/imageDb.ts';

let bgWrapper = document.querySelector('lucid-bg-wrapper');
let bgElem: HTMLDivElement | null = bgWrapper?.querySelector('lucid-bg') as HTMLDivElement | null;
let staticImage: HTMLImageElement | null = null;
let solidBg: HTMLDivElement | null = null;
let animatedBg: HTMLDivElement | null = null;

const createSolidBg = () => {
  staticImage = null;
  animatedBg = null;
  if (!bgElem) ensureBgInDOM();
  if (!solidBg && bgElem) {
    solidBg = createElement('div', {
      className: 'solid-bg',
      style: {
        backgroundColor: 'var(--solid-bg-color, var(--clr-surface))',
        height: '100%',
        width: '100%',
      },
    });
    bgElem.innerHTML = '';
    bgElem.appendChild(solidBg);
  }
};

const createStaticBg = () => {
  solidBg = null;
  animatedBg = null;
  if (!bgElem) ensureBgInDOM();
  if (!staticImage && bgElem) {
    staticImage = createElement('img', {
      className: 'static-bg',
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        filter: 'var(--static-bg-filter)',
      },
    });

    bgElem.innerHTML = '';
    bgElem.appendChild(staticImage);
  }
};

const createAnimatedBg = () => {
  staticImage = null;
  solidBg = null;
  if (!bgElem) ensureBgInDOM();
  if (!animatedBg && bgElem) {
    animatedBg = createElement('div', {
      className: 'animated-bg-wrapper',
      style: {
        position: 'relative',
        height: '100%',
        width: '100%',
      },
    });

    bgElem.innerHTML = `
<style>
.img{ position: absolute; border-radius: 20em; width: 200%; animation: animBg 40s linear infinite;}
.img-0 { right: 30%; top: 0; z-index: 2 }
.img-1 { animation-direction: reverse; bottom: 0; left: 0; z-index: 1}
.img-2 { animation-direction: reverse; right: -50%; top: -20%; width: 300%; z-index: 0 }
@keyframes animBg { 0% { transform: rotate(0deg) translate3d(0px,0px,0px); } to { transform: rotate(1turn) translate3d(0px,0px,0px); } }
</style>
`;
    for (let i = 0; i < 3; i++) {
      const imgDiv = createElement('img', {
        className: `img img-${i}`,
        style: {
          willChange: 'transform',
          backgroundImage: 'url(var(--image-url))',
        },
      });
      animatedBg.appendChild(imgDiv);
    }

    bgElem.appendChild(animatedBg);
  }
};

const applyBgSettings = (settings = appSettingsStore.getState()) => {
  const background = settings.background;
  switch (background.mode) {
    case 'solid': {
      if (!solidBg) createSolidBg();

      const { hex, alpha } = background.options.solid.color;
      solidBg?.style.setProperty('--solid-bg-color', `${hex}${alphaToHex(alpha)}`);
      break;
    }
    case 'static': {
      if (!staticImage) createStaticBg();
      if (!staticImage) return;

      const { filter, isCustomImage } = background.options.static;

      if (isCustomImage) {
        staticImage.setAttribute('custom-image', '');
      } else {
        staticImage.removeAttribute('custom-image');
      }

      staticImage.style.setProperty('--static-bg-filter', serializeCSSFilters(filter));
      reloadBgImage();
      break;
    }
    case 'animated': {
      if (!animatedBg) createAnimatedBg();
      if (!animatedBg) return;

      const { filter } = background.options.animated;
      if (animatedBg) {
        animatedBg.style.filter = serializeCSSFilters(filter);
      }
      reloadBgImage();
      break;
    }
    default: {
      console.error('Unexpected background mode:', background.mode);
      showNotification('Unexpected error setting background.');
      break;
    }
  }
};

const setBgImage = (imageUrl: string) => {
  if (bgElem && imageUrl) {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      if (!bgElem) {
        ensureBgInDOM();
      }
      if (staticImage) staticImage.src = imageUrl ?? '';
      if (animatedBg) {
        const elems = animatedBg.querySelectorAll('img');
        for (const elem of elems) {
          elem.src = imageUrl ?? '';
        }
      }
    };
  }
};

const ensureBgInDOM = () => {
  if (!bgWrapper) {
    bgWrapper = createElement('div', {
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
    (mainElement ?? document.body).prepend(bgWrapper);
  }

  if (!bgElem) {
    bgElem = createElement('div', {
      className: 'lucid-bg',
      style: {
        display: 'block',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      },
    });
    bgWrapper.prepend(bgElem);
  }
};

export const reloadBgImage = async () => {
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
  setBgImage(imageUrl ?? '');
};

export function initBackground() {
  ensureBgInDOM();
  applyBgSettings();
  reloadBgImage();

  appSettingsStore.subscribe((state) => {
    applyBgSettings(state);
  }, 'background');

  appSettingsStore.subscribe(() => {
    reloadBgImage();
  }, 'customImage.type');

  npvState.subscribe(() => {
    reloadBgImage();
  });
}
