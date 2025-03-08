import { createElement } from '@utils/dom/createElement.ts';

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
        objectPosition: 'center',
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
