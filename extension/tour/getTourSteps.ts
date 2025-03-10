import type { TourStep } from '@components/tour/tour.ts';

const settingEventCb = () => {
  window?.lucid?.settings?.openSettings?.();
};

export function getTourSteps(settings = window?.lucid?.store?.getState()) {
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
