import type { TourStep } from '@components/tour/tour.ts';

export const settingEventCb = () => {
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
            interactiveElementsSelector: "button[aria-label='Lucid Settings']",
          },
        ]
      : [
          {
            target: '.main-userWidget-box',
            content: 'Settings open button is in this context menu. Click to open it.',
            onComplete: () => {
              (document.querySelector('.main-userWidget-box') as HTMLButtonElement | null)?.click();
            },
            interactiveElementsSelector: '.main-userWidget-box',
          },
          {
            target: '.main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)',
            content: 'Click here to open settings.',
            wait: 500,
            onComplete: onSettingOpen,
            interactiveElementsSelector:
              '.main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)',
          },
        ];

  const tourSteps: TourStep[] = [
    ...settingsPositionStep,
    {
      target: 'lucid-settings-modal .modal-header-container',
      content: 'Welcome to Lucid Settings! Here you can customize every aspect of your theme.',
      arrow: false,
      interactiveElementsSelector: '.modal-header-container',
    },
    {
      target: 'setting-section[data-tab-id="background"] .header-wrapper',
      content: 'Let\'s start with the "Background" tab to explore the theme background options.',
      arrow: true,
      wait: 700,
      interactiveElementsSelector: 'setting-section[data-tab-id="background"] .header-wrapper',
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
      content:
        'Here you can change the background mode. Try switching between Animated, Solid Color, and Static Image to see different background types.',
      arrow: true,
      wait: 700,
      position: 'bottom left',
      interactiveElementsSelector:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
      content:
        "Checkout new Dynamic Color. This feature automatically adapts your theme’s colors to match the album art of the song that's playing. Try switching songs to see the effect in action!",
      arrow: true,
      wait: 700,
      interactiveElementsSelector:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
    },
    {
      target: 'setting-section[data-tab-id="interface"] .header-wrapper',
      content: 'Now, let\'s jump to the "Interface" tab to customize the look and feel of the UI.',
      arrow: true,
      wait: 700,
      interactiveElementsSelector: 'setting-section[data-tab-id="interface"] .header-wrapper',
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
      target: 'setting-section[data-tab-id="interface"] setting-group[data-group-id="font"]',
      content:
        'Here you can enable "Google Fonts" to unlock a vast library of fonts for your theme.',
      arrow: true,
      wait: 700,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="google fonts"]',

      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="interface"] setting-group[data-group-id="font"]'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
    },
    {
      target: 'setting-section[data-tab-id="interface"] setting-group[data-group-id="border"]',
      content: 'Here, you can change the look and style of the application border.',
      arrow: true,
      wait: 700,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="style"]',

      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-group[data-group-id="border"]')
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
      interactiveElementsSelector:
        'setting-section[data-tab-id="playbar settings"] .header-wrapper',

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
      interactiveElementsSelector:
        'setting-section[data-tab-id="playbar settings"] setting-field[data-field-id="playbar type"]',

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
      },
      interactiveElementsSelector: 'lucid-settings-modal custom-button.close',
    },
  ];

  return tourSteps;
}
