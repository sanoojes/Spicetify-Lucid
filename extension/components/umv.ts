import { createElement } from '@utils/dom/createElement.ts';
import { getArtworkBySpotifyURL } from '@utils/artworkUtils.ts';
import appSettingsStore from '@store/setting.ts';
import type { PageOptions, PageSettings, PageType } from '@app/types/settings.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import { extractUrl } from '@utils/dom/extractUrl.ts';
import { waitForElement } from '@utils/dom/waitForElement.ts';

const SCROLL_SELECTOR =
  '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]';

export class UMVImageElement extends HTMLElement {
  imgElement: HTMLImageElement;
  transitionDuration = 0.3;
  filter = 'blur(0px)';

  constructor(imageSrc?: string) {
    super();

    if (imageSrc) this.imageSrc = imageSrc;

    this.imgElement = createElement('img', {
      className: 'umv-img',
      style: {
        filter: this.filter,
      },
    });

    this.append(this.imgElement);
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.imgElement.style.filter = filter;
  }

  set imageSrc(imageSrc: string | null) {
    if (!imageSrc || imageSrc.trim() === '') {
      return;
    }
    if (this.imageSrc === imageSrc) return;

    const preloader = new Image();
    preloader.onload = () => {
      this._performTransition(imageSrc);
    };
    preloader.onerror = () => {
      console.error('Failed to load image:', imageSrc);
    };
    preloader.src = imageSrc;
  }

  private _performTransition(src: string) {
    if (this.imgElement.src === src) return;
    const newElement = createElement('img', {
      style: {
        width: '110%',
        height: '110%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translate3d(0px,0px,0px)',
        transition: `opacity ${this.transitionDuration}s ease-in-out`,
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        opacity: '0',
        objectFit: 'cover',
        filter: this.filter,
      },
    });
    newElement.src = src;
    this.appendChild(newElement);

    newElement.style.opacity = '1';

    setTimeout(() => {
      this.removeChild(this.imgElement);
      this.imgElement = newElement;
      this.unhideImage();
    }, this.transitionDuration * 1000);
  }

  hideImage() {
    this.imgElement.style.opacity = '0';
  }
  unhideImage() {
    this.imgElement.style.opacity = '1';
  }
}

customElements.define('umv-image', UMVImageElement);

export class UnderMainViewElement extends HTMLElement {
  private umvImage: UMVImageElement;
  private scrollElement: HTMLDivElement | null = null;
  private scrollTimeout: number | null = null;
  private mainView: HTMLElement | null = null;
  scrolling = false;
  scaling = false;
  options: PageOptions | null = null;

  constructor() {
    super();

    waitForElement(['.Root__main-view'], ([element]) => {
      if (element) this.mainView = element;
    });

    const umvStyles = lazyLoadStyleById('umv-overrides');

    waitForElement(['.Root__now-playing-bar', '.Root__globalNav'], ([playbar, nav]) => {
      document.body.style.setProperty(
        '--umv-offset',
        `${(playbar?.clientHeight || 80) + (nav?.clientHeight || 0)}px`
      );
    });

    umvStyles.textContent = `
		.under-main-view { display: none; }
        umv-container { width: 100%; display: block; position: absolute; inset: 0px; height: 50cqh; -webkit-mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%); mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%); transform: translate3d(0px, 0px, 0px) scale(1); will-change:transform;}
        umv-container[type="expanded"] { height: calc(100cqh - var(--umv-offset,526)); transform: translate3d(0px, 0px, 0px) scale(1); -webkit-mask-image: none; mask-image: none; }
		.main-entityHeader-container.main-entityHeader-withBackgroundImage{ height: calc(100cqh - var(--umv-offset) - 1rem);}
		body[npb-is-floating] .main-entityHeader-container.main-entityHeader-withBackgroundImage{ height: calc(100cqh - var(--umv-offset));}
		.main-entityHeader-container{ height: 40cqh; }
		.main-entityHeader-backgroundColor,.main-actionBarBackground-background { background: none !important;}
		.playlist-playlist-playlistContent,.EmeHQXR87mUskYK6xEde { background-color: rgba(var(--clr-surface-1-rgb),.5) !important; }
		`;

    this._listenForArtworkChange();

    this.umvImage = new UMVImageElement();
    this.scrollElement = document.querySelector(SCROLL_SELECTOR) as HTMLDivElement | null;

    this.settings = appSettingsStore.getState().pages.umv;
    appSettingsStore.subscribe((state) => {
      this.settings = state.pages.umv;
    }, 'pages.umv');

    this._refreshOptions('normal');
    this.append(this.umvImage);
  }

  set settings(settings: PageSettings['umv']) {
    this.type = settings.type;
    this.options = settings.options;
  }

