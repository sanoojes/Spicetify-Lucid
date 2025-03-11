import { createElement } from '@utils/dom/createElement.ts';

export class Select extends HTMLElement {
  private _options: { value: string; label: string }[] = [];
  private _value = '';
  private _isOpen = false;
  private _highlightedIndex = -1;
  private _trigger!: HTMLButtonElement;
  private _selectedValueSpan!: HTMLSpanElement;
  private _optionsList!: HTMLUListElement;
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  set options(opts: { value: string; label: string }[]) {
    this._options = opts;
    this.renderOptions();
  }

  get options() {
    return this._options;
  }

  set value(val: string) {
    this._value = val;
    this.updateSelected();
  }

  get value() {
    return this._value;
  }

  connectedCallback() {
    this.render();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  private render() {
    this.shadow.innerHTML = `
        <style>.option,.trigger{cursor:pointer;transition:background 225ms ease-in-out}.select-container{width:100%;min-width:6rem;position:relative}.options,.options::before{width:100%;position:absolute}.trigger{padding:.5rem .75rem;background-color:var(--clr-surface-2);width:100%;display:flex;align-items:center;text-align:left;line-height:1px;justify-content:space-between;color:var(--clr-on-surface);border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,#45454550);border-radius:var(--btn-base-radius,.5rem)}.options{list-style:none;padding:0;margin:0;border:1px solid #ccc;scrollbar-width:thin;background:rgba(var(--clr-surface-1-rgb),.5);z-index:10;max-height:200px;overflow-y:auto;border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,#45454550);border-radius:var(--btn-base-radius,.5rem);-webkit-backdrop-filter:blur(8px) saturate(150%);backdrop-filter:blur(8px) saturate(150%)}.options.hidden{display:none}.option{padding:.5rem}.option:last-child{border-bottom:none}.option.highlighted,.option[aria-selected=true]{background:rgba(var(--clr-surface-2-rgb),.7)}.option:hover,.trigger:hover,.trigger[aria-expanded=true]{background:rgba(var(--clr-surface-3-rgb),.75)}.icon{color:var(--clr-on-surface,var(--spice-text));height:20px;width:20px}.trigger,.option{font-size: .85rem;font-weight:500;font-family:inherit;color: var(--clr-on-surface,var(--spice-text,#fafafa))}</style>
        <div class="select-container">
          <button type="button" class="trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="selected-value"></span>
            <span class="icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.79681 7C4.95612 7 4.49064 7.97434 5.01887 8.62834L8.83333 13.351C9.43371 14.0943 10.5668 14.0943 11.1672 13.351L14.9816 8.62834C15.5098 7.97434 15.0444 7 14.2037 7H5.79681Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <ul class="options hidden" role="listbox" tabindex="-1"></ul>
        </div>
      `;
    this._trigger = this.shadow.querySelector('.trigger') as HTMLButtonElement;
    this._selectedValueSpan = this.shadow.querySelector('.selected-value') as HTMLSpanElement;
    this._optionsList = this.shadow.querySelector('.options') as HTMLUListElement;

    this._trigger.addEventListener('click', () => this.checkboxOptions());
    this._trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));
    this._optionsList.addEventListener('click', (e) => this.handleOptionClick(e));
    this._optionsList.addEventListener('keydown', (e) => this.handleOptionsKeydown(e));

    this.renderOptions();
    this.updateSelected();
  }

  private renderOptions() {
    if (!this._optionsList) return;
    this._optionsList.innerHTML = '';
    for (const [index, option] of this._options.entries()) {
      const li = createElement('li', {
        role: 'option',
        className: 'option',
        textContent: option.label,
        ariaSelected: option.value === this._value ? 'true' : 'false',
      });
      li.setAttribute('data-index', index.toString());
      li.setAttribute('data-value', option.value);
      this._optionsList.appendChild(li);
    }
  }

  private updateSelected() {
    if (!this._selectedValueSpan) return;

    const selectedOption = this._options.find((opt) => opt.value === this._value);

    this._selectedValueSpan.textContent = selectedOption
      ? selectedOption.label
      : 'Select an option';
    const children = Array.from(this._optionsList.children);
    for (const child of children) {
      const optionValue = child.getAttribute('data-value');
      child.setAttribute('aria-selected', optionValue === this._value ? 'true' : 'false');
    }
  }

  private checkboxOptions() {
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      this.openOptions();
    } else {
      this.closeOptions();
    }
  }

  private openOptions() {
    this._optionsList.classList.remove('hidden');
    this._trigger.setAttribute('aria-expanded', 'true');
    this._highlightedIndex = this._options.findIndex((opt) => opt.value === this._value);
    if (this._highlightedIndex === -1) this._highlightedIndex = 0;
    this.highlightOption(this._highlightedIndex);
    this._optionsList.focus();
  }

  private closeOptions() {
    this._isOpen = false;
    this._optionsList.classList.add('hidden');
    this._trigger.setAttribute('aria-expanded', 'false');
    this._highlightedIndex = -1;
  }

  private handleTriggerKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.openOptions();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.checkboxOptions();
        break;
    }
  }

  private handleOptionsKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.moveHighlight(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.moveHighlight(-1);
        break;
      case 'Enter':
        e.preventDefault();
        this.selectHighlighted();
        break;
      case 'Escape':
        e.preventDefault();
        this.closeOptions();
        this._trigger.focus();
        break;
    }
  }

  private handleOptionClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target && target.getAttribute('role') === 'option') {
      const index = Number.parseInt(target.getAttribute('data-index') || '0', 10);
      this._highlightedIndex = index;
      this.selectHighlighted();
    }
  }

  private moveHighlight(delta: number) {
    const count = this._options.length;
    if (count === 0) return;
    this._highlightedIndex = (this._highlightedIndex + delta + count) % count;
    this.highlightOption(this._highlightedIndex);
  }

  private highlightOption(index: number) {
    const options = this._optionsList.querySelectorAll('.option');
    let idx = 0;
    for (const option of options) {
      if (idx === index) {
        option.classList.add('highlighted');
        option.scrollIntoView({ block: 'nearest' });
      } else {
        option.classList.remove('highlighted');
      }
      idx++;
    }
  }

  private selectHighlighted() {
    if (this._highlightedIndex >= 0 && this._highlightedIndex < this._options.length) {
      const selected = this._options[this._highlightedIndex];
      this._value = selected.value;
      this.updateSelected();
      this.closeOptions();
      this._trigger.focus();

      this.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  private handleDocumentClick(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.closeOptions();
    }
  }
}

customElements.define('accessible-select', Select);
