import { createElement } from '@utils/dom/createElement.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { waitForElement } from '@utils/dom/waitForElement.ts';
import {
  MAIN_ENTITY_HEADER_GRADIENT_SELECTOR,
  SCROLL_SELECTOR,
  UNDER_MAIN_VIEW_SELECTOR,
} from '@app/constant.ts';
import { showNotification } from '@utils/showNotification.ts';
import { extractUrl } from '@utils/dom/extractUrl.ts';
import { getArtworkBySpotifyURL } from '@utils/artworkUtils.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import appSettingsStore from '@store/setting.ts';
import type { PageOptions } from '@app/types/settings.ts';

const UMV_MAIN_CLASS = 'lucid-umv-wrapper';
const UMV_CLASS = 'umv';
const UMV_IMAGE_CLASS = 'umv-img';
const UMV_STYLE_ID = 'lucid-umv';
const SCROLL_INDICATOR_STYLE_ID = 'lucid-scroll';

const umvMainElem = createElement('div', { className: UMV_MAIN_CLASS });
const imgWrapperElem = createElement('div', {
  className: UMV_CLASS,
});
const umvImgElem = createElement('div', { className: UMV_IMAGE_CLASS });

function mountScrollIndicator() {
  waitForElement([SCROLL_SELECTOR], ([scrollElem]) => {
    if (!scrollElem) {
      showNotification('Lucid: No scroll element found.', true);
      return;
    }

    if (typeof imgWrapperElem === 'undefined' || !imgWrapperElem) {
      showNotification('Lucid: imgWrapperElem is not defined.', true);
      return;
    }

    const styleElement = lazyLoadStyleById(SCROLL_INDICATOR_STYLE_ID);
    if (!styleElement) {
      showNotification('Lucid: Failed to load scroll indicator style.', true);
      return;
    }
    styleElement.textContent = `
      @property --scroll-top {
        syntax: '<length>';
        inherits: false;
        initial-value: 0;
      }
      @property --scroll-coefficient {
        syntax: '<number>';
        inherits: false;
        initial-value: 0;
      }
    `;

    let isReadyForTrigger = true;

    scrollElem.addEventListener('scrollend', () => {
      isReadyForTrigger = true;
    });

    scrollElem.addEventListener('scroll', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const scrollTop = target.scrollTop;
      if (scrollTop > window.innerHeight) return;

      imgWrapperElem.style.setProperty('--scroll-top', `-${Math.round(scrollTop)}px`);
      imgWrapperElem.style.setProperty(
        '--scroll-coefficient',
        `${Math.min(1, Math.max(0, scrollTop / window.innerHeight))}`
      );

      if (isReadyForTrigger) {
        (document.querySelector('#main') as HTMLElement | null)?.style.setProperty(
          '--scroll-trigger-px',
          `${Math.random().toFixed(1)}px`
        );

        isReadyForTrigger = false;
      }
    });
  });
}

function injectUMVStyles() {
  lazyLoadStyleById(UMV_STYLE_ID).innerHTML = `
.under-main-view { display: none; }
.main-entityHeader-container.main-entityHeader-withBackgroundImage{
  height: calc(100cqh - var(--umv-offset) - 1rem);
}
.main-entityHeader-container{ height: 40cqh; }
.main-entityHeader-backgroundColor,.main-actionBarBackground-background { background: none !important;}
.playlist-playlist-playlistContent,.EmeHQXR87mUskYK6xEde { background-color: rgba(var(--clr-surface-1-rgb),.5) !important; }
.${UMV_MAIN_CLASS} .${UMV_CLASS} {height: 50cqh;width: 100%;position: absolute;z-index: -1;inset: 0}
.${UMV_MAIN_CLASS} .${UMV_CLASS}.expanded,
body[npb-is-floating] .main-entityHeader-container.main-entityHeader-withBackgroundImage{height: calc(100cqh - var(--umv-offset))}
.${UMV_IMAGE_CLASS} {height: 100%;width: 100%;object-fit: contain;border: none;box-shadow: none;background-image: none;transition: background-image .3s ease-in-out;background-position: center center;background-repeat: no-repeat;background-size: cover;-webkit-mask-image: linear-gradient(rgb(0, 0, 0) 35cqh, rgba(0, 0, 0, 0) 100%);mask-image: linear-gradient(rgb(0, 0, 0) 35cqh, rgba(0, 0, 0, 0) 100%)}
.normal .${UMV_IMAGE_CLASS}{background-image: var(--page-img-url);filter: var(--normal-filter)}
.custom .${UMV_IMAGE_CLASS}{background-image: var(--custom-img-url);filter: var(--custom-filter)}
.expanded .${UMV_IMAGE_CLASS}{background-image: var(--umv-img-url);filter: var(--expanded-filter);-webkit-mask-image: none;mask-image: none}
`;
}

