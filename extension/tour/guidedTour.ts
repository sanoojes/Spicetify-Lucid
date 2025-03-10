import { getTextClass } from '@utils/styles/encoreUtils.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type { AppSettings } from '@app/types/settings.ts';
import type { Modal } from '@components/settings/modal.ts';
import { createButton, GuidedTourElement, type TourStep } from '@components/tour/tour.ts';

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

window.guide = { open: startTour };
