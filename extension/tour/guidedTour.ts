import { getTextClass } from '@utils/styles/encoreUtils.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type { AppSettings } from '@app/types/settings.ts';
import { Modal } from '@components/modal.ts';
import { createButton, GuidedTourElement } from '@components/tour/tour.ts';
import { getTourSteps, settingEventCb } from '@app/tour/getTourSteps.ts';
import { GUIDE_STORAGE_KEY } from '@app/constant.ts';
import appSettingsStore from '@store/setting.ts';
import { showNotification } from '@utils/showNotification.ts';

let currentModal: Modal | null = null;
let currentTourElement: GuidedTourElement | null = null;

const handleStartTour = () => {
  if (!currentTourElement) return;
  localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
  currentTourElement.start();
  removeModal();
  document.body.appendChild(currentTourElement);
};

const handleSkipTour = () => {
  if (!currentTourElement) return;
  localStorage.setItem(GUIDE_STORAGE_KEY, 'true');
  currentTourElement.endTour();
  removeModal();
  window?.lucid?.settings?.settingModal?.removeEventListener('close', settingEventCb);
};

const createModalContent = () => {
  const modalContent = createElement('div', {
    className: 'tour-container arrow-hidden visible full-width',
    style: { position: 'relative' },
    innerHTML: `<div class="tour-arrow"></div><div class="tour-message ${getTextClass('body-medium')}">Ready to explore lucid theme with a quick guided tour?</div><div class="tour-button-wrapper">${createButton('skip-btn tour-btn', 'Skip Tour')}${createButton('start-tour-btn tour-btn', 'Start Tour')}</div>`,
  });

  const startTourButton = modalContent.querySelector('.start-tour-btn') as HTMLButtonElement;
  const skipTourButton = modalContent.querySelector('.skip-btn') as HTMLButtonElement;

  startTourButton.addEventListener('click', handleStartTour);
  skipTourButton.addEventListener('click', handleSkipTour);
  return modalContent;
};

const startModal = () => {
  currentModal = new Modal();
  currentModal.setHeader('Welcome to Lucid Theme!');
  currentModal.setContent(createModalContent());
};

const renderModal = () => {
  if (!currentModal) return;
  (document.getElementById('main') ?? document.body)?.appendChild(currentModal);
  currentModal.open();
};

const removeModal = () => {
  if (!currentModal) return;
  currentModal.close();
  currentModal = null;
};

export const openTour = () => {
  try {
    localStorage.removeItem(GUIDE_STORAGE_KEY);
    startTour();
  } catch (e) {
    console.error('Error opening guide', e);
    showNotification('Error opening guide');
  }
};

export const startTour = () => {
  try {
    if (localStorage.getItem(GUIDE_STORAGE_KEY) === 'true') {
      return;
    }
    localStorage.setItem(GUIDE_STORAGE_KEY, 'true');

    currentTourElement = new GuidedTourElement();
    const updateTourSteps = (settings?: AppSettings) => {
      if (currentTourElement) currentTourElement.tourSteps = getTourSteps(settings);
    };
    updateTourSteps();
    appSettingsStore.subscribe(updateTourSteps, 'position');

    startModal();
    renderModal();
  } catch (e) {
    console.error('Error in tour: ', e);
  }
};
