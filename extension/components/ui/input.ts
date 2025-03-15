import { Button } from '@components/ui/button.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { EYEDROPPER_ICON, SAVE_ICON } from '@app/icons.ts';
import { Select } from '@components/ui/select.ts';
import { shallowEqual } from '@utils/shallowEqual.ts';
import type { InputOptionsUnion } from '@app/types/input.ts';
import type { ValidatorResult } from '@utils/validationUtils.ts';
import { showNotification } from '@utils/showNotification.ts';

export class CustomInput extends HTMLElement {
  private _inputOptions!: InputOptionsUnion;
  private _renderedOptions: InputOptionsUnion | null = null;
  private _inputElement: Select | Button | HTMLInputElement | null = null;
  private _previewElement: HTMLImageElement | null = null;

  set inputOptions(options: InputOptionsUnion) {
    this._inputOptions = options;
    this.render();
  }

  get inputOptions() {
    return this._inputOptions;
  }

  connectedCallback() {
    this.render();
  }

  removeContent() {
    this._inputElement = null;
    this._previewElement = null;
    this.innerHTML = '';
  }

  render() {
    if (this._renderedOptions && shallowEqual(this._renderedOptions, this._inputOptions)) {
      return;
    }

    this.removeContent();

    const handleSaveClick = <T>(
      validator?: ((value: T) => ValidatorResult) | undefined,
      onChange?: (value: T) => void,
      convert?: (value: string) => T
    ) => {
      const target = this._inputElement as HTMLInputElement;
      const rawValue = target.value;
      const newValue: T = convert ? convert(rawValue) : (rawValue as unknown as T);

      if (!validator) {
        onChange?.(newValue);
        return;
      }

      const res = validator(newValue);
      if (res.isValid) {
        target.classList.remove('error', 'shake-error');
        onChange?.(newValue);
      } else {
        target.classList.remove('shake-error');
        void target.offsetWidth;
        target.classList.add('error', 'shake-error');

        if (res.message) {
          showNotification(res.message, true, 2000);
        }
      }
    };

    switch (this._inputOptions.type) {
      case 'button': {
        const { buttonType, onClick, contents } = this._inputOptions;
        this._inputElement = new Button();
        this._inputElement.type = buttonType || 'primary';
        if (onClick) this._inputElement.onclick = onClick;
        this._inputElement.innerHTML = contents?.toString() || 'Button';

        this.append(this._inputElement);
        break;
      }
      case 'number': {
        const { type, step, value, onChange, validator } = this._inputOptions;
        this._inputElement = createElement('input', {
          type,
          step: step?.toString() || '1',
          value: value?.toString(),
          className: 'input number',
        });

        const saveButton = new Button();
        saveButton.innerHTML = SAVE_ICON;
        saveButton.type = 'icon';
        saveButton.onclick = () =>
          handleSaveClick<number>(validator, onChange, (value) => Number.parseFloat(value));
        this.append(this._inputElement, saveButton);
        break;
      }
      case 'text': {
        const { type, value, onChange, validator } = this._inputOptions;
        this._inputElement = createElement('input', {
          type,
          value,
          className: 'input text',
        });

        const saveButton = new Button();
        saveButton.innerHTML = SAVE_ICON;
        saveButton.type = 'icon';
        saveButton.onclick = () => handleSaveClick<string>(validator, onChange);

        this.append(this._inputElement, saveButton);
        break;
      }
      case 'checkbox': {
        const { onChange, checked, type } = this._inputOptions;
        this._inputElement = createElement('input', {
          checked,
          type,
          className: 'checkbox custom',
        });
        this._inputElement.onchange = (e) => onChange?.((e.target as HTMLInputElement).checked);

        this.append(this._inputElement);
        break;
      }
      case 'select': {
        const { options, value, onChange } = this._inputOptions;
        this._inputElement = new Select();
        if (options) this._inputElement.options = options;
        if (value) this._inputElement.value = value;
        this._inputElement.onchange = (e) => onChange?.((e.target as Select).value);

        this.append(this._inputElement);
        break;
      }
      case 'color': {
        const { value, onChange } = this._inputOptions;
        this._inputElement = createElement('input', {
          type: 'color',
          value,
          className: 'input color',
        });

        const eyeDropperButton = new Button();
        eyeDropperButton.innerHTML = EYEDROPPER_ICON;
        eyeDropperButton.type = 'icon';
        eyeDropperButton.onclick = async () => {
          if (!('EyeDropper' in window) && window.EyeDropper) {
            showNotification('EyeDropper API is not supported in this browser.', true, 3000);
            return;
          }

          try {
            if (!window.EyeDropper) return;

            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            const color = result.sRGBHex;
            (this._inputElement as HTMLInputElement).value = color;

            onChange?.(color);
          } catch (e) {
            if (e instanceof Error && e.message !== 'No color selected') {
              console.error('EyeDropper Error:', e);
              showNotification('Failed to pick color with EyeDropper.', true, 3000);
            }
          }
        };

        const saveButton = new Button();
        saveButton.innerHTML = SAVE_ICON;
        saveButton.type = 'icon';
        saveButton.onclick = () => {
          handleSaveClick<string>(() => ({ isValid: true }), onChange);
        };
        if (window.EyeDropper) {
          this.append(this._inputElement, eyeDropperButton, saveButton);
        } else this.append(this._inputElement, saveButton);

        break;
      }
      case 'image': {
        const { onChange } = this._inputOptions;
        this._inputElement = createElement('input', {
          type: 'file',
          accept: 'image/*',
          className: 'input image',
          style: {
            display: 'none',
            visibility: 'hidden',
          },
        });

        this._previewElement = createElement('img', {
          className: 'image-preview',
          style: {
            borderRadius: '0.5rem',
          },
        }) as HTMLImageElement;
        this._previewElement.src = this._inputOptions.value ?? '';
        this.prepend(this._previewElement);

        this._inputElement.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];

          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              onChange?.(dataUrl);

              if (!this._previewElement) return;
              this._previewElement.src = dataUrl;
            };
            reader.readAsDataURL(file);
          } else {
            onChange?.(null);
            if (this._previewElement) {
              this._previewElement.src = '';
            }
          }
        };

        this.append(
          new Button({
            type: 'primary',
            textContent: 'Select Image',
            onChange: () => {
              this._inputElement?.click();
            },
          }),
          this._inputElement
        );
        break;
      }

      default:
        console.error('Unsupported input options:', this._inputOptions);
    }

    this._renderedOptions = this._inputOptions;
  }
}

customElements.define('custom-input', CustomInput);
