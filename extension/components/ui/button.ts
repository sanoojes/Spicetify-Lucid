import { getTextClass } from '@utils/styles/encoreUtils.ts';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'icon';

export type ButtonOnChangeCallback = () => void;

export interface ButtonOptions {
  type?: ButtonType;
  customClass?: string;
  onChange?: ButtonOnChangeCallback;
  disabled?: boolean;
  innerHTML?: string;
  textContent?: string;
  isIcon?: boolean;
  ariaLabel?: string;
  style?: Partial<CSSStyleDeclaration>;
}

export class Button extends HTMLElement {
  public customClass = '';
  private _type: ButtonType = 'primary';
  private _isIcon = false;

  onChange?: ButtonOnChangeCallback;

  constructor(options?: ButtonOptions) {
    super();
    if (options) {
      this.type = options.type ?? this.type;
      this.customClass = options.customClass ?? this.customClass;
      this.disabled = options.disabled ?? this.disabled;
      this.isIcon = options.isIcon ?? this._isIcon;
      this.onChange = options.onChange;
      if (options.textContent) this.textContent = options.textContent;
      if (options.innerHTML) this.innerHTML = options.innerHTML;
      if (options.ariaLabel) this.ariaLabel = options.ariaLabel;
      if (options.style) Object.assign(this.style, options.style);
    }

    this.addEventListener('click', this._handleClick);
  }

  connectedCallback(): void {
    this.classList.add('lucid-button');
    this._updateClasses();
    this.setAttribute('role', 'button');
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this._handleClick);
  }

  private _updateClasses() {
    this.className = `lucid-button ${this.customClass}`;
    this.classList.toggle('icon', this._isIcon);
    this.classList.toggle('disabled', this.disabled);

    for (const className of this.classList) {
      if (['primary', 'secondary', 'tertiary', 'danger'].includes(className)) {
        this.classList.remove(className);
      }
    }
    this.classList.add(this.type);

    if (this._isIcon && this.type === 'icon') {
      const textClass = getTextClass('body-small-bold');
      if (textClass) {
        this.classList.add(textClass);
      }
    }
  }

  set isIcon(isIcon: boolean) {
    this._isIcon = isIcon;
    if (isIcon) {
      this.classList.add('icon');
      this.setAttribute('is-icon', 'true');
    } else {
      this.classList.remove('icon');
      this.removeAttribute('is-icon');
    }
    this._updateClasses();
  }

  get isIcon() {
    return this._isIcon;
  }

  set type(value: ButtonType) {
    this._type = value;
    this.setAttribute('type', value);
    this._updateClasses();
  }

  get type(): ButtonType {
    return this._type;
  }

  set disabled(disabled: boolean) {
    if (disabled) {
      this.setAttribute('disabled', 'true');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('disabled');
      this.removeAttribute('aria-disabled');
    }
    this._updateClasses();
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  private _handleClick = () => {
    if (!this.disabled && this.onChange) {
      this.onChange();
    }
  };
}

customElements.define('custom-button', Button);
