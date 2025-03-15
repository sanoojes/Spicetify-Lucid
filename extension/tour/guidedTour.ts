import { getTextClass } from '@utils/styles/encoreUtils.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type { AppSettings } from '@app/types/settings.ts';
import type { Modal } from '@components/modal.ts';
import { createButton, GuidedTourElement } from '@components/tour/tour.ts';
import { getTourSteps, settingEventCb } from '@app/tour/getTourSteps.ts';
import { GUIDE_STORAGE_KEY } from '@app/constant.ts';

let modal: Modal | null = null;

export const startTour = () => {
  try {
    if (!modal) setupTour();
    modal?.open();
  } catch (e) {
    console.error('Failed to open guided tour modal.', e);
  }
};

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
    className: 'tour-container arrow-hidden visible full-width',
    style: { position: 'relative' },
    html: `<div class="tour-arrow"></div><div class="tour-message ${getTextClass('body-medium')}">Ready to explore lucid theme with a quick guided tour?</div><div class="tour-button-wrapper">${createButton('skip-btn tour-btn', 'Skip Tour')}${createButton('start-tour-btn tour-btn', 'Start Tour')}</div>`,
  });
  modal.setContent(modalContent);

  (
    document.getElementById('lucid-main') ??
    document.getElementById('main') ??
    document.body
  )?.appendChild(modal);

  localStorage.removeItem(GUIDE_STORAGE_KEY);

  const startTourButton = modalContent.querySelector('.start-tour-btn') as HTMLButtonElement;
  const skipTourButton = modalContent.querySelector('.skip-btn') as HTMLButtonElement;

  startTourButton.onclick = () => {
    localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
    tourElement.start();
    tourElement.tourSteps = getTourSteps();
    modal?.close();

    document.body.appendChild(tourElement);
  };

  skipTourButton.onclick = () => {
    localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
    tourElement.endTour();
    modal?.close();
    window?.lucid?.settings?.settingModal?.removeEventListener('close', settingEventCb);
  };

  modal?.open();
};
setupTour();

window.guide = { open: startTour };
