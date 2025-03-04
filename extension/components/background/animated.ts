import type { CSSFilter } from '@app/types/settings.ts';
import { serializeCSSFilters } from '@utils/serializeCSSFilters.ts';

class AnimatedBackground extends HTMLElement {
  private imgElements: HTMLDivElement[] = [];
  private src = '';
  private transitionDuration = '0.3s';

  constructor() {
    super();

    this.style.display = 'block';
    const style = document.createElement('style');
    style.textContent = `
#image-1 {
	left: 0%;
	top: -50%;
	z-index: 1;
}
#image-2 {
	animation-direction: reverse;
	top: 20%;
	left: -50%;
	z-index: 1;
}
#image-3 {
	animation-direction: reverse;
	right: -50%;
	top: -20%;
	width: 200%;
	z-index: 0;
}
@keyframes animBg {
	0% {
		transform: rotate(0turn) translate3d(0px,0px,0px);
	}
	to {
		transform: rotate(1turn) translate3d(0px,0px,0px);
	}
}`;
    this.appendChild(style);

    for (let i = 0; i < 3; i++) {
      const imgElement = document.createElement('div');
      imgElement.id = `image-${i + 1}`;
      imgElement.classList.add('image', `${i + 1}`);
      Object.assign(imgElement.style, {
        width: '100ch',
        height: '100ch',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: 'animBg 30s linear infinite',
        willChange: 'contents',
        position: 'absolute',
        transition: `opacity ${this.transitionDuration} ease-in-out`,
        opacity: '0',
      });
      this.imgElements.push(imgElement);
      this.appendChild(imgElement);

      imgElement.offsetWidth;
      imgElement.style.opacity = '1';
    }
  }

  get customFilter() {
    return this.customFilter;
  }

  set customFilter(filters: CSSFilter) {
    this.style.filter = serializeCSSFilters(filters);
  }

  setImageSource(src: string) {
    if (this.src !== src) {
      this.src = src;
      this.performTransition(src);
    }
  }

  performTransition(src: string) {
    for (const imgElement of this.imgElements) {
      const preloader = new Image();
      preloader.onload = () => {
        imgElement.style.backgroundImage = `url(${src})`;
      };
      preloader.onerror = () => {
        console.error('Failed to load image:', src);
      };
      preloader.src = src;
    }
  }
}

customElements.define('animated-background', AnimatedBackground);
export default AnimatedBackground;
