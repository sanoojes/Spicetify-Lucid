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
};

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
    lazyLoadStyleById('guided-tour').textContent =
      '.hidden,.tour-container.arrow-hidden:before{display:none}' +
      '.tour-container{position:absolute;background-color:var(--clr-surface-2);padding:1rem;border-radius:.5rem;max-width:45vw;box-shadow:0 0 2rem rgba(0,0,0,0.5);z-index:99999;opacity:0;visibility:hidden;transform:translate3d(0, -10px, 0);transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out;}' +
      '.tour-container.visible{opacity:1;visibility:visible;transform:translate3d(0, 0, 0)}' +
      '.tour-container.visible{width:100%;max-width:100%}' +
      '.tour-btn{background-color:var(--clr-primary);color:var(--clr-on-primary);padding:.5rem 1rem;border:none;border-radius:.3rem;font-weight:500;cursor:pointer;transition:background-color 225ms ease-in-out}' +
      '.tour-btn:hover{background-color:var(--clr-on-primary);color:var(--clr-primary)}' +
      '.tour-button-wrapper{display:flex;justify-content:space-between;margin-top:1rem;gap:.5rem}' +
      '.tour-step-counter{margin-bottom:0.5rem;text-align:center;font-weight:bold;color:var(--clr-on-surface);}';
  }

  public set tourSteps(steps: TourStep[]) {
    this.steps = steps;
  }

  public get tourSteps() {
    return this.steps;
  }

  public start() {
    if (this.steps.length > 0 && this.steps[0].onStart) {
      this.steps[0].onStart?.();
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
      buttonWrapper.append(this.skipButton, this.prevButton, this.nextButton);

      this.tooltip.append(this.stepCounter, this.message, buttonWrapper);
      document.body.appendChild(this.tooltip);
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

  private async showStep() {
    if (this.currentStepIndex >= this.steps.length) {
      this.endTour();
      return;
    }

    const step = this.steps[this.currentStepIndex];
    this.targetElement = document.querySelector(step.target) as HTMLElement;

    if (!this.targetElement || this.targetElement.offsetParent === null) {
      console.warn(`Skipping invisible or missing target: ${step.target}`);
      this.currentStepIndex++;
      this.showStep();
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

    this.stepCounter.textContent = `Step ${this.currentStepIndex + 1} of ${this.steps.length}`;
    this.message.textContent = step.content;
    this.prevButton.classList.toggle('hidden', this.currentStepIndex === 0);
    this.nextButton.textContent =
      this.currentStepIndex === this.steps.length - 1 ? 'End Tour' : 'Next';

    const targetRect = this.targetElement.getBoundingClientRect();
    let top = targetRect.top + targetRect.height + 15;
    if (top + this.tooltip.offsetHeight > window.innerHeight) {
      top = targetRect.top - this.tooltip.offsetHeight - 15;
    }
    const left = targetRect.left + targetRect.width / 2 - this.tooltip.offsetWidth / 2;

    this.tooltip.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    this.tooltip.classList.add('visible');
  }

  private nextStep() {
    this.steps[this.currentStepIndex]?.onComplete?.();
    this.currentStepIndex++;
    this.showStep();
  }

  private prevStep() {
    this.steps[this.currentStepIndex]?.onPrevious?.();
    this.currentStepIndex--;
    this.showStep();
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
    if (this.tooltip) {
      this.tooltip.classList.remove('visible');
      this.tooltip.addEventListener(
        'transitionend',
        () => {
          if (this.tooltip) {
            this.tooltip.parentElement?.removeChild(this.tooltip);
            this.tooltip = undefined;
          }
          this.resetPointerEvents();
        },
        { once: true }
      );
    } else {
      this.resetPointerEvents();
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
