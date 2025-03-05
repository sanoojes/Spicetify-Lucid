import type { AppSettings } from '@app/types/settings.ts';
import StaticBackground from '@components/background/static.ts';
import AnimatedBackground from '@components/background/animated.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { alphaToHex } from '@utils/colors/convert.ts';

class BackgroundElement extends HTMLElement {
  private backgroundElement: StaticBackground | AnimatedBackground | HTMLElement | null = null;
  private options: AppSettings['background']['options'] | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    Object.assign(this.style, {
      width: '100%',
      height: '100vh',
      display: 'block',
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'var(--clr-surface)',
    });
  }

  static get observedAttributes() {
    return ['image', 'mode'];
  }

  get image() {
    return this.getAttribute('image') || '';
  }
  set image(value: string) {
    if (this.mode !== 'solid') this.setAttribute('image', value);
    else this.removeAttribute('image');
  }

  get mode() {
    return (this.getAttribute('mode') as AppSettings['background']['mode']) || 'static';
  }
  set mode(value: AppSettings['background']['mode']) {
    this.setAttribute('mode', value);
  }

  setOptions(options: AppSettings['background']['options']) {
    this.options = options;
    this.render();
  }
  getOptions() {
    return this.options;
  }

  connectedCallback() {
    if (!this.isConnected) {
      this.render();
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (
      (name === 'image' && this.backgroundElement instanceof StaticBackground) ||
      this.backgroundElement instanceof AnimatedBackground
    ) {
      if (this.mode === 'static' || this.mode === 'animated') {
        this.backgroundElement.setImageSource(newValue || '');
      }
    } else if (name === 'mode') {
      if (this.isConnected) this.render();
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const mode = this.mode;
    const imageUrl = this.image;
    const backgroundContainer = createElement('div');
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';

    switch (mode) {
      case 'static': {
        let staticElement: StaticBackground;
        if (this.backgroundElement instanceof StaticBackground) {
          staticElement = this.backgroundElement;
          staticElement.customFilter = this.options?.static.filter || {}; // Update filter
        } else {
          staticElement = new StaticBackground();
          staticElement.setImageSource(imageUrl);
          staticElement.customFilter = this.options?.static.filter || {};
          this.backgroundElement = staticElement;
        }
        backgroundContainer.appendChild(staticElement);
        break;
      }
      case 'solid': {
        let solidElement: HTMLElement;
        if (
          this.backgroundElement instanceof HTMLDivElement &&
          this.backgroundElement.classList.contains('solid')
        ) {
          solidElement = this.backgroundElement;
          Object.assign(solidElement.style, {
            backgroundColor:
              this.options?.solid.color.hex + alphaToHex(this.options?.solid.color.alpha || 1) ||
              'var(--clr-surface, #101010)',
          });
        } else {
          solidElement = createElement('div', {
            className: 'solid background',
          });
          Object.assign(solidElement.style, {
            backgroundColor:
              this.options?.solid.color.hex + alphaToHex(this.options?.solid.color.alpha || 1) ||
              'var(--clr-surface, #101010)',
            width: '100%',
            height: '100vh',
          });
          this.backgroundElement = solidElement;
        }
        backgroundContainer.appendChild(solidElement);
        break;
      }
      case 'animated': {
        let animatedElement: AnimatedBackground;
        if (this.backgroundElement instanceof AnimatedBackground) {
          animatedElement = this.backgroundElement;
          animatedElement.customFilter = this.options?.animated.filter || {};
        } else {
          animatedElement = new AnimatedBackground();
          animatedElement.setImageSource(imageUrl);
          animatedElement.customFilter = this.options?.animated.filter || {};
          this.backgroundElement = animatedElement;
        }
        backgroundContainer.appendChild(animatedElement);
        break;
      }
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(backgroundContainer);
  }
}

customElements.define('lucid-background-container', BackgroundElement);
export default BackgroundElement;
