import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { getTextClass } from '@utils/styles/encoreUtils.ts';

export type TourStep = {
  target: string;
  content: string;
  wait?: number;
  onComplete?: (() => void) | null;
  onPrevious?: (() => void) | null;
  arrow?: boolean;
  interactiveElementsSelector?: string;
  onStart?: (() => void) | null;
  position?: 'top right' | 'top left' | 'bottom left' | 'bottom right' | 'center';
};

const GUIDED_TOUR_STYLE_ID = 'guided-tour-styles';

const GUIDED_TOUR_CSS = `
body, #main { overflow: hidden; } 
.hidden, .tour-container.arrow-hidden:before { display: none; }
.tour-container {position: absolute;background-color: var(--clr-surface-2);padding: 1rem;border-radius: .5rem;max-width: 30em;box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);z-index: 99999;opacity: 0;visibility: hidden;transform: translate3d(0, -10px, 0);transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out;}
.tour-container.full-width { width: 100%; max-width: 100% }
.tour-container.visible:before {content: "";position: absolute;height: 1.5rem;width: 1.5rem;border-radius: 6px;top: 0;left: 50%;background-color: var(--clr-surface-2);clip-path: polygon(0 0, 0% 100%, 100% 0);transform: rotate(45deg) translate(-50%, 0);z-index: -1;}
.tour-container.visible { opacity: 1; visibility: visible; transform: translate3d(0, 0, 0) }
.tour-btn {border: var(--border-thickness, 1px) var(--border-style, solid) var(--border-color, rgba(var(--clr-surface-5-rgb), 0.25));background-color: var(--clr-tertiary);color: var(--clr-on-tertiary);padding: .5rem 1rem;border-radius: .3rem;font-weight: 500;cursor: pointer;transition: background-color 225ms ease-in-out;}
.tour-btn:hover { background-color: var(--clr-on-tertiary); color: var(--clr-tertiary) }
.tour-btn.skip-btn { background-color: var(--clr-secondary); color: var(--clr-on-secondary) }
.tour-btn.skip-btn:hover { background-color: var(--clr-on-secondary); color: var(--clr-secondary) }
.tour-btn.prev-btn { background-color: var(--clr-primary); color: var(--clr-on-primary) }
.tour-btn.prev-btn:hover { background-color: var(--clr-on-primary); color: var(--clr-primary) }
.tour-button-wrapper { display: flex; justify-content: space-between; margin-top: 1rem; gap: .5rem; }
.tour-step-counter { margin-bottom: 0.5rem; text-align: center; font-weight: bold; color: var(--clr-on-surface); }
.tour-navigation-wrapper { display: flex; gap: 0.5rem; }
.tour-navigation-wrapper .next-btn { margin-left: 0.5rem; }
`;

export class GuidedTourElement extends HTMLElement {
  private steps: TourStep[] = [];
  private currentStepIndex = 0;
  private tooltip?: HTMLDivElement;
  private targetElement?: HTMLElement;
  private interactiveElements: HTMLElement[] = [];

  private stepCounter!: HTMLDivElement;
  private message!: HTMLDivElement;
  private prevButton!: HTMLButtonElement;
  private nextButton!: HTMLButtonElement;
  private skipButton!: HTMLButtonElement;

  constructor() {
    super();
    lazyLoadStyleById(GUIDED_TOUR_STYLE_ID).textContent = GUIDED_TOUR_CSS;
  }
  connectedCallback() {
    this.style.position = 'fixed';
    this.style.inset = '0px';
    this.style.pointerEvents = 'none';
  }

  public set tourSteps(steps: TourStep[]) {
    this.steps = steps;
  }

  public get tourSteps() {
    return this.steps;
  }

  public start() {
    if (this.steps.length > 0 && this.steps[0].onStart) {
      this.steps[0].onStart();
    }
    this.currentStepIndex = 0;
    this.renderTooltip();
    this.showStep();
  }

  private renderTooltip() {
    if (!this.tooltip) {
      this.tooltip = createElement('div', {
        className: 'tour-container',
        role: 'dialog',
        ariaModal: 'true',
      });

      this.stepCounter = createElement('div', {
        className: 'tour-step-counter',
      });

      this.message = createElement('div', {
        className: `tour-message ${getTextClass('body-medium')}`,
      });

      this.skipButton = this.createButton('skip-btn', 'Skip Tour', this.endTour.bind(this));
      this.prevButton = this.createButton('prev-btn hidden', 'Previous', this.prevStep.bind(this));
      this.nextButton = this.createButton('next-btn', 'Next', this.nextStep.bind(this));

      const buttonWrapper = createElement('div', {
        className: 'tour-button-wrapper',
      });

      const navigationWrapper = createElement('div', {
        className: 'tour-navigation-wrapper',
      });
      navigationWrapper.append(this.prevButton, this.nextButton);

      buttonWrapper.append(navigationWrapper);
      buttonWrapper.prepend(this.skipButton);

      this.tooltip.append(this.stepCounter, this.message, buttonWrapper);
      this.appendChild(this.tooltip);
    }
  }

