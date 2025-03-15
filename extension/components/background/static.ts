import type { CSSFilter } from '@app/types/settings.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import { createElement } from '@utils/dom/createElement.ts';

class StaticBackground extends HTMLElement {
  private currentImgElement: HTMLImageElement;
  private nextImgElement: HTMLImageElement;
  private transitionDuration = '0.3s';
  private currentFilters: CSSFilter | null = null;
  src = '';
  private transitioning = false;

  constructor() {
    super();
    this.currentImgElement = createElement('img', {
      style: this.getBaseImageStyle({ opacity: '1' }),
    }) as HTMLImageElement;
    this.nextImgElement = createElement('img', {
      style: this.getBaseImageStyle({ opacity: '0', position: 'absolute', top: '0', left: '0' }),
    }) as HTMLImageElement;

    this.appendChild(this.currentImgElement);
    this.appendChild(this.nextImgElement);
  }

  private getBaseImageStyle(extraStyle: Record<string, string>): Record<string, string> {
    return {
      display: 'block',
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      objectPosition: 'center',
      transform: 'translate3d(0px,0px,0px)',
      transition: `opacity ${this.transitionDuration} ease-in-out`,
      ...extraStyle,
    };
  }

  set customFilter(filters: CSSFilter) {
    this.currentFilters = filters;
    this.currentImgElement.style.filter = serializeCSSFilters(filters);
    this.nextImgElement.style.filter = serializeCSSFilters(filters);
  }

  setImageSource(src: string) {
    if (this.src === src || this.transitioning) return;
    this.src = src;

    const preloader = new Image();
    preloader.onload = () => {
      this.performTransition(src);
    };

    preloader.onerror = () => {
      console.error('Failed to load image:', src);
    };

    preloader.src = src;
  }

  performTransition(src: string) {
    this.transitioning = true;
    this.nextImgElement.src = src;

    const tempImg = this.currentImgElement;
    this.currentImgElement = this.nextImgElement;
    this.nextImgElement = tempImg;

    this.currentImgElement.style.opacity = '1';
    this.nextImgElement.style.opacity = '0';

    setTimeout(() => {
      if (this.src !== src) {
        this.transitioning = false;
        return;
      }
      this.transitioning = false;
      if (this.currentFilters) {
        this.currentImgElement.style.filter = serializeCSSFilters(this.currentFilters);
      }
    }, Number.parseFloat(this.transitionDuration) * 1000);
  }
}

customElements.define('static-background', StaticBackground);
export default StaticBackground;
