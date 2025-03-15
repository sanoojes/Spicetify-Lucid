import { createElement } from '@utils/dom/createElement.ts';

export class UMVImageElement extends HTMLElement {
  imgElement: HTMLImageElement;
  transitionDuration = 0.5;
  filter = 'blur(0px)';
  transitionTimingFunction = 'ease-in-out';

  constructor(imageSrc?: string) {
    super();

    if (imageSrc) this.imageSrc = imageSrc;

    Object.assign(this.style, {
      width: '100%',
      height: '100%',
      display: 'block',
      willChange: 'transform',
    } satisfies Partial<CSSStyleDeclaration>);

    this.imgElement = createElement('img', {
      className: 'umv-img',
      style: {
        filter: this.filter,
        opacity: '1',
        transition: `opacity ${this.transitionDuration}s ${this.transitionTimingFunction}`,
        willChange: 'opacity, transform',
      },
    });

    this.append(this.imgElement);
  }

  setFilter(filter: string) {
    this.style.filter = filter;
  }

  set imageSrc(imageSrc: string | null) {
    if (!imageSrc) {
      this.style.opacity = '0';
      return;
    }
    this.style.opacity = '1';

    if (imageSrc.trim() === '') {
      return;
    }
    if (this.imgElement.src === imageSrc) return;

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

    const oldElement = this.imgElement;
    const newElement = createElement('img', {
      className: 'umv-img',
      style: {
        width: '100%',
        height: '100%',
        objectPosition: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        objectFit: 'cover',
        filter: this.filter,
        opacity: '0',
        transform: 'scale(1.05)',
        transition: `opacity ${this.transitionDuration}s ${this.transitionTimingFunction}, transform ${this.transitionDuration}s ${this.transitionTimingFunction}`,
        willChange: 'opacity, transform',
      },
    });
    newElement.src = src;
    this.appendChild(newElement);

    requestAnimationFrame(() => {
      newElement.style.opacity = '1';
      newElement.style.transform = 'scale(1)';
    });

    oldElement.style.opacity = '0';
    oldElement.style.transform = 'scale(0.95)';

    setTimeout(() => {
      this.imgElement.remove();
      this.imgElement = newElement;
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