function applyUMVOptions(settings = appSettingsStore.getState().pages.umv) {
  imgWrapperElem.style.transform = `translate3d(0px,${settings.isScroll ? 'var(--scroll-top)' : '0px'},0px) scale(${settings.isScaling ? 'calc(1 + var(--scroll-coefficient))' : '1'})`;
  imgWrapperElem.style.filter = 'blur(calc(16px * var(--scroll-coefficient)))';

  for (const key in settings.options) {
    const option = settings.options[key as keyof PageOptions];

    umvMainElem.style.setProperty(`--${key}-filter`, serializeCSSFilters(option.filter ?? {}));

    if (key === 'custom') {
      // @ts-ignore Url will be there if its custom
      umvImgElem.style.setProperty('--custom-img-url', `url(${option?.url ?? ''})`);
    }
    imgWrapperElem.classList.toggle('custom', settings.type === 'custom');
  }
}

function setupSettingsListener() {
  const updateUMVFromSettings = (state = appSettingsStore.getState()) => {
    applyUMVOptions(state.pages.umv);
  };
  appSettingsStore.subscribe(updateUMVFromSettings, 'pages.umv');
  updateUMVFromSettings();
}

function observePageChanges() {
  const handlePageChange = async (url = Spicetify?.Platform?.History?.location) => {
    if (url?.pathname) {
      const pageURL = await getArtworkBySpotifyURL(url.pathname);
      imgWrapperElem.classList.toggle('normal', !!pageURL);
      umvImgElem.style.setProperty('--page-img-url', `url("${pageURL}")`);
    }
  };
  handlePageChange();

  Spicetify.Platform?.History?.listen(async (url: { pathname: string } | null) => {
    await handlePageChange(url);
  });
}

function observeUMVVisibility() {
  const targetNode = document.querySelector(UNDER_MAIN_VIEW_SELECTOR);
  if (!targetNode) {
    console.warn(
      `Element "${UNDER_MAIN_VIEW_SELECTOR}" not found. UMV visibility observation will not work.`
    );
    return;
  }

  const observerCB: MutationCallback = () => {
    const gradientElement = targetNode.querySelector(
      MAIN_ENTITY_HEADER_GRADIENT_SELECTOR
    ) as HTMLElement;

    imgWrapperElem.classList.remove('expanded');

    if (gradientElement) {
      const underMainViewURL = extractUrl(gradientElement.style.backgroundImage);
      if (underMainViewURL) {
        imgWrapperElem.classList.add('expanded');
        umvImgElem.style.setProperty('--umv-img-url', `url(${underMainViewURL})`);
      }
    } else {
      umvImgElem.style.removeProperty('--umv-img-url');
    }
  };

  const observer = new MutationObserver(observerCB);

  observer.observe(targetNode, {
    childList: true,
    subtree: true,
  });
}

function addUMVToDOM() {
  const underMainViewParent = document.querySelector('.under-main-view')?.parentElement;
  if (underMainViewParent) {
    underMainViewParent.prepend(umvMainElem);
  } else {
    document.querySelector('.main-view-container')?.prepend(umvMainElem);
  }
}

export function initUMV() {
  mountScrollIndicator();
  injectUMVStyles();
  addUMVToDOM();

  imgWrapperElem.appendChild(umvImgElem);
  umvMainElem.appendChild(imgWrapperElem);

  setupSettingsListener();
  observePageChanges();
  observeUMVVisibility();
}
