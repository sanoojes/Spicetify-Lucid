import type { AppSettings } from '@app/types/settings.ts';
import StaticBackground from '@components/background/static.ts';
import AnimatedBackground from '@components/background/animated.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { alphaToHex } from '@utils/colors/convert.ts';

class BackgroundElement extends HTMLElement {
  private backgroundElement: StaticBackground | AnimatedBackground | HTMLElement | null = null;
  private options: AppSettings['background']['options'] | null = null;
  private currentMode: AppSettings['background']['mode'] = 'static';

  constructor() {
    super();

    Object.assign(this.style, {
      width: '100%',
      height: '100vh',
      display: 'block',
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'var(--clr-surface)',
    });

    this.render();
  }

  set image(value: string) {
    console.log(value, this.backgroundElement, this.currentMode);

    if (
      (this.backgroundElement instanceof StaticBackground ||
        this.backgroundElement instanceof AnimatedBackground) &&
      this.currentMode !== 'solid'
    ) {
      console.log(value);
      this.backgroundElement.setImageSource(value);
    }
  }

  get mode() {
    return this.currentMode;
  }
  set mode(value: AppSettings['background']['mode']) {
    if (this.currentMode !== value) {
      this.currentMode = value;
      this.setAttribute('mode', value);
      this.render();
    }
  }

  setOptions(options: AppSettings['background']['options']) {
    this.options = options;
    this.updateOptions();
  }
  getOptions() {
    return this.options;
  }

  private updateOptions() {
    if (!this.options || !this.backgroundElement) return;

    switch (this.currentMode) {
      case 'static':
        if (this.backgroundElement instanceof StaticBackground) {
          this.backgroundElement.customFilter = this.options.static.filter || {};
        }
        break;
      case 'solid':
        if (
          this.backgroundElement instanceof HTMLDivElement &&
          this.backgroundElement.classList.contains('solid')
        ) {
          Object.assign(this.backgroundElement.style, {
            backgroundColor:
              this.options.solid.color.hex + alphaToHex(this.options.solid.color.alpha || 1) ||
              'var(--clr-surface, #101010)',
          });
        }
        break;
      case 'animated':
        if (this.backgroundElement instanceof AnimatedBackground) {
          this.backgroundElement.customFilter = this.options.animated.filter || {};
        }
        break;
    }
  }

  private render() {
    const mode = this.currentMode;
    const imageUrl = this.image;
    let backgroundContainer = this.querySelector('#bg-wrapper');

    if (!backgroundContainer) {
      backgroundContainer = createElement('div', {
        id: 'bg-wrapper',
        style: { width: '100%', height: '100%' },
        innerHTML: '',
      });
      backgroundContainer.setAttribute('mode', this.currentMode);
      this.appendChild(backgroundContainer);
    }

    switch (mode) {
      case 'static': {
        let staticElement: StaticBackground;
        if (this.backgroundElement instanceof StaticBackground) {
          staticElement = this.backgroundElement;
        } else {
          staticElement = new StaticBackground();
          staticElement.setImageSource(imageUrl);
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
        } else {
          solidElement = createElement('div', {
            className: 'solid background',
          });
          Object.assign(solidElement.style, {
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
        } else {
          animatedElement = new AnimatedBackground();
          animatedElement.setImageSource(imageUrl);
          this.backgroundElement = animatedElement;
        }
        backgroundContainer.appendChild(animatedElement);
        break;
      }
    }

    this.updateOptions();
  }
}

customElements.define('lucid-background-container', BackgroundElement);
export default BackgroundElement;