  private createButton(className: string, text: string, onClick: () => void): HTMLButtonElement {
    const button = createElement('button', {
      className: `tour-btn ${className}`,
      textContent: text,
    });
    button.onclick = onClick;
    return button;
  }

  private async showStep(prev = false) {
    if (this.currentStepIndex >= this.steps.length) {
      this.endTour();
      return;
    }

    const step = this.steps[this.currentStepIndex];
    this.targetElement = document.querySelector(step.target) as HTMLElement;

    if (!this.targetElement || this.targetElement.offsetParent === null) {
      console.warn(`Skipping invisible or missing target: ${step.target}`);
      if (prev) this.currentStepIndex--;
      else this.currentStepIndex++;
      this.showStep(prev);
      return;
    }

    if (!this.targetElement) {
      console.warn(`Target element not found: ${step.target}. Skipping step.`);
      if (prev) this.currentStepIndex--;
      else this.currentStepIndex++;
      this.showStep(prev);
      return;
    }

    this.targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await new Promise((resolve) => setTimeout(resolve, step.wait ?? 500));

    this.disablePointerEvents();
    this.enablePointerEventsForInteractiveElements(step);

    this.updateTooltip(step);
  }

  private updateTooltip(step: TourStep) {
    if (!this.tooltip || !this.targetElement) return;

    this.tooltip.classList.toggle('arrow-hidden', !(step.arrow ?? true));

    this.stepCounter.textContent = `Step ${this.currentStepIndex + 1} of ${this.steps.length}`;
    this.message.textContent = step.content;
    this.prevButton.classList.toggle('hidden', this.currentStepIndex === 0);
    this.nextButton.textContent =
      this.currentStepIndex === this.steps.length - 1 ? 'End Tour' : 'Next';

    const targetRect = this.targetElement.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const position = step.position || 'center';

    switch (position) {
      case 'top right':
        top = targetRect.top - tooltipRect.height - 16;
        left = targetRect.right - tooltipRect.width - 32;
        break;
      case 'top left':
        top = targetRect.top - tooltipRect.height - 16;
        left = targetRect.left - 32;
        break;
      case 'bottom left':
        top = targetRect.bottom + 16;
        left = targetRect.left - 32;
        break;
      case 'bottom right':
        top = targetRect.bottom + 16;
        left = targetRect.right - tooltipRect.width - 32;
        break;
      default:
        top = targetRect.top + targetRect.height + 16;
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        if (top + tooltipRect.height > window.innerHeight) {
          top = targetRect.top - tooltipRect.height - 16;
        }
        break;
    }

    if (left < 0) {
      left = 10;
    } else if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 0) {
      top = 10;
    } else if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height - 10;
    }

    this.tooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    this.tooltip.classList.add('visible');
  }

  private nextStep() {
    if (this.steps[this.currentStepIndex].onComplete) {
      this.steps[this.currentStepIndex].onComplete?.();
    }
    this.currentStepIndex++;
    this.showStep();
  }

  private prevStep() {
    if (this.currentStepIndex > 0) {
      if (this.steps[this.currentStepIndex - 1]?.onPrevious) {
        this.steps[this.currentStepIndex - 1].onPrevious?.();
      }
      this.currentStepIndex--;
      this.showStep(true);
    } else {
      console.warn('Already at the first step, cannot go back.');
    }
  }

  private disablePointerEvents() {
    document.body.style.pointerEvents = 'none';
  }

  private enablePointerEventsForInteractiveElements(step: TourStep) {
    if (!this.tooltip || !this.targetElement) return;

    this.interactiveElements = [this.targetElement, this.tooltip];

    if (step.interactiveElementsSelector) {
      const elements = document.querySelectorAll<HTMLElement>(step.interactiveElementsSelector);
      for (const el of elements) this.interactiveElements.push(el);
    }

    for (const el of this.interactiveElements) {
      el.style.pointerEvents = 'auto';
    }
  }

  private resetPointerEvents() {
    document.body.style.pointerEvents = 'auto';
    for (const el of this.interactiveElements) el.style.pointerEvents = 'auto';

    this.interactiveElements = [];
  }

  endTour() {
    console.debug('Tour skipped or ended.');
    this.resetPointerEvents();

    if (this.tooltip) {
      this.tooltip.classList.remove('visible');
      this.tooltip.addEventListener(
        'transitionend',
        () => {
          if (this.tooltip) {
            this.tooltip.parentElement?.removeChild(this.tooltip);
            this.tooltip = undefined;
          }
        },
        { once: true }
      );
    }
  }
}

customElements.define('guided-tour', GuidedTourElement);

export const createButton = (className: string, textContent: string): string => {
  const button = createElement('button', {
    className: `lucid-button ${getTextClass('body-small-bold')} ${className}`,
    textContent,
  });
  return button.outerHTML;
};
