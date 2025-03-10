import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { getTextClass } from '@utils/styles/encoreUtils.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type { AppSettings } from '@app/types/settings.ts';
import type { Modal } from '@components/settings/modal.ts';

type TourStep = {
  target: string;
  content: string;
  wait?: number;
  onComplete?: (() => void) | null;
  onPrevious?: (() => void) | null;
  arrow?: boolean;
  interactiveElementsSelectors?: string[];
};

const createButton = (className: string, text: string, extraClasses = '') => {
  return `<button class="${className} ${extraClasses} encore-text encore-text-body encore-internal-color-text-base">${text}</button>`;
};

class GuidedTourElement extends HTMLElement {
  private steps: TourStep[] = [];
  private currentStepIndex = 0;
  private tooltip?: HTMLDivElement;
  private arrow?: HTMLDivElement;
  private targetElement?: HTMLElement;
  private interactiveElements: HTMLElement[] = [];

  constructor() {
    super();
    lazyLoadStyleById('guided-tour').textContent =
      '.hidden,.tour-container.arrow-hidden .tour-arrow{display:none}.tour-btn,.tour-container{border:var(--border-thickness,1px) var(--border-style,solid) var(--border-color,rgba(var(--clr-surface-5-rgb),.25))}.tour-container{position:absolute;background-color:rgba(var(--clr-surface-1-rgb),.7);padding:1.25rem 1.5rem;border-radius:.5rem;min-width:20rem;box-shadow:0 .25rem .5rem rgba(0,0,0,.15);backdrop-filter:blur(0.75rem) saturate(1.5);z-index:99999;opacity:0;visibility:hidden;transform:translateY(-10px)}.tour-container.tour-container-visible{opacity:1;visibility:visible;transform:translateY(0)}.tour-arrow{position:absolute;bottom:100%;left:49%;transform:rotate(45deg) translateY(1rem);height:2rem;width:2rem;transition:left .2s ease-out,top .2s ease-out}.tour-container.tour-arrow-top .tour-arrow{bottom:auto;top:100%;border-bottom-color:transparent;border-top-color:var(--clr-secondary);transform:translateX(-50%) translateY(-50%)}.hidden{visibility:hidden}.tour-button-wrapper{display:flex;justify-content:space-between;align-items:center;margin-top:1rem;gap:.5rem}.tour-button-group-right{display:flex;gap:.25rem}.tour-btn{background-color:var(--clr-primary);color:var(--clr-on-primary);padding:.6rem 1rem;border:none;border-radius:.3rem;font-weight:500;cursor:pointer;transition:background-color 225ms ease-in-out,color 225ms ease-in-out}.tour-btn:hover{color:var(--clr-primary);background-color:var(--clr-on-primary)}.tour-btn.skip-btn{background-color:var(--clr-tertiary);color:var(--clr-on-tertiary)}.tour-btn.skip-btn:hover{background-color:var(--clr-on-tertiary);color:var(--clr-tertiary)}.tour-btn.prev-btn{background-color:var(--clr-secondary);color:var(--clr-on-secondary)}.tour-btn.prev-btn:hover{background-color:var(--clr-on-secondary);color:var(--clr-secondary)}';
  }

  public set tourSteps(steps: TourStep[]) {
    this.steps = steps;
  }
  public get tourSteps() {
    return this.steps;
  }

  public start() {
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
          innerHTML: '<div class="tour-arrow"></div>',
        });
        this.tooltip.setAttribute('aria-labelledby', 'tour-message');
        document.body.appendChild(this.tooltip);
        this.arrow = this.tooltip.querySelector('.tour-arrow') as HTMLDivElement;
      }

      this.tooltip.classList.remove('hidden', 'arrow-hidden', 'tour-arrow-top');
      this.tooltip.classList.add('tour-container-visible');
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

      const targetRect = targetElement.getBoundingClientRect();
      if (this.tooltip && this.arrow) {
        let calculatedTop = targetRect.top + targetRect.height + 15;
        if (calculatedTop + this.tooltip.offsetHeight > window.innerHeight) {
          calculatedTop = targetRect.top - this.tooltip.offsetHeight - 15;
          this.tooltip.classList.add('tour-arrow-top');
        }

        let calculatedLeft = targetRect.left + targetRect.width / 2 - this.tooltip.offsetWidth / 2;
        if (calculatedLeft < 0) {
          calculatedLeft = 10;
        } else if (calculatedLeft + this.tooltip.offsetWidth > window.innerWidth) {
          calculatedLeft = window.innerWidth - this.tooltip.offsetWidth - 10;
        }

        this.tooltip.style.top = `${calculatedTop}px`;
        this.tooltip.style.left = `${calculatedLeft}px`;
        if (this.arrow) {
          this.arrow.style.left = `${targetRect.left + targetRect.width / 2 - this.tooltip.offsetLeft}px`;
        }
      }
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
      this.tooltip.classList.remove('tour-container-visible');
      this.tooltip.addEventListener(
        'transitionend',
        () => {
          if (this.tooltip?.parentElement) {
            this.tooltip.remove();
            this.tooltip = undefined;
            this.arrow = undefined;
          }
        },
        { once: true }
      );
    } else {
      this.tooltip = undefined;
      this.arrow = undefined;
    }
  }
}

