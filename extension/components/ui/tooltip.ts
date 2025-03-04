import { createElement } from '@utils/dom/createElement.ts';
import { TOOLTIP_ICON } from '@app/icons.ts';

let showTimeout: number | null = null;
let hideTimeout: number | null = null;
const showDelay = 100;
const hideDelay = 150;

const tooltipElement = createElement('div', {
  id: 'tooltip',
  role: 'tooltip',
  ariaHidden: 'true',
  style: {
    position: 'fixed',
    display: 'block',
    padding: '0.5rem 1rem',
    border: '1px solid var(--border-color, var(--clr-surface-0))',
    color: 'var(--clr-on-surface, #fafafa)',
    backgroundColor: 'rgba(var(--clr-surface-0-rgb, var(--spice-rgb-main)), 0.85)',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(var(--clr-shadow-rgb), 0.25)',
    backdropFilter: 'blur(10px)',
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s ease-out',
    pointerEvents: 'auto',
    zIndex: '1000',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(-5px) scale(0.95)',
    maxWidth: `${window.innerWidth / 2}px`,
    fontSize: '0.875rem',
    textAlign: 'center',
  },
});
const tooltipContent = createElement('span', {
  className: 'tooltip-content',
  style: { display: 'inline-block', transition: 'opacity 0.3s ease' },
});
tooltipElement.appendChild(tooltipContent);
document.body.appendChild(tooltipElement);

tooltipElement.addEventListener('mouseenter', () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
});
tooltipElement.addEventListener('mouseleave', () => {
  hideTooltip();
});

export function showTooltip(event: MouseEvent, text?: string | HTMLElement) {
  if (!text) return;

  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  showTimeout = setTimeout(() => {
    if (typeof text === 'string') {
      tooltipContent.innerHTML = `<span style="font-weight: 500; color: inherit;">${text}</span>`;
    } else {
      tooltipContent.innerHTML = '';
      tooltipContent.appendChild(text);
    }

    tooltipElement.style.visibility = 'visible';
    tooltipElement.style.opacity = '1';
    tooltipElement.style.transform = 'translateY(0) scale(1)';
    tooltipElement.setAttribute('aria-hidden', 'false');

    let left: number;
    let top: number;
    if (event.target instanceof HTMLElement) {
      const rect = event.target.getBoundingClientRect();
      left = rect.left + rect.width / 2 - tooltipElement.offsetWidth / 2;
      top = rect.top - tooltipElement.offsetHeight;
    } else {
      left = event.clientX + 10;
      top = event.clientY + 10;
    }

    left = Math.max(0, Math.min(left, window.innerWidth - tooltipElement.offsetWidth));

    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.maxWidth = `${window.innerWidth / 2}px`;

    showTimeout = null;
  }, showDelay);
}

export function hideTooltip() {
  if (tooltipElement.matches(':hover') || tooltipContent.matches(':hover')) {
    return;
  }
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  hideTimeout = setTimeout(() => {
    tooltipElement.style.opacity = '0';
    tooltipElement.style.transform = 'translateY(-5px) scale(0.95)';
    tooltipElement.style.visibility = 'hidden';
    tooltipElement.setAttribute('aria-hidden', 'true');
    hideTimeout = null;
  }, hideDelay);
}

export class Tooltip {
  elem: HTMLElement;
  content: string | HTMLElement;
  private mouseoverHandler: (e: MouseEvent) => void;
  private mouseoutHandler: (e: MouseEvent) => void;
  open = false;

  constructor(content: string | HTMLElement) {
    this.content = content;
    this.elem = createElement('div', {
      className: 'tooltip-wrapper',
      innerHTML: `<span class="icon" style="height:24px; width:24px;">${TOOLTIP_ICON}</span>`,
      style: {
        cursor: 'help',
        display: 'inline-flex',
      },
      ariaLabel: typeof content === 'string' ? content : undefined,
      ariaHasPopup: 'true',
    });
    this.mouseoverHandler = (e: MouseEvent) => {
      this.open = true;
      showTooltip(e, this.content);
    };
    this.mouseoutHandler = () => {
      if (!this.elem.matches(':hover') && this.open) {
        hideTooltip();
        this.open = false;
      }
    };
    this.elem.addEventListener('mouseenter', this.mouseoverHandler);
    this.elem.addEventListener('mouseleave', this.mouseoutHandler);
  }

  dispose() {
    this.elem.removeEventListener('mouseenter', this.mouseoverHandler);
    this.elem.removeEventListener('mouseleave', this.mouseoutHandler);
    if (this.elem.parentNode) {
      this.elem.parentNode.removeChild(this.elem);
    }
  }
}
