import type { TourStep } from '@components/tour/tour.ts';
import appSettingsStore from '@store/setting.ts';
import { modalState } from '@store/modal.ts';
import { openSettings } from '@app/hooks/settings.ts';

export const settingEventCb = () => {
  window?.lucid?.settings?.openSettings?.();
};

const tourText = {
  navBtn: 'Click here to open settings.',
  ctxMenu: 'Settings open button is in this context menu. Click to open it.',
  ctxMenuItem: 'Click here to open settings.',
  welcomeModal: 'Welcome to Lucid Settings! Here you can customize every aspect of your theme.',
  genTab: 'Let\'s start in the "General" tab to customize basic settings.',
  floatWin:
    'First, let\'s look at "Floating Window" setting. Control if the settings window floats or stays embedded.',
  winPos:
    'Next, "Window Position". Choose where you want the settings to open - Navigation bar or Context menu.',
  intfTab: 'Now, we are moving to the "Interface" tab to customize page and sidebar styles.',
  bgStyle:
    'In "Interface", find "Background Style". Here you can change the overall style of pages background.',
  npViewGrp: 'Still in "Interface", let\'s customize "Now Playing View" sidebar.',
  npViewMode:
    'Within "Now Playing View" settings, you can switch between "Normal" and "Compact" view modes for the sidebar.',
  bgTab: 'Next, we will check "Background" tab to explore the theme background options.',
  bgMode:
    'Here you can change the background mode. Try switching between Animated, Solid Color, and Static Image to see different background types.',
  dynColor:
    "Checkout new Dynamic Color. This feature automatically adapts your theme’s colors to match the album art of the song that's playing. Try switching songs to see the effect in action!",
  gFontsGrp:
    'In "Interface" tab, Here you can enable "Google Fonts" to unlock a vast library of fonts for your theme.',
  borderGrp:
    'Still in "Interface" tab, here, you can change the look and style of the application border.',
  playbarTab: 'Let\'s move to the "Playbar Settings" tab to customize the playbar at the bottom.',
  playbarType:
    'Try changing the "Playbar Type" between "Default" and "Compact" to see how it changes the layout.',
  advTab: 'Finally, explore "Advanced Settings" tab for more control over the theme behavior.',
  closeModal:
    "That's all for the essential settings tour! Explore other options to fully customize Lucid. Click here to close settings.",
};

export function getTourSteps(settings = appSettingsStore.getState()) {
  function onSettingOpen() {
    openSettings();
    window?.lucid?.settings?.settingModal?.addEventListener('close', settingEventCb, {
      once: true,
    });
  }

  const settingsPositionStep: TourStep[] =
    settings.position === 'nav'
      ? [
          {
            target: "button[aria-label='Lucid Settings']",
            content: tourText.navBtn,
            onComplete: onSettingOpen,
            interactiveElementsSelector: "button[aria-label='Lucid Settings']",
          },
        ]
      : [
          {
            target: '.main-userWidget-box',
            content: tourText.ctxMenu,
            onComplete: () => {
              (document.querySelector('.main-userWidget-box') as HTMLButtonElement | null)?.click();
            },
            interactiveElementsSelector: '.main-userWidget-box',
          },
          {
            target: '.main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)',
            content: tourText.ctxMenuItem,
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
      content: tourText.welcomeModal,
      arrow: false,
      interactiveElementsSelector: '.modal-header-container',
    },
    {
      target: 'setting-section[data-tab-id="general"] .header-wrapper',
      content: tourText.genTab,
      arrow: true,
      wait: 700,
      interactiveElementsSelector: 'setting-section[data-tab-id="general"] .header-wrapper',
    },
    {
      target: 'setting-field[data-field-id="floating window"] .label-wrapper',
      content: tourText.floatWin,
      arrow: true,
      interactiveElementsSelector: 'setting-field[data-field-id="floating window"]',
      onStart: () => {
        modalState.setState((state) => ({ ...state, isFloating: true }));
      },
    },
    {
      target: 'setting-field[data-field-id="window position"] .label-wrapper',
      content: tourText.winPos,
      arrow: true,
      interactiveElementsSelector: 'setting-field[data-field-id="window position"]',
    },
    {
      target: 'setting-section[data-tab-id="interface"] .header-wrapper',
      content: tourText.intfTab,
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
      content: tourText.bgStyle,
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-field[data-field-id="background style"]',
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
      content: tourText.npViewGrp,
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
      content: tourText.npViewMode,
      arrow: true,
      interactiveElementsSelector:
        'setting-section[data-tab-id="interface"] setting-group[data-group-id="now playing view"] setting-field[data-field-id="view mode"]',
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
      content: tourText.bgTab,
      arrow: true,
      wait: 700,
      interactiveElementsSelector: 'setting-section[data-tab-id="background"] .header-wrapper',
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
      content: tourText.bgMode,
      arrow: true,
      wait: 700,
      position: 'bottom left',
      interactiveElementsSelector:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="background mode"]',
    },
    {
      target:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
      content: tourText.dynColor,
      arrow: true,
      wait: 700,
      interactiveElementsSelector:
        'setting-section[data-tab-id="background"] setting-field[data-field-id="dynamic color"]',
    },

    {
      target: 'setting-section[data-tab-id="interface"] setting-group[data-group-id="font"]',
      content: tourText.gFontsGrp,
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
      content: tourText.borderGrp,
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
      content: tourText.playbarTab,
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
      content: tourText.playbarType,
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
      content: tourText.advTab,
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
      content: tourText.closeModal,
      arrow: true,
      onComplete: () => {
        window?.lucid?.settings?.settingModal?.removeEventListener('close', settingEventCb);
        window.dispatchEvent(new CustomEvent('remove-tour'));
      },
      interactiveElementsSelector: 'lucid-settings-modal',
    },
  ] satisfies TourStep[];

  return tourSteps;
}
