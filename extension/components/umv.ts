import { getArtworkBySpotifyURL } from '@utils/artworkUtils.ts';
import appSettingsStore from '@store/setting.ts';
import type { PageOption, PageType, UMVSettings } from '@app/types/settings.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { extractUrl } from '@utils/dom/extractUrl.ts';
import { waitForElement } from '@utils/dom/waitForElement.ts';
import { npvState } from '@store/npv.ts';
import { UMVImageElement } from '@components/ui/umv-image.ts';

const SCROLL_SELECTOR =
  '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]';
const UMV_OVERRIDE_STYLE_ID = 'umv-overrides';
const ROOT_MAIN_VIEW_SELECTOR = '.Root__main-view';
const UNDER_MAIN_VIEW_SELECTOR = '.under-main-view';
const MAIN_ENTITY_HEADER_GRADIENT_SELECTOR = '.main-entityHeader-gradient, .XUwMufC5NCgIyRMyGXLD';

const umvStylesContent = `
  .under-main-view { display: none; }
  umv-container {
    width: 100%;
    display: block;
    position: absolute;
    inset: 0px;
    height: 50cqh;
    -webkit-mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(rgb(0, 0, 0) 40cqh, rgba(0, 0, 0, 0) 100%);
    transform: translate3d(0px, 0px, 0px) scale(1);
    will-change: transform;
  }
  umv-container[source="expanded"] {
    height: calc(100cqh - var(--umv-offset, 526px));
    transform: translate3d(0px, 0px, 0px) scale(1);
    -webkit-mask-image: none;
    mask-image: none;
  }
  .main-entityHeader-container.main-entityHeader-withBackgroundImage{
    height: calc(100cqh - var(--umv-offset) - 1rem);
  }
  body[npb-is-floating] .main-entityHeader-container.main-entityHeader-withBackgroundImage{
    height: calc(100cqh - var(--umv-offset));
  }
  .main-entityHeader-container{ height: 40cqh; }
  .main-entityHeader-backgroundColor,.main-actionBarBackground-background { background: none !important;}
  .playlist-playlist-playlistContent,.EmeHQXR87mUskYK6xEde { background-color: rgba(var(--clr-surface-1-rgb),.5) !important; }
`;

export class UMVElement extends HTMLElement {
  private umvImage: UMVImageElement;
  private scrollElem: HTMLElement | null;
  private mainViewElement: HTMLElement | null;

  private _source: PageType;
  private _imageUrl: string | null;
  private _settings: UMVSettings | null;
  private _isNpv = false;
  private isArtist = false;

  options!: PageOption;
  pageUrl: string;

  umvArtUrl: null | string;
  pageArtUrl: null | string;

  unlistenHistory!: () => void;
  unobserveUMV!: () => void;
  unsubscribeNPV: (() => void) | null;

  constructor() {
    super();

    const umvStyles = lazyLoadStyleById(UMV_OVERRIDE_STYLE_ID);
    umvStyles.textContent = umvStylesContent;

    this.mainViewElement = null;

    this.umvImage = new UMVImageElement();
    this.append(this.umvImage);

    this._source = 'normal';
    this._imageUrl = null;
    this.pageUrl = '';

    this._settings = null;
    this.settings = appSettingsStore.getState().pages.umv;
    appSettingsStore.subscribe((state) => {
      this.settings = state.pages.umv;
    }, 'pages.umv');

    this.scrollElem = null;
    this.umvArtUrl = null;
    this.pageArtUrl = null;

    this.unsubscribeNPV = null;
  }

  connectedCallback() {
    waitForElement([ROOT_MAIN_VIEW_SELECTOR], ([mainElem]) => {
      this.mainViewElement = mainElem;
    });
    waitForElement([SCROLL_SELECTOR], ([scrollElem]) => {
      this.scrollElem = scrollElem;
      this._scrollEventCb = this._scrollEventCb.bind(this);
      this._listenScrollChange();
    });
    this._listenForUMVChange();
    this.updateImageUrlFromPage(Spicetify?.Platform?.History?.location?.pathname || '/');
  }

  disconnectedCallback() {
    if (this.scrollElem) {
      this.scrollElem.removeEventListener('scroll', this._scrollEventCb);
    }
    if (this.unobserveUMV) {
      this.unobserveUMV();
    }
    if (this.unlistenHistory) {
      this.unlistenHistory();
    }
    if (this.unsubscribeNPV) {
      this.unsubscribeNPV();
      this.unsubscribeNPV = null;
    }
  }

  set settings(settings: UMVSettings) {
    this._settings = settings;
    this.options = settings.options[this._source];
    if (settings.type === 'npv') this.isNpv = true;
    else this.isNpv = false;

    this._scrollEventCb();
  }

  get settings() {
    return this._settings ?? appSettingsStore.getState().pages.umv;
  }

  set isNpv(isNpv: boolean) {
    this._isNpv = isNpv;

    if (!isNpv) {
      this.unsubscribeNPV?.();
      this.unsubscribeNPV = null;
      this._updateImageBasedOnUrls();
      return;
    }

    this._updateImageBasedOnUrls();
    this.unsubscribeNPV = npvState.subscribe(() => {
      this._updateImageBasedOnUrls();
    });
  }

  get isNpv() {
    return this._isNpv;
  }

