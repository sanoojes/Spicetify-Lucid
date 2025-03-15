import { modalState } from '@store/modal.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { CLOSE_ICON, DISCORD_ICON, GITHUB_ICON } from '@app/icons.ts';
import { DISCORD_LINK, GITHUB_LINK } from '@app/links.ts';
import { getTextClass } from '@utils/styles/encoreUtils.ts';
import { Button } from '@components/ui/button.ts';

export class Modal extends HTMLElement {
  protected _modalElem: HTMLDivElement;
  protected _bodyElem: HTMLDivElement;
  protected _scrollElem: HTMLDivElement;
  protected _closeBtn: Button;
  protected _githubBtn: Button;
  protected _discordBtn: Button;
  protected _headerWrapperElem: HTMLDivElement;
  protected _headerElem: HTMLDivElement;
  protected _bgElem: HTMLDivElement;
  protected _previouslyFocusedElement: HTMLElement | null = null;
  private static zIndexCounter = 1000;

  constructor() {
    super();

    this._bgElem = createElement('div', {
      className: 'modal-backdrop',
    });
    this._bgElem.addEventListener('click', () => this.close());

    this._modalElem = createElement('div', {
      className: 'modal',
      role: 'dialog',
      ariaModal: 'true',
    });

    this._headerWrapperElem = createElement('div', {
      className: 'modal-header-container',
    });
    this._headerElem = createElement('h2', {
      className: `modal-header ${getTextClass('title-small')}`,
      id: 'modal-header',
    });
    const buttons = createElement('div', {
      className: 'modal-header-buttons',
    });
    this._closeBtn = this.createIconButton('close', 'Close Button', CLOSE_ICON, () => this.close());
    this._githubBtn = this.createIconButton('github', 'Github Button', GITHUB_ICON, () =>
      window.open(GITHUB_LINK)
    );
    this._discordBtn = this.createIconButton('discord', 'Discord Button', DISCORD_ICON, () =>
      window.open(DISCORD_LINK)
    );
    buttons.append(this._discordBtn, this._githubBtn, this._closeBtn);
    this._headerWrapperElem.append(this._headerElem, buttons);
    this._modalElem.appendChild(this._headerWrapperElem);

    this._bodyElem = createElement('div', { className: 'modal-body' });
    this._scrollElem = createElement('div', { className: 'modal-scroll' });

    this._bodyElem.appendChild(this._scrollElem);
    this._modalElem.appendChild(this._bodyElem);

    this.append(this._bgElem, this._modalElem);
  }

  protected createIconButton(
    className: string,
    ariaLabel: string,
    innerHTML: string | HTMLElement,
    clickHandler: (e: Event) => void
  ) {
    const button = new Button();
    button.customClass = className;
    button.ariaLabel = ariaLabel;
    button.innerHTML = innerHTML.toString();
    button.type = 'icon';

    button.addEventListener('click', clickHandler);
    return button;
  }

  protected resetPosition() {
    this._modalElem.style.transform = 'translate3d(-50%,-50%,0px)';
  }

  public get scrollElem() {
    return this._scrollElem;
  }

  public set isOpen(open: boolean) {
    if (open) this.setAttribute('open', 'true');
    else this.removeAttribute('open');
  }
  public get isOpen() {
    return Boolean(this.getAttribute('open'));
  }

  public setHeader(headerContent: string | HTMLElement) {
    this._headerElem.innerHTML = headerContent.toString();
  }

  public open(): void {
    this.isOpen = true;
    this._previouslyFocusedElement = document.activeElement as HTMLElement;
    this._bgElem.classList.add('modal-backdrop--open');
    this._modalElem.classList.add('modal--open');
    this._closeBtn.focus();
    this.resetPosition();

    Modal.zIndexCounter += 1;
    this._bgElem.style.zIndex = String(Modal.zIndexCounter);
    this._modalElem.style.zIndex = String(Modal.zIndexCounter);

    this.dispatchEvent(new Event('open'));
  }

  public close(): void {
    this.isOpen = false;
    this._bgElem.classList.remove('modal-backdrop--open');
    this._modalElem.classList.remove('modal--open');
    this.removeAttribute('open');
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
      this._previouslyFocusedElement = null;
    }

    this.dispatchEvent(new Event('close'));
  }

  public setContent(content: string | any): void {
    this._scrollElem.textContent = '';
    if (typeof content === 'string') {
      this._scrollElem.textContent = content;
    } else {
      this._scrollElem.append(content);
    }
  }
}

customElements.define('lucid-modal', Modal);
export class FloatingModal extends Modal {
  private dragging = false;
  private startX = 0;
  private startY = 0;
  private initialLeft = 0;
  private initialTop = 0;

  constructor() {
    super();

    super.setHeader('Lucid Settings');
  }

  private setPosition = (top: number, left: number) => {
    modalState.setState((state) => ({
      isFloating: state.isFloating,
      position: { top, left },
    }));
  };

  private handlePointerDown = (e: PointerEvent) => {
    if (!this.isFloating) return;
    this.dragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    const rect = this._modalElem.getBoundingClientRect();
    this.initialLeft = rect.left;
    this.initialTop = rect.top;
    this.setAttribute('dragging', 'true');
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerup', this.handlePointerUp);
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    let newLeft = this.initialLeft + dx;
    let newTop = this.initialTop + dy;

    const modalRect = this._modalElem.getBoundingClientRect();
    const modalWidth = modalRect.width;
    const modalHeight = modalRect.height;
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - modalWidth - 16));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - modalHeight - 16));

    this._modalElem.style.transform = `translate3d(${newLeft}px,${newTop}px,0px)`;

    this.setPosition(newTop, newLeft);
  };

  private handlePointerUp = (_e: PointerEvent) => {
    this.dragging = false;
    this.removeAttribute('dragging');
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
  };

  public makeFloating() {
    const modalPosition = modalState.getState().position;
    if (modalPosition && modalPosition.top !== undefined && modalPosition.left !== undefined) {
      this._modalElem.style.transform = `translate3d(${modalPosition.left}px,${modalPosition.top}px,0px)`;
    }

    this.setAttribute('floating', 'true');
    this._modalElem.classList.add('modal--floating');
    this._bgElem.classList.add('modal-backdrop--floating');
    this._headerWrapperElem.addEventListener('pointerdown', this.handlePointerDown);
  }

  public removeFloating() {
    this.removeAttribute('floating');
    this.resetPosition();
    this._bgElem.classList.remove('modal-backdrop--floating');
    this._modalElem.classList.remove('modal--floating');
    this._headerWrapperElem.removeEventListener('pointerdown', this.handlePointerDown);
  }

  public set isFloating(isFloating: boolean) {
    if (!isFloating) {
      this.removeAttribute('is-floating');
      this.removeFloating();
    } else {
      this.setAttribute('is-floating', 'true');
      this.makeFloating();
    }
  }

  public get isFloating() {
    return Boolean(this.getAttribute('is-floating'));
  }

  override open(): void {
    super.open();

    if (this.isFloating) {
      const modalPosition = modalState.getState().position;
      if (modalPosition && modalPosition.top !== undefined && modalPosition.left !== undefined) {
        this._modalElem.style.transform = `translate3d(${modalPosition.left}px,${modalPosition.top}px,0px)`;
      }
    }
  }
}

customElements.define('lucid-settings-modal', FloatingModal);

window.Modal = Modal;
window.FloatingModal = FloatingModal;