customElements.define('guided-tour', GuidedTourElement);

let modal: Modal | null = null;

const startTour = () => {
  try {
    if (!modal) setupTour();
    modal?.open();
  } catch (e) {
    console.error('Failed to open guided tour modal.', e);
  }
};

const settingEventCb = () => {
  window?.lucid?.settings?.openSettings?.();
};

function getTourSteps(settings = window?.lucid?.store?.getState()) {
  function onSettingOpen() {
    window?.lucid?.settings?.openSettings?.();
    window?.lucid?.settings?.settingModal?.addEventListener('close', settingEventCb, {
      once: true,
    });
  }

  const settingsPositionStep: TourStep[] =
    settings.position === 'nav'
      ? [
          {
            target: "button[aria-label='Lucid Settings']",
            content: 'Click here to open settings.',
            onComplete: onSettingOpen,
            interactiveElementsSelectors: ["button[aria-label='Lucid Settings']"],
          },
        ]
      : [
          {
            target: '.main-userWidget-box',
            content: 'Settings open button is in this context menu. Click to open it.',
            onComplete: () => {
              (document.querySelector('.main-userWidget-box') as HTMLButtonElement | null)?.click();
            },
            interactiveElementsSelectors: ['.main-userWidget-box'],
          },
          {
            target: '.main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)',
            content: 'Click here to open settings.',
            wait: 500,
            onComplete: onSettingOpen,
            interactiveElementsSelectors: [
              '.main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)',
            ],
          },
        ];

  const tourSteps: TourStep[] = [
    ...settingsPositionStep,
    {
      target: 'lucid-settings-modal .modal-header-container',
      content: 'Explore settings to customize your experience.',
      arrow: false,
      interactiveElementsSelectors: ['.modal-header-container'],
    },
    {
      target: 'lucid-settings-modal setting-section[data-tab-id="background"] .header-wrapper',
      content: 'Let\'s start with the "Background" tab to explore the theme background.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'lucid-settings-modal setting-section[data-tab-id="background"] .header-wrapper',
      ],
    },

    {
      target: 'lucid-settings-modal custom-button.close',
      content: 'Once you are done, click here to close the settings modal.',
      arrow: true,
      onComplete: () => {
        window?.lucid?.settings?.settingModal?.removeEventListener('close', settingEventCb);
        window?.lucid?.settings?.closeSettings?.();
      },
      interactiveElementsSelectors: ['lucid-settings-modal custom-button.close'],
    },
  ];

  return tourSteps;
}

const setupTour = () => {
  if (!window?.Modal) {
    console.warn('Modal class is not available, guided tour setup failed.');
    return null;
  }

  const tourElement = new GuidedTourElement();
  tourElement.tourSteps = getTourSteps();
  window?.lucid?.store?.subscribe?.((state: AppSettings) => {
    tourElement.tourSteps = getTourSteps(state);
  }, 'position');

  modal = new window.Modal() as Modal;
  modal.setHeader('Welcome to Lucid Theme!');

  const modalContent = createElement('div', {
    className: 'tour-container arrow-hidden tour-container-visible',
    style: { position: 'relative' },
    innerHTML: `<div class="tour-arrow"></div><div class="tour-message ${getTextClass('body-medium')}">Ready to explore lucid theme with a quick guided tour?</div><div class="tour-button-wrapper">${createButton('skip-btn tour-btn', 'Skip Tour')}${createButton('start-tour-btn tour-btn', 'Start Tour')}</div>`,
  });
  modal.setContent(modalContent);

  (
    document.getElementById('lucid-main') ??
    document.getElementById('main') ??
    document.body
  )?.appendChild(modal);

  const startTourButton = modalContent.querySelector('.start-tour-btn') as HTMLButtonElement;
  const skipTourButton = modalContent.querySelector('.skip-btn') as HTMLButtonElement;

  startTourButton.onclick = () => {
    tourElement.start();
    tourElement.tourSteps = getTourSteps();
    modal?.close();
  };

  skipTourButton.onclick = () => {
    tourElement.endTour();
    modal?.close();
  };

  modal?.open();
};
setupTour();

window.guide = { open: startTour, setup: setupTour };
