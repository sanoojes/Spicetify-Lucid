import type { CSSFilter } from '@app/types/settings.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';
import { createElement } from '@utils/dom/createElement.ts';

class StaticBackground extends HTMLElement {
  private imgElement: HTMLDivElement;
  private transitionDuration = '0.3s';
  private currentFilters: CSSFilter | null = null;
  src = '';

  constructor() {
    super();
    this.imgElement = createElement('div', {
      style: {
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translate3d(0px,0px,0px)',
        transition: `background-image ${this.transitionDuration} ease-in-out`,
      },
    });
    this.appendChild(this.imgElement);
  }

  set customFilter(filters: CSSFilter) {
    this.currentFilters = filters;
    this.style.filter = serializeCSSFilters(filters);
  }

  setImageSource(src: string) {
    if (this.src === src) return;

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
    const oldImgElement = this.imgElement;
    const newImgElement = createElement('div', {
      style: {
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translate3d(0px,0px,0px)',
        transition: `opacity ${this.transitionDuration} ease-in-out`,
        backgroundImage: `url(${src})`,
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
      },
    });

    this.appendChild(newImgElement);

    newImgElement.offsetWidth;

    newImgElement.style.opacity = '1';

    setTimeout(() => {
      if (this.src !== src) {
        this.removeChild(newImgElement);
        return;
      }

      this.removeChild(oldImgElement);
      this.imgElement = newImgElement;
      if (this.currentFilters) {
        this.style.filter = serializeCSSFilters(this.currentFilters);
      }
      newImgElement.style.position = '';
    }, Number.parseFloat(this.transitionDuration) * 1000);
  }
}

customElements.define('static-background', StaticBackground);
export default StaticBackground;
