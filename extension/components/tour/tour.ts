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
  interactiveElementsSelectors?: string[];
  onStart?: (() => void) | null;
};

export const createButton = (className: string, textContent: string): string => {
  const button = createElement('button', {
    className: `lucid-button ${getTextClass('body-small-bold')} ${className}`,
    textContent,
  });
  return button.outerHTML;
};

export class GuidedTourElement extends HTMLElement {
  private steps: TourStep[] = [];
  private currentStepIndex = 0;
  private tooltip?: HTMLDivElement;
  private targetElement?: HTMLElement;
  private interactiveElements: HTMLElement[] = [];

  constructor() {
    super();
    lazyLoadStyleById('guided-tour').textContent =
      '.hidden,.tour-container.arrow-hidden:before{display:none}.tour-btn,.tour-container.visible:before{border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,rgba(var(--clr-surface-5-rgb),.25))}.tour-container{position:absolute;background-color:var(--clr-surface-2);padding:1.25rem 1.5rem;border-radius:.5rem;max-width:45vw;width: fit-content;box-shadow:0 0 2rem 20px rgba(0, 0, 0, 0.5);z-index:99999;opacity:0;visibility:hidden;transform:translateY(-10px)}.tour-container.visible{opacity:1;visibility:visible;transform:translateY(0)}.tour-container.visible:before{content:"";position:absolute;height:1.5rem;width:1.5rem;border-radius:6px;top:0;left:50%;background-color:var(--clr-surface-2);clip-path:polygon(0 0,0% 100%,100% 0);transform:rotate(45deg) translate(-50%,0);z-index:-1}.tour-container.full-width{max-width:100%;width:100%;}.hidden{visibility:hidden}.tour-button-wrapper{display:flex;justify-content:space-between;align-items:center;margin-top:1rem;gap:.5rem}.tour-button-group-right{display:flex;gap:.25rem}.tour-btn{background-color:var(--clr-primary);color:var(--clr-on-primary);padding:.6rem 1rem;border:none;border-radius:.3rem;font-weight:500;cursor:pointer;transition:background-color 225ms ease-in-out,color 225ms ease-in-out}.tour-btn:hover{color:var(--clr-primary);background-color:var(--clr-on-primary)}.tour-btn.skip-btn{background-color:var(--clr-tertiary);color:var(--clr-on-tertiary)}.tour-btn.skip-btn:hover{background-color:var(--clr-on-tertiary);color:var(--clr-tertiary)}.tour-btn.prev-btn{background-color:var(--clr-secondary);color:var(--clr-on-secondary)}.tour-btn.prev-btn:hover{background-color:var(--clr-on-secondary);color:var(--clr-secondary)}';
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
    this.showStep();
  }

  private disablePointerEvents() {
    document.body.style.pointerEvents = 'none';
  }

  private enablePointerEventsForInteractiveElements(step: TourStep) {
    if (!this.tooltip || !this.targetElement) return;

    this.interactiveElements = [this.targetElement, this.tooltip];

    if (step.interactiveElementsSelectors) {
      for (const selector of step.interactiveElementsSelectors) {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        for (const el of elements) {
          this.interactiveElements.push(el);
        }
      }
    }

    for (const el of this.interactiveElements) {
      el.style.pointerEvents = 'auto';
    }
  }

  private resetPointerEvents() {
    document.body.style.pointerEvents = 'auto';
    for (const el of this.interactiveElements) {
      el.style.pointerEvents = 'auto';
    }
    this.interactiveElements = [];
  }

  private displayTooltipForStep(step: TourStep, targetElement: HTMLElement) {
    return new Promise<void>((resolve) => {
      if (!this.tooltip) {
        this.tooltip = createElement('div', {
          className: 'tour-container',
          role: 'dialog',
          ariaModal: 'true',
          innerHTML: '',
        });
        this.tooltip.setAttribute('aria-labelledby', 'tour-message');
        document.body.appendChild(this.tooltip);
      }

      this.tooltip.classList.remove('hidden', 'arrow-hidden', 'tour-arrow-top');
      this.tooltip.classList.add('visible');
      this.tooltip.innerHTML = `<div class="tour-arrow"></div><div class="tour-message ${getTextClass('body-medium')}" id="tour-message">${step.content}</div><div class="tour-button-wrapper">${createButton('skip-btn tour-btn', 'Skip Tour')}<div class="tour-button-group-right">${createButton('prev-btn tour-btn hidden', 'Previous')}${createButton('next-btn tour-btn', this.currentStepIndex === this.steps.length - 1 ? 'End Tour' : 'Next')}</div></div>`;

      if (step.arrow === false) {
        this.tooltip.classList.add('arrow-hidden');
      }

      const nextButton = this.tooltip.querySelector('.next-btn') as HTMLButtonElement;
      const prevButton = this.tooltip.querySelector('.prev-btn') as HTMLButtonElement;
      const skipButton = this.tooltip.querySelector('.skip-btn') as HTMLButtonElement;

      prevButton.classList.toggle('hidden', this.currentStepIndex === 0);
      nextButton.textContent =
        this.currentStepIndex === this.steps.length - 1 ? 'End Tour' : 'Next';

      nextButton.onclick = () => {
        step.onComplete?.();
        this.currentStepIndex++;
        this.showStep();
      };

      prevButton.onclick = () => {
        step.onPrevious?.();
        this.currentStepIndex--;
        this.showStep();
      };

      skipButton.onclick = () => {
        this.endTour();
      };

      const updatePos = () => {
        const targetRect = targetElement.getBoundingClientRect();
        if (!this.tooltip) return;

        let top = targetRect.top + targetRect.height + 15;
        if (top + this.tooltip.offsetHeight > window.innerHeight) {
          top = targetRect.top - this.tooltip.offsetHeight - 15;
        }

        const left = targetRect.left + targetRect.width / 2 - this.tooltip.offsetWidth / 2;

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
      };

      updatePos();
      window.addEventListener('resize', updatePos);
      resolve();
    });
  }

  private async scrollToElementAndDisplayTooltip(step: TourStep) {
    this.targetElement = document.querySelector(step.target) as HTMLElement;
    if (!this.targetElement) {
      console.warn(`Target element not found: ${step.target}`);
      this.currentStepIndex++;
      this.showStep();
      return;
    }
    if (
      this.targetElement.offsetParent === null &&
      this.targetElement.offsetWidth === 0 &&
      this.targetElement.offsetHeight === 0
    ) {
      console.warn(`Target element is not visible: ${step.target}`);
      this.currentStepIndex++;
      this.showStep();
      return;
    }

    this.targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await new Promise((resolve) => setTimeout(resolve, step.wait ?? 500));
    this.disablePointerEvents();
    await this.displayTooltipForStep(step, this.targetElement);
    this.enablePointerEventsForInteractiveElements(step);
  }

  private showStep() {
    if (this.currentStepIndex >= this.steps.length) {
      this.endTour();
      return;
    }

    const step = this.steps[this.currentStepIndex];
    this.scrollToElementAndDisplayTooltip(step);
  }

  endTour() {
    console.debug('Tour skipped or ended.');
    this.resetPointerEvents();
    if (this.tooltip) {
      this.tooltip.classList.remove('visible');
      this.tooltip.addEventListener(
        'transitionend',
        () => {
          if (this.tooltip?.parentElement) {
            this.tooltip.remove();
            this.tooltip = undefined;
          }
        },
        { once: true }
      );
    } else {
      this.tooltip = undefined;
    }
  }
}

customElements.define('guided-tour', GuidedTourElement);
