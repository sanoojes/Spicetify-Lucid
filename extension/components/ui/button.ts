import { getTextClass } from '@utils/styles/encoreUtils.ts';

export type ButtonType = 'primary' | 'danger' | 'icon';

export type ButtonOnChangeCallback = () => void;

export class Button extends HTMLElement {
  public onChange?: ButtonOnChangeCallback;
  public customClass = '';

  connectedCallback(): void {
    this.className = `lucid-button ${this.customClass} ${getTextClass('body-small-bold')}`;
    this.updateButtonType();
  }

  set type(value: ButtonType) {
    this.setAttribute('type', value);
    this.updateButtonType();
  }

  get type(): ButtonType {
    const attr = this.getAttribute('type') as ButtonType | null;
    return attr ?? 'primary';
  }

  private updateButtonType(): void {
    switch (this.type) {
      case 'danger':
        this.classList.add('danger');
        this.classList.remove('primary', 'icon');
        break;
      case 'icon':
        this.classList.add('icon');
        this.classList.remove('primary', 'danger');
        break;
      default:
        this.classList.add('primary');
        this.classList.remove('danger', 'icon');
        break;
    }

    this.onChange?.();
  }

  set disabled(disabled: boolean) {
    if (disabled) this.classList.add('disabled');
    else this.classList.remove('disabled');
  }
}

customElements.define('custom-button', Button);