  async updateURL(url: string | null) {
    try {
      if (url === this.page) return;
      let artworkURL: string | null;

      if (url) {
        artworkURL = await getArtworkBySpotifyURL(url);
        this.setAttribute('page', url);
      } else {
        artworkURL = await getArtworkBySpotifyURL(
          Spicetify?.Platform?.History?.location?.pathname || '/'
        );
      }

      if (artworkURL === this.getImage()) return;
      if (this.type !== 'expanded') this.setImage('normal', artworkURL);
    } catch (error) {
      console.error('Error updating NPV state:', error);
    }
  }

  private _listenForArtworkChange() {
    this.updateURL(Spicetify?.Platform?.History?.location?.pathname || '/');

    const unlisten = Spicetify.Platform.History.listen((url: { pathname: string } | null) => {
      if (url?.pathname) this.page = url.pathname;
    });

    const observer = this._observeUnderMainView();

    window.addEventListener('beforeunload', () => {
      observer?.disconnect();
      unlisten();
      this.setScrolling(false, true);
    });
  }

  private _observeUnderMainView(): null | MutationObserver {
    const targetNode = document.querySelector('.under-main-view');
    if (!targetNode) {
      console.warn('Element .under-main-view not found');
      return null;
    }

    const observerCB = () => {
      const element = targetNode.querySelector(
        '.main-entityHeader-gradient, .XUwMufC5NCgIyRMyGXLD'
      ) as HTMLElement;

      if (element) {
        const underMainViewURL = extractUrl(element.style.backgroundImage);
        if (underMainViewURL) {
          this.setImage('expanded', underMainViewURL);
        } else {
          this.type = this.settings?.type || 'normal';
          this.updateURL(Spicetify?.Platform?.History?.location || '/');
        }
      } else this.type = this.settings?.type || 'normal';
    };

    const observer = new MutationObserver(observerCB);

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    return observer;
  }

  set type(type: PageType) {
    this._refreshOptions(type);

    document.body.setAttribute('umv-type', type);
    this.setAttribute('type', type);
  }
  get type() {
    return (this.getAttribute('type') || 'normal') as PageType;
  }

  setImage(source: PageType, url: string | null) {
    if (!source) return;
    if (!url) this.umvImage.imageSrc = null;

    this.type = source;
    this.umvImage.imageSrc = url;
  }

  getImage() {
    return this.umvImage.imageSrc;
  }

  get page() {
    return this.getAttribute('page') || '';
  }

  set page(page: string) {
    if (this.page === page) return;

    this.umvImage.hideImage();

    this.updateURL(page);

    this.setAttribute('page', page);
  }

  private _refreshOptions(source: PageType) {
    if (!this.options) return;

    const curr = this.options[source];

    Object.assign(
      this.style,
      source === 'expanded'
        ? {
            height: `calc(100cqh - var(--umv-offset,${this.offsetHeight}))`,
            maskImage: '',
          }
        : {
            height: '75cqh',
            maskImage: 'linear-gradient(to bottom,rgba(0, 0, 0, 1) 25cqh, rgba(0, 0, 0, 0) 100%)',
          }
    );

    this.style.filter = serializeCSSFilters(curr.filter || {});

    this.imageBlur = curr.filter?.blur || 0;
    this.scaling = curr.isScaling;
    this.setScrolling(curr.isScroll);
  }

  set imageBlur(blur) {
    this.setAttribute('blur', `${blur}`);
  }

  get imageBlur() {
    return Number.parseInt(this.getAttribute('blur') || '0');
  }

  private _scrollHandler = (e?: Event) => {
    const target = (e?.target as HTMLElement) || this.scrollElement;

    if (this.scrollTimeout) return;
    this.scrollTimeout = requestAnimationFrame(() => {
      const scrollTop = target.scrollTop;

      if (scrollTop > window.innerHeight / 5) {
        this.mainView?.style.setProperty('--top-bar-opacity', '1');
      } else this.mainView?.style.setProperty('--top-bar-opacity', '0');

      this.style.transform = `translate3d(0px,-${
        this.scrolling ? Math.min(scrollTop, window.innerHeight) : 0
      }px,0px)`;
      this.umvImage.imgElement.style.transform = `${
        this.scaling ? `scale(${Math.min(100 + scrollTop / 10, 150)}%)` : ''
      }`;

      this.umvImage.setFilter(`blur(${Math.min(scrollTop / 10 + (this.imageBlur || 0), 32)}px)`);

      this.scrollTimeout = null;
    });
  };

  setScrolling(scroll: boolean, unload = false) {
    this.scrolling = scroll;

    if (!this.scrollElement) return;

    if (unload) {
      this.scrollElement.removeEventListener('scroll', this._scrollHandler);
      return;
    }
    this._scrollHandler();
    this.scrollElement.addEventListener('scroll', this._scrollHandler);
  }
}

customElements.define('umv-container', UnderMainViewElement);