  set source(source: PageType) {
    this._source = source;
    this.setAttribute('source', source);
    this.isArtist = document.body.getAttribute('path')?.startsWith('artist', 1) ?? false;
    this.options = this.settings.options[source];
    this.umvImage.setFilter(`blur(${this.settings.options[source].filter?.blur ?? 0}px)`);

    this._scrollEventCb();
  }
  get source() {
    return this._source;
  }

  set imageUrl(imageUrl: string | null) {
    if (imageUrl === this._imageUrl) return;

    this._imageUrl = imageUrl;
    this.umvImage.imageSrc = imageUrl;
  }

  async updateImageUrlFromPage(url: string | null) {
    try {
      let artworkURL: string | null = null;
      if (artworkURL === '/') {
        this.pageArtUrl = null;
        this._updateImageBasedOnUrls();

        return;
      }

      if (url) {
        artworkURL = await getArtworkBySpotifyURL(url);
      }

      this.pageArtUrl = artworkURL;
      this._updateImageBasedOnUrls();
    } catch (error) {
      console.error('Error updating image URL from page:', error);
      console.error('URL that caused the error:', url);
    }
  }

  private _listenForPageChanges() {
    this.pageUrl = Spicetify?.Platform?.History?.location?.pathname || '/';

    this.unlistenHistory =
      Spicetify.Platform?.History?.listen((url: { pathname: string } | null) => {
        if (url?.pathname) {
          this.pageUrl = url.pathname;
          this.umvArtUrl = null;
          this.pageArtUrl = null;
          this.updateImageUrlFromPage(url.pathname);
        }
      }) ??
      (() => {
        console.error(
          'Error unloading History listener. Spicetify.Platform?.History might be undefined.'
        );
      });
  }

  private _observeUMVImage() {
    const targetNode = document.querySelector(UNDER_MAIN_VIEW_SELECTOR);
    if (!targetNode) {
      console.warn(
        `Element "${UNDER_MAIN_VIEW_SELECTOR}" not found. UMV observation will not work.`
      );
      return null;
    }

    const observerCB = () => {
      const element = targetNode.querySelector(MAIN_ENTITY_HEADER_GRADIENT_SELECTOR) as HTMLElement;

      if (element) {
        const underMainViewURL = extractUrl(element.style.backgroundImage);
        if (underMainViewURL) {
          this.umvArtUrl = underMainViewURL;
        } else {
          this.umvArtUrl = null;
        }
        this._updateImageBasedOnUrls();
      } else {
        this.umvArtUrl = null;
        this._updateImageBasedOnUrls();
      }
    };

    const observer = new MutationObserver(observerCB);

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    this.unobserveUMV = () => observer.disconnect();
  }

  private _listenForUMVChange() {
    this._listenForPageChanges();
    this._observeUMVImage();
  }

  private _scrollEventCb(e?: Event) {
    if (!this.settings) return;
    const scrollTop =
      this.scrollElem?.scrollTop ?? (e?.target as HTMLElement | undefined)?.scrollTop ?? 0;
    const sourceOptions = this.settings.options[this.source];

    if (scrollTop < 100)
      document.body.style.setProperty('--changing-pixels', `${Math.random().toFixed(1)}px`);

    requestAnimationFrame(() => {
      if (sourceOptions.isScaling) {
        this.umvImage.style.transform = `scale(${Math.round(Math.min(100 + scrollTop / 10, 175))}%)`;
      } else {
        this.umvImage.style.transform = 'scale(1)';
      }

      if (sourceOptions.isScroll) {
        this.style.transform = `translate3d(0px,-${Math.min(scrollTop, window.innerHeight)}px,0px)`;
      } else {
        this.style.transform = 'translate3d(0px,0px,0px)';
      }

      const blurValue = Math.min(
        scrollTop / 10 + (sourceOptions.filter?.blur || 0),
        this.isArtist ? scrollTop / 10 : 32
      );
      const brightnessValue = Math.max(60, 100 - (scrollTop / window.innerHeight) * 40);
      const opacityValue = Math.max(70, 100 - (scrollTop / window.innerHeight) * 30);

      this.umvImage.setFilter(
        `blur(${blurValue}px) brightness(${brightnessValue}%) opacity(${opacityValue}%)`
      );
    });

    if (scrollTop > window.innerHeight / 5) {
      this.mainViewElement?.style.setProperty('--top-bar-opacity', '1');
    } else this.mainViewElement?.style.setProperty('--top-bar-opacity', '0');
  }

  private _listenScrollChange() {
    if (!this.scrollElem) return;
    this.scrollElem.addEventListener('scroll', this._scrollEventCb);
  }

  private _updateImageBasedOnUrls() {
    if (this.umvArtUrl) {
      this.imageUrl = this.umvArtUrl;
      this.source = 'expanded';
      return;
    }

    if (this.settings.type === 'custom') {
      this.source = 'custom';
      this.imageUrl = this.settings.options.custom.url;
      return;
    }

    if (this.isNpv && this.pageArtUrl) {
      this.imageUrl = npvState.getState().url;
      this.source = 'npv';
      return;
    }

    if (this.pageArtUrl) {
      this.imageUrl = this.pageArtUrl;
      this.source = 'normal';
      return;
    }

    this.imageUrl = null;
    this.source = 'normal';
  }
}

customElements.define('umv-container', UMVElement);
