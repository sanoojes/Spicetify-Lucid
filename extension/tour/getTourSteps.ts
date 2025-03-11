import type { TourStep } from '@components/tour/tour.ts';
import appSettingsStore from '@store/setting.ts';
import { modalState } from '@store/modal.ts';

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
      target: 'setting-section[data-tab-id="general"] .header-wrapper',
      content: 'Let\'s start in the "General" tab to customize basic settings.',
      arrow: true,
      wait: 700,
      interactiveElementsSelector: 'setting-section[data-tab-id="general"] .header-wrapper',
    },
    {
      target: 'setting-field[data-field-id="floating window"] .label-wrapper',
      content:
        'First, let\'s look at "Floating Window" setting. Control if the settings window floats or stays embedded.',
      arrow: true,
      interactiveElementsSelector: 'setting-field[data-field-id="floating window"] .label-wrapper',
      onStart: () => {
        modalState.setState((state) => ({ ...state, isFloating: true }));
      },
    },
    {
      target: 'setting-field[data-field-id="window position"] .label-wrapper',
      content:
        'Next, "Window Position". Choose where you want the settings to open - Navigation bar or Context menu.',
      arrow: true,
      interactiveElementsSelector: 'setting-field[data-field-id="window position"] .label-wrapper',
    },
    {
      target: 'setting-section[data-tab-id="interface"] .header-wrapper',
      content: 'Now, we are moving to the "Interface" tab to customize page and sidebar styles.',
      arrow: true,
      interactiveElementsSelector: 'setting-section[data-tab-id="interface"] .header-wrapper',
      onStart: () => {
        document
          .querySelector<HTMLElement>('setting-section[data-tab-id="interface"] .header-wrapper')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
      wait: 500,
    },
    {
      target:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="background style"] .label-wrapper',
      content:
        'In "Interface", find "Background Style". Here you can change the overall style of pages background.',
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="background style"] .label-wrapper',
      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="interface"] setting-field[data-field-id="background style"] .label-wrapper'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
      wait: 500,
    },
    {
      target:
        'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] .header-wrapper',
      content: 'Still in "Interface", let\'s customize "Now Playing View" sidebar.',
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] .header-wrapper',
      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] .header-wrapper'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
      wait: 500,
    },
    {
      target:
        'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] setting-field[data-field-id="view mode"] .label-wrapper',
      content:
        'Within "Now Playing View" settings, you can switch between "Normal" and "Compact" view modes for the sidebar.',
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] setting-field[data-field-id="view mode"] .label-wrapper',
      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] setting-field[data-field-id="view mode"] .label-wrapper'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
      wait: 500,
    },
    {
      target: 'setting-section[data-tab-id="background"] .header-wrapper',
      content: 'Next, we will check "Background" tab to explore the theme background options.',
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
      target: 'setting-section[data-tab-id="interface"] setting-group[data-group-id="font"]',
      content:
        'In "Interface" tab, Here you can enable "Google Fonts" to unlock a vast library of fonts for your theme.',
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
      content:
        'Still in "Interface" tab, here, you can change the look and style of the application border.',
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
      target: 'setting-section[data-tab-id="advanced settings"] .header-wrapper',
      content: 'Finally, explore "Advanced Settings" tab for more control over the theme behavior.',
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="advanced settings"] .header-wrapper',
      onStart: () => {
        document
          .querySelector<HTMLElement>(
            'setting-section[data-tab-id="advanced settings"] .header-wrapper'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      },
      wait: 500,
    },
    {
      target: 'lucid-settings-modal custom-button.close',
      content:
        "That's all for the essential settings tour! Explore other options to fully customize Lucid. Click here to close settings.",
      arrow: true,
      onComplete: () => {
        window?.lucid?.settings?.settingModal?.removeEventListener('close', settingEventCb);
      },
      interactiveElementsSelector: 'lucid-settings-modal custom-button.close',
    },
  ] satisfies TourStep[];

  return tourSteps;
}
