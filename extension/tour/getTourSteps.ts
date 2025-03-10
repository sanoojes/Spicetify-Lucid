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
      content: 'Welcome to Lucid Settings! Here you can customize every aspect of your theme.',
      arrow: false,
      interactiveElementsSelectors: ['.modal-header-container'],
    },
    {
      target: 'setting-section[data-tab-id="background"] .header-wrapper',
      content: 'Let\'s start with the "Background" tab to explore the theme background options.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: ['setting-section[data-tab-id="background"] .header-wrapper'],
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
      content:
        'Here you can change the background mode. Try switching between Animated, Solid Color, and Static Image to see different background types.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
      ],
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
      content:
        'Move to the "Color" group and check "Dynamic Color". This feature makes your theme colors adapt to the album art of the currently playing song!',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
      ],
    },
    {
      target: 'setting-section[data-tab-id="interface"] .header-wrapper',
      content: 'Now, let\'s jump to the "Interface" tab to customize the look and feel of the UI.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: ['setting-section[data-tab-id="interface"] .header-wrapper'],
      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-section[data-tab-id="interface"] .header-wrapper')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },
    {
      target:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="google fonts"]',
      content:
        'In the "Font" group, you can enable "Google Fonts" to unlock a vast library of fonts for your theme.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="google fonts"]',
      ],
      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-field[data-field-id="google fonts"]')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },
    {
      target: 'setting-section[data-tab-id="interface"] setting-field[data-field-id="style"]',
      content:
        'Scroll down to the "Border" group. Here, you can change the "Style" of the application border to something other than the default solid line.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="style"]',
      ],
      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-field[data-field-id="style"]')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },
    {
      target: 'setting-section[data-tab-id="playbar settings"] .header-wrapper',
      content: 'Let\'s move to the "Playbar Settings" tab to customize the playbar at the bottom.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="playbar settings"] .header-wrapper',
      ],
      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="playbar settings"] .header-wrapper'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },
    {
      target:
        'setting-section[data-tab-id="playbar settings"] setting-field[data-field-id="playbar type"]',
      content:
        'Try changing the "Playbar Type" between "Default" and "Compact" to see how it changes the layout.',
      arrow: true,
      wait: 700,
      interactiveElementsSelectors: [
        'setting-section[data-tab-id="playbar settings"] setting-field[data-field-id="playbar type"]',
      ],
      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-field[data-field-id="playbar type"]')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },

    {
      target: 'lucid-settings-modal custom-button.close',
      content:
        "That's a quick tour of some key settings! Feel free to explore the other tabs and options. Click here to close the settings when you are done.",
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
