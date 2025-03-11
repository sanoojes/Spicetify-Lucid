import { FloatingModal } from '@components/modal.ts';
import { modalState } from '@store/modal.ts';
import appSettingsStore from '@store/setting.ts';
import { addSettingAccess } from '@utils/addSettingAccess.ts';
import { type Settings, SettingsMain } from '@components/settings/section.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type {
  BackgroundMode,
  BorderStyle,
  GrainSettings,
  PageStyle,
  PlaybarTypes,
  RightSidebarMode,
  RightSidebarPosition,
  SettingsPosition,
  UMVSettings,
} from '@app/types/settings.ts';
import {
  isValidGoogleFontURL,
  isValidNumberInRange10,
  isValidNumberInRange200,
  isValidUrl,
  isValidNumberInRange256,
  isValidNumberInRange100,
  isValidNumberInRange512,
} from '@utils/validationUtils.ts';
import { isWindows } from '@utils/platformUtils.ts';
import { copyToClipboard } from '@utils/clipboardUtils.ts';
import { isValidAppSettings } from '@utils/settingsValidator.ts';
import { mountAndOpenGuide } from '@app/hooks/guide.ts';

let _openSettings: (() => void) | null = null;
let _closeSettings: (() => void) | null = null;

export const settingModal: FloatingModal = new FloatingModal();
export const openSettings = () => {
  _openSettings?.();
};

export const closeSettings = () => {
  _closeSettings?.();
};

window.lucid.settings = {
  openSettings,
  closeSettings,
  settingModal,
};

const getSettingsContents = () => {
  const settingsContainer = createElement('div', { id: 'settings-container' });
  const settingSectionElement = new SettingsMain();
  settingSectionElement.isRender = true;
  settingSectionElement.options = getSettings();

  appSettingsStore.subscribe((state) => {
    settingSectionElement.options = getSettings(state);
  });

  settingsContainer.appendChild(settingSectionElement);

  return settingsContainer;
};

export function mountSettings(lucidMain: HTMLElement) {
  settingModal.isFloating = modalState.getState().isFloating;
  settingModal.setContent(getSettingsContents());

  modalState.subscribe((state) => {
    settingModal.isFloating = state.isFloating;
  }, 'isFloating');

  (lucidMain ?? document.getElementById('main'))?.append(settingModal);

  _openSettings = () => settingModal.open();
  _closeSettings = () => settingModal.close();
  addSettingAccess(appSettingsStore.getState().position, openSettings);

  appSettingsStore.subscribe((state) => {
    if (_openSettings) addSettingAccess(state.position, openSettings);
  }, 'position');
}

const fieldTexts: Record<string, string[]> = {
  'floating-window': [
    'Floating Window',
    'Allows the settings window to float above other content. Drag the header to reposition it.',
  ],
  'window-position': [
    'Window Position',
    'Choose where the settings window opens: from the context menu or the navigation bar.',
  ],
  'background-mode': ['Background Mode', 'Select the type of background you want to display.'],
  'solid-color': ['Solid Color', 'Pick a solid background color using the color picker.'],
  'custom-image': [
    'Custom Image',
    'Use a custom image URL for the static background instead of the default image.',
  ],
  'custom-image-url': [
    'Custom Image URL',
    'Enter the full URL of the image for your static background. URL validation is enabled.',
  ],
  'static-image-blur': [
    'Image Blur',
    'Adjust the blur level of the static background image (0-200). 0 is no blur, 200 is maximum blur.',
  ],
  'static-image-brightness': [
    'Image Brightness',
    'Adjust the brightness of the static background image (0-200). 0 is darkest, 200 is brightest.',
  ],
  'static-image-saturation': [
    'Image Saturation',
    'Adjust the color saturation of the static background image (0-200). 0 is grayscale, 200 is highly saturated.',
  ],
  'animated-blur': [
    'Animation Blur',
    'Adjust the blur level of the animated background (0-200). 0 is no blur, 200 is maximum blur.',
  ],
  'animated-brightness': [
    'Animation Brightness',
    'Adjust the brightness of the animated background (0-200). 0 is darkest, 200 is brightest.',
  ],
  'animated-saturation': [
    'Animation Saturation',
    'Adjust the color saturation of the animated background (0-200). 0 is grayscale, 200 is highly saturated.',
  ],
  'dynamic-color': [
    'Dynamic Color',
    'Enable dynamic color themes based on the artwork of the currently playing music.',
  ],
  'tonal-color': [
    'Tonal Color',
    'Apply a tonal color scheme for a more harmonious user interface.',
  ],
  'custom-color-enable': [
    'Custom Color',
    'Enable a custom color to override the default or dynamic theme color when dynamic color is off.',
  ],
  'custom-color-picker': [
    'Select Custom Color',
    `Choose a base color for your application theme. For preview, use the <a href="https://material-foundation.github.io/material-theme-builder/">Material Theme Builder</a>`,
  ],
  'google-fonts-enable': [
    'Google Fonts',
    'Enable fonts from Google Fonts for a wider typography selection.',
  ],
  'google-fonts-url': [
    'Google Fonts URL',
    'Enter the URL of the Google Fonts stylesheet to load custom fonts from Google.',
  ],
  'font-family': [
    'Font Family',
    'Enter the name of a font family installed on your system to use as the interface font when Google Fonts is disabled.',
  ],
  'grain-type': [
    'Grain Type',
    'Select the type of grain effect to overlay for a textured appearance.',
  ],
  'win-control-height': [
    'Control Height',
    'Adjust the height of window control buttons (minimize, maximize, close) on Windows (0-200).',
  ],
  'win-panel-gap': ['Panel Gap', 'Set gap between main cards (main, now playing, library).'],
  'border-thickness': ['Thickness', 'Set the thickness of the interface border in pixels (0-10).'],
  'border-color': ['Color', 'Choose the color of the application border using the color picker.'],
  'border-style': ['Style', 'Select the visual style of the interface border.'],
  'pages-background-style': [
    'Background Style',
    'Choose how the background is displayed on different pages.',
  ],
  'pages-enable-home-header': ['Home Header Background', 'Enable/Disable Home header background.'],
  'pages-scroll-fullscreen-image': [
    'Scroll Fullscreen Background Image',
    'Allow the background image to scroll with page content when the playlist background is fullscreen (expanded).',
  ],
  'pages-scale-fullscreen-image': [
    'Scale Fullscreen Background Image',
    'Automatically scale the background image to fit the page width when the playlist background is fullscreen (expanded).',
  ],
  'pages-scroll-npv-image': [
    'Scroll NPV Background Image',
    'Allow the background image to scroll with page content in Now playing art playlist background mode.',
  ],
  'pages-scale-npv-image': [
    'Scale NPV Background Image',
    'Automatically scale the background image to fit the page width in Now playing art playlist background mode.',
  ],
  'pages-scroll-normal-image': [
    'Scroll Normal Background Image',
    'Allow the background image to scroll with page content in normal playlist background mode.',
  ],
  'pages-scale-normal-image': [
    'Scale Normal Background Image',
    'Automatically scale the background image to fit the page width in normal playlist background mode.',
  ],
  'right-sidebar-view-mode': [
    'View Mode',
    "Select between normal or compact display for the 'Now Playing' sidebar.",
  ],
  'right-sidebar-size': [
    'Compact Sidebar Width',
    "Set the width of the 'Now Playing' sidebar when in compact mode.  Enter a value between 0 and 512 pixels.",
  ],
  'right-sidebar-position': [
    'Position',
    "In compact mode, choose if 'Now Playing' appears on the left or right.",
  ],
  'right-sidebar-background-blur': [
    'Background Blur',
    "Adjust the background blur of the 'Now Playing' view in compact mode (0-256).",
  ],
  'right-sidebar-custom-bg-enable': [
    'Custom Background',
    'Enable a custom background for the Now Playing view.',
  ],
  'right-sidebar-background-color': [
    'Background',
    "Set the background color for the 'Now Playing' sidebar.",
  ],
  'right-sidebar-background-alpha': [
    'Background Alpha',
    'Set the background transparency (alpha) value (0-100).',
  ],
  'playbar-type': ['Playbar Type', 'Choose between a Default or Compact style for the playbar.'],
  'compact-playbar-hide-icons': [
    'Hide Extra Playbar Icons',
    'Hides extra icons in compact playbar (visible on hover). Main controls remain visible.',
  ],
  'compact-playbar-height': ['Height', 'Set the height of the compact playbar in pixels.'],
  'normal-playbar-height': ['Height', 'Set the height of the normal playbar in pixels.'],
  'playbar-is-floating': ['Floating', 'Set if the now playing bar is floating.'],
  'playbar-backdrop-blur': [
    'Backdrop Blur',
    'Adjust the blur intensity of the normal playbar backdrop (0-256).',
  ],
  'playbar-backdrop-saturation': [
    'Backdrop Saturation',
    'Adjust the color saturation of the normal playbar backdrop (0-256).',
  ],
  'playbar-backdrop-brightness': [
    'Backdrop Brightness',
    'Adjust the color brightness of the normal playbar backdrop (0-256).',
  ],
  'toggle-changelog-modal': [
    'Show Changelog',
    'Enable or disable the changelog modal that appears after theme updates.',
  ],
  'start-lucid-tour': [
    'Take a Lucid Tour',
    'Start a guided walkthrough of the Lucid theme to learn its features.',
  ],
  'export-app-settings': [
    'Export Settings',
    'Export your settings to the clipboard as JSON for backup or sharing.',
  ],
  'import-app-settings': [
    'Import Settings',
    'Paste exported JSON settings here to import and apply them.',
  ],
  'reset-app-settings': [
    'Reset All Settings',
    'Reset all settings to default values. This is irreversible and will reload the application.',
  ],
  'pages-scroll-type': [
    'Background Image Source',
    'Choose whether to use the Now Playing View art or the default playlist art as the background for pages.',
  ],
};

function getSettings(state = appSettingsStore.getState(), settings = appSettingsStore): Settings {
  return [
    {
      name: 'General',
      render: true,
      groups: [
        {
          render: true,
          name: 'Behavior',
          key: 'group-behavior',
          showName: false,
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'button',
                buttonType: 'primary',
                contents: 'Start',
                onClick: () => {
                  localStorage.removeItem('lucid-guided-tour');
                  closeSettings();
                  mountAndOpenGuide(true);
                },
              },
              label: fieldTexts['start-lucid-tour'][0],
              tooltip: fieldTexts['start-lucid-tour'][1],
              key: 'start-lucid-tour',
            },
            {
              render: true,
              inputOptions: {
                type: 'checkbox',
                checked: modalState.getState().isFloating,
                onChange: (isFloating) => {
                  modalState.setState((state) => ({ ...state, isFloating }));
                },
              },
              label: fieldTexts['floating-window'][0],
              tooltip: fieldTexts['floating-window'][1],
              key: 'floating-window',
            },
            {
              render: true,
              inputOptions: {
                type: 'select',
                value: state.position,
                options: [
                  { label: 'Context Menu', value: 'context-menu' },
                  { label: 'Navigation Bar', value: 'nav' },
                ],
                onChange: (value) => {
                  settings.setPosition(value as SettingsPosition);
                },
              },
              label: fieldTexts['window-position'][0],
              tooltip: fieldTexts['window-position'][1],
              key: 'window-position',
            },
          ],
        },
      ],
    },
    {
      name: 'Background',
      render: true,
      groups: [
        {
          render: true,
          name: 'Mode',
          key: 'group-background-mode',
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'select',
                value: state.background.mode,
                options: [
                  { label: 'Animated', value: 'animated' },
                  { label: 'Solid Color', value: 'solid' },
                  { label: 'Static Image', value: 'static' },
                ],
                onChange: (value) => {
                  settings.setBackgroundMode(value as BackgroundMode);
                },
              },
              label: fieldTexts['background-mode'][0],
              tooltip: fieldTexts['background-mode'][1],
              key: 'background-mode',
            },
            {
              render: state.background.mode === 'solid',
              inputOptions: {
                type: 'color',
                value: state.background.options.solid.color.hex,
                onChange: (hex) => {
                  settings.setSolidBackgroundColor({ hex });
                },
              },
              label: fieldTexts['solid-color'][0],
              tooltip: fieldTexts['solid-color'][1],
              key: 'solid-color',
            },
            {
              render: state.background.mode === 'static',
              inputOptions: {
                type: 'checkbox',
                checked: state.background.options.static.isCustomImage || false,
                onChange: (isCustomImage) => {
                  settings.setStaticBackgroundOptions({ isCustomImage });
                },
              },
              label: fieldTexts['custom-image'][0],
              tooltip: fieldTexts['custom-image'][1],
              key: 'custom-image',
            },
            {
              render:
                state.background.mode === 'static' && state.background.options.static.isCustomImage,
              inputOptions: {
                type: 'text',
                value: state.background.options.static.customImageURL || 'Enter Image URL',
                validator: isValidUrl,
                onChange: (customImageURL) => {
                  settings.setStaticBackgroundOptions({ customImageURL });
                },
              },
              label: fieldTexts['custom-image-url'][0],
              tooltip: fieldTexts['custom-image-url'][1],
              key: 'custom-image-url',
            },
            {
              render: state.background.mode === 'static',
              inputOptions: {
                type: 'number',
                value: state.background.options.static.filter.blur,
                onChange: (blur) => {
                  settings.setStaticBackgroundFilter({ blur });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['static-image-blur'][0],
              tooltip: fieldTexts['static-image-blur'][1],
              key: 'static-image-blur',
            },
            {
              render: state.background.mode === 'static',
              inputOptions: {
                type: 'number',
                value: state.background.options.static.filter.brightness,
                onChange: (brightness) => {
                  settings.setStaticBackgroundFilter({ brightness });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['static-image-brightness'][0],
              tooltip: fieldTexts['static-image-brightness'][1],
              key: 'static-image-brightness',
            },
            {
              render: state.background.mode === 'static',
              inputOptions: {
                type: 'number',
                value: state.background.options.static.filter.saturate,
                onChange: (saturate) => {
                  settings.setStaticBackgroundFilter({ saturate });
                },
                step: 0.1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['static-image-saturation'][0],
              tooltip: fieldTexts['static-image-saturation'][1],
              key: 'static-image-saturation',
            },
            {
              render: state.background.mode === 'animated',
              inputOptions: {
                type: 'number',
                value: state.background.options.animated.filter.blur,
                onChange: (blur) => {
                  settings.setAnimatedBackgroundFilter({ blur });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['animated-blur'][0],
              tooltip: fieldTexts['animated-blur'][1],
              key: 'animated-blur',
            },
            {
              render: state.background.mode === 'animated',
              inputOptions: {
                type: 'number',
                value: state.background.options.animated.filter.brightness,
                onChange: (brightness) => {
                  settings.setAnimatedBackgroundFilter({ brightness });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['animated-brightness'][0],
              tooltip: fieldTexts['animated-brightness'][1],
              key: 'animated-brightness',
            },
            {
              render: state.background.mode === 'animated',
              inputOptions: {
                type: 'number',
                value: state.background.options.animated.filter.saturate,
                onChange: (saturate) => {
                  settings.setAnimatedBackgroundFilter({ saturate });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              label: fieldTexts['animated-saturation'][0],
              tooltip: fieldTexts['animated-saturation'][1],
              key: 'animated-saturation',
            },
          ],
        },
        {
          render: true,
          name: 'Color',
          key: 'group-color',
          fields: [
            {
              key: 'dynamic-color',
              render: true,
              label: fieldTexts['dynamic-color'][0],
              tooltip: fieldTexts['dynamic-color'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.color.isDynamic,
                onChange: (value) => {
                  settings.setDynamicColor(value);
                },
              },
            },
            {
              key: 'tonal-color',
              render: true,
              label: fieldTexts['tonal-color'][0],
              tooltip: fieldTexts['tonal-color'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.color.isTonal,
                onChange: (value) => {
                  settings.setTonalColor(value);
                },
              },
            },
            {
              key: 'custom-color-enable',
              render: !state.color.isDynamic,
              label: fieldTexts['custom-color-enable'][0],
              tooltip: fieldTexts['custom-color-enable'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.color.isCustom,
                onChange: (value) => {
                  settings.setIsCustomColor(value);
                },
              },
            },
            {
              key: 'custom-color-picker',
              render: !state.color.isDynamic && state.color.isCustom,
              label: fieldTexts['custom-color-picker'][0],
              tooltip: fieldTexts['custom-color-picker'][1],
              inputOptions: {
                type: 'color',
                value: state.color.customColor.hex,
                onChange: (hex) => {
                  settings.setCustomColor({ hex });
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Interface',
      render: true,
      groups: [
        {
          render: true,
          name: 'Font',
          key: 'group-font',
          fields: [
            {
              render: true,
              key: 'google-fonts-enable',
              label: fieldTexts['google-fonts-enable'][0],
              tooltip: fieldTexts['google-fonts-enable'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.font.isGoogleFonts,
                onChange: (isGoogleFonts) => {
                  settings.setFont({ isGoogleFonts });
                },
              },
            },
            {
              render: state.font.isGoogleFonts,
              key: 'google-fonts-url',
              label: fieldTexts['google-fonts-url'][0],
              tooltip: fieldTexts['google-fonts-url'][1],
              inputOptions: {
                type: 'text',
                value: state.font.fontUrl || '',
                validator: isValidGoogleFontURL,
                onChange: (fontUrl) => {
                  settings.setFont({ fontUrl });
                },
              },
            },
            {
              render: !state.font.isGoogleFonts,
              key: 'font-family',
              label: fieldTexts['font-family'][0],
              tooltip: fieldTexts['font-family'][1],
              inputOptions: {
                type: 'text',
                value: state.font.fontFamily || '',
                onChange: (fontFamily) => {
                  settings.setFont({ fontFamily });
                },
              },
            },
          ],
        },
        {
          render: true,
          key: 'group-grain-effect',
          name: 'Grain Effect',
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'select',
                value: state.grains.type,
                options: [
                  { label: 'Normal', value: 'default' },
                  { label: 'Starry', value: 'starry' },
                  { label: 'None', value: 'none' },
                ],
                onChange: (value) => {
                  settings.setGrainsType(value as GrainSettings['type']);
                },
              },
              label: fieldTexts['grain-type'][0],
              tooltip: fieldTexts['grain-type'][1],
              key: 'grain-type',
            },
          ],
        },
        {
          render: true,
          key: 'group-window-controls',
          name: 'Window',
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'number',
                step: 1,
                value: state.pages.panelGap,
                validator: isValidNumberInRange100,
                onChange: (panelGap) => {
                  settings.setPages({ panelGap });
                },
              },
              label: fieldTexts['win-panel-gap'][0],
              tooltip: fieldTexts['win-panel-gap'][1],
              key: 'win-panel-gap',
            },

            {
              render: isWindows(),
              inputOptions: {
                type: 'number',
                step: 1,
                value: state.control.height,
                validator: isValidNumberInRange200,
                onChange: (value) => {
                  settings.setControlHeight(value);
                },
              },
              label: fieldTexts['win-control-height'][0],
              tooltip: fieldTexts['win-control-height'][1],
              key: 'win-control-height',
            },
          ],
        },
        {
          render: true,
          key: 'group-border',
          name: 'Border',
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'number',
                step: 1,
                value: state.border.thickness,
                validator: isValidNumberInRange10,
                onChange: (thickness) => {
                  settings.setBorder({ thickness });
                },
              },
              label: fieldTexts['border-thickness'][0],
              tooltip: fieldTexts['border-thickness'][1],
              key: 'border-thickness',
            },
            {
              render: true,
              inputOptions: {
                type: 'color',
                value: state.border.color.hex,
                onChange: (hex) => {
                  settings.setBorderColor({ hex });
                },
              },
              label: fieldTexts['border-color'][0],
              tooltip: fieldTexts['border-color'][1],
              key: 'border-color',
            },
            {
              render: true,
              label: fieldTexts['border-style'][0],
              key: 'border-style',
              inputOptions: {
                type: 'select',
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Solid', value: 'solid' },
                  { label: 'Dotted', value: 'dotted' },
                  { label: 'Dashed', value: 'dashed' },
                  { label: 'Double', value: 'double' },
                  { label: 'Groove', value: 'groove' },
                  { label: 'Ridge', value: 'ridge' },
                  { label: 'Inset', value: 'inset' },
                  { label: 'Outset', value: 'outset' },
                ],
                onChange: (style) => {
                  settings.setBorder({ style: style as BorderStyle });
                },
                value: state.border.style,
              },
              tooltip: fieldTexts['border-style'][1],
            },
          ],
        },
        {
          render: true,
          key: 'group-page-display',
          name: 'Page Display',
          fields: [
            {
              key: 'pages-background-style',
              label: fieldTexts['pages-background-style'][0],
              render: true,
              tooltip: fieldTexts['pages-background-style'][1],
              inputOptions: {
                type: 'select',
                value: state.pages.style,
                onChange: (style) => {
                  settings.setPageStyle(style as PageStyle);
                },
                options: [
                  { label: 'Default', value: 'normal' },
                  { label: 'Card', value: 'card' },
                  { label: 'Compact', value: 'compact' },
                  { label: 'Compact Card', value: 'compact-card' },
                ],
              },
            },
            {
              render: true,
              key: 'pages-enable-home-header',
              label: fieldTexts['pages-enable-home-header'][0],
              tooltip: fieldTexts['pages-enable-home-header'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.hideHomeHeader,
                onChange: (hideHomeHeader) => {
                  settings.setPages({ hideHomeHeader });
                },
              },
            },
            {
              render: true,
              key: 'pages-scroll-type',
              label: fieldTexts['pages-scroll-type'][0],
              tooltip: fieldTexts['pages-scroll-type'][1],
              inputOptions: {
                type: 'select',
                value: state.pages.umv.type,
                options: [
                  { value: 'normal', label: 'Default' },
                  { value: 'npv', label: 'Now Playing Art' },
                ],
                onChange: (type) => {
                  settings.setUMV({ type: type as UMVSettings['type'] });
                },
              },
            },
            {
              render: state.pages.umv.type === 'normal',
              key: 'pages-scroll-normal-image',
              label: fieldTexts['pages-scroll-normal-image'][0],
              tooltip: fieldTexts['pages-scroll-normal-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.normal.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('normal', { isScroll });
                },
              },
            },
            {
              render: state.pages.umv.type === 'normal',
              key: 'pages-scale-normal-image',
              label: fieldTexts['pages-scale-normal-image'][0],
              tooltip: fieldTexts['pages-scale-normal-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.normal.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('normal', { isScaling });
                },
              },
            },
            {
              render: state.pages.umv.type === 'npv',
              key: 'pages-scroll-npv-image',
              label: fieldTexts['pages-scroll-npv-image'][0],
              tooltip: fieldTexts['pages-scroll-npv-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.npv.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('npv', { isScroll });
                },
              },
            },
            {
              render: state.pages.umv.type === 'npv',
              key: 'pages-scale-normal-image',
              label: fieldTexts['pages-scale-npv-image'][0],
              tooltip: fieldTexts['pages-scale-npv-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.npv.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('npv', { isScaling });
                },
              },
            },
            {
              render: true,
              key: 'pages-scroll-fullscreen-image',
              label: fieldTexts['pages-scroll-fullscreen-image'][0],
              tooltip: fieldTexts['pages-scroll-fullscreen-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.expanded.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('expanded', { isScroll });
                },
              },
            },
            {
              render: true,
              key: 'pages-scale-fullscreen-image',
              label: fieldTexts['pages-scale-fullscreen-image'][0],
              tooltip: fieldTexts['pages-scale-fullscreen-image'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.pages.umv.options.expanded.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('expanded', { isScaling });
                },
              },
            },
          ],
        },
        {
          render: true,
          key: 'group-now-playing-view',
          name: 'Now Playing View',
          fields: [
            {
              key: 'right-sidebar-view-mode',
              label: fieldTexts['right-sidebar-view-mode'][0],
              render: true,
              tooltip: fieldTexts['right-sidebar-view-mode'][1],
              inputOptions: {
                type: 'select',
                value: state.rightSidebar.mode,
                options: [
                  { label: 'Normal', value: 'normal' },
                  { label: 'Compact', value: 'compact' },
                ],
                onChange: (mode) => {
                  settings.setRightSidebar({ mode: mode as RightSidebarMode });
                },
              },
            },
            {
              key: 'right-sidebar-size',
              label: fieldTexts['right-sidebar-size'][0],
              render: state.rightSidebar.mode === 'compact',
              inputOptions: {
                type: 'number',
                value: state.rightSidebar.size,
                validator: isValidNumberInRange512,
                onChange: (size) => {
                  settings.setRightSidebar({ size });
                },
              },
              tooltip: fieldTexts['right-sidebar-size'][1],
            },
            {
              key: 'right-sidebar-position',
              label: fieldTexts['right-sidebar-position'][0],
              render: state.rightSidebar.mode === 'compact',
              inputOptions: {
                type: 'select',
                value: state.rightSidebar.position,
                options: [
                  { label: 'Top Left', value: 'top left' },
                  { label: 'Top Right', value: 'top right' },
                  { label: 'Bottom Left', value: 'bottom left' },
                  { label: 'Bottom Right', value: 'bottom right' },
                ],
                onChange: (position) => {
                  settings.setRightSidebar({ position: position as RightSidebarPosition });
                },
              },
              tooltip: fieldTexts['right-sidebar-position'][1],
            },
            {
              key: 'right-sidebar-background-blur',
              label: fieldTexts['right-sidebar-background-blur'][0],
              render: state.rightSidebar.mode === 'compact',
              inputOptions: {
                type: 'number',
                value: state.rightSidebar.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setRightSidebar({ blur });
                },
              },
              tooltip: fieldTexts['right-sidebar-background-blur'][1],
            },
            {
              render: true,
              inputOptions: {
                type: 'checkbox',
                checked: state.rightSidebar.isCustomBg,
                onChange: (isCustomBg) => {
                  settings.setRightSidebar({ isCustomBg });
                },
              },
              label: fieldTexts['right-sidebar-custom-bg-enable'][0],
              tooltip: fieldTexts['right-sidebar-custom-bg-enable'][1],
              key: 'right-sidebar-custom-bg-enable',
            },
            {
              key: 'right-sidebar-background-color',
              label: fieldTexts['right-sidebar-background-color'][0],
              render: state.rightSidebar.isCustomBg,
              inputOptions: {
                type: 'color',
                value: state.rightSidebar.color.hex,
                onChange: (hex) => {
                  settings.setRightSidebarColor({ hex });
                },
              },
              tooltip: fieldTexts['right-sidebar-background-color'][1],
            },
            {
              key: 'right-sidebar-background-alpha',
              label: fieldTexts['right-sidebar-background-alpha'][0],
              render: state.rightSidebar.isCustomBg,
              inputOptions: {
                type: 'number',
                value: state.rightSidebar.color.alpha,
                validator: isValidNumberInRange100,
                onChange: (alpha) => {
                  settings.setRightSidebarColor({ alpha });
                },
              },
              tooltip: fieldTexts['right-sidebar-background-alpha'][1],
            },
          ],
        },
      ],
    },
    {
      name: 'Playbar Settings',
      render: true,
      groups: [
        {
          render: true,
          name: 'General',
          key: 'group-playbar-general',
          showName: false,
          fields: [
            {
              key: 'playbar-type',
              label: fieldTexts['playbar-type'][0],
              render: true,
              tooltip: fieldTexts['playbar-type'][1],
              inputOptions: {
                type: 'select',
                value: state.playbar.type,
                onChange: (type) => {
                  settings.setPlaybar({ type: type as PlaybarTypes });
                },
                options: [
                  { label: 'Default', value: 'normal' },
                  { label: 'Compact', value: 'compact' },
                ],
              },
            },
            {
              render: true,
              key: 'playbar-is-floating',
              label: fieldTexts['playbar-is-floating'][0],
              tooltip: fieldTexts['playbar-is-floating'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.playbar.isFloating,
                onChange: (isFloating) => {
                  settings.setPlaybar({ isFloating });
                },
              },
            },
          ],
        },
        {
          render: state.playbar.type === 'compact',
          name: 'Compact Playbar',
          key: 'group-playbar-compact',
          showName: true,
          fields: [
            {
              render: true,
              key: 'compact-playbar-height',
              label: fieldTexts['compact-playbar-height'][0],
              tooltip: fieldTexts['compact-playbar-height'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.compact.height,
                validator: isValidNumberInRange512,
                onChange: (height) => {
                  settings.setPlaybarOptions('compact', { height });
                },
              },
            },
            {
              render: true,
              key: 'compact-playbar-hide-icons',
              label: fieldTexts['compact-playbar-hide-icons'][0],
              tooltip: fieldTexts['compact-playbar-hide-icons'][1],
              inputOptions: {
                type: 'checkbox',
                checked: state.playbar.hideIcons,
                onChange: (hideIcons) => {
                  settings.setPlaybar({ hideIcons });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'compact-playbar-backdrop-blur',
              label: fieldTexts['playbar-backdrop-blur'][0],
              tooltip: fieldTexts['playbar-backdrop-blur'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setPlaybarFilter('compact', { blur });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'compact-playbar-backdrop-saturation',
              label: fieldTexts['playbar-backdrop-saturation'][0],
              tooltip: fieldTexts['playbar-backdrop-saturation'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.saturate,
                validator: isValidNumberInRange256,
                onChange: (saturate) => {
                  settings.setPlaybarFilter('compact', { saturate });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'compact-playbar-backdrop-brightness',
              label: fieldTexts['playbar-backdrop-brightness'][0],
              tooltip: fieldTexts['playbar-backdrop-brightness'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.brightness,
                validator: isValidNumberInRange256,
                onChange: (brightness) => {
                  settings.setPlaybarFilter('compact', { brightness });
                },
              },
            },
          ],
        },

        {
          render: state.playbar.type === 'normal',
          name: 'Normal Playbar',
          key: 'group-playbar-normal',
          showName: true,
          fields: [
            {
              render: true,
              key: 'normal-playbar-height',
              label: fieldTexts['normal-playbar-height'][0],
              tooltip: fieldTexts['normal-playbar-height'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.normal.height,
                validator: isValidNumberInRange512,
                onChange: (height) => {
                  settings.setPlaybarOptions('normal', { height });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'playbar-backdrop-blur',
              label: fieldTexts['playbar-backdrop-blur'][0],
              tooltip: fieldTexts['playbar-backdrop-blur'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setPlaybarFilter('normal', { blur });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'playbar-backdrop-saturation',
              label: fieldTexts['playbar-backdrop-saturation'][0],
              tooltip: fieldTexts['playbar-backdrop-saturation'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.saturate,
                validator: isValidNumberInRange256,
                onChange: (saturate) => {
                  settings.setPlaybarFilter('normal', { saturate });
                },
              },
            },
            {
              render: state.playbar.isFloating,
              key: 'playbar-backdrop-brightness',
              label: fieldTexts['playbar-backdrop-brightness'][0],
              tooltip: fieldTexts['playbar-backdrop-brightness'][1],
              inputOptions: {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.brightness,
                validator: isValidNumberInRange256,
                onChange: (brightness) => {
                  settings.setPlaybarFilter('normal', { brightness });
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Advanced Settings',
      render: true,
      groups: [
        {
          render: true,
          name: 'App Settings',
          key: 'group-application-settings',
          showName: false,
          fields: [
            {
              render: true,
              inputOptions: {
                type: 'checkbox',
                checked: state.showChangelog,
                onChange: (state) => {
                  settings.setChangelog(state);
                },
              },
              label: fieldTexts['toggle-changelog-modal'][0],
              tooltip: fieldTexts['toggle-changelog-modal'][1],
              key: 'toggle-changelog-modal',
            },
            {
              render: true,
              inputOptions: {
                type: 'button',
                buttonType: 'primary',
                contents: 'Copy Settings',
                onClick: () => {
                  copyToClipboard(settings.exportSettings(), 'Settings copied to clipboard!');
                },
              },
              label: fieldTexts['export-app-settings'][0],
              tooltip: fieldTexts['export-app-settings'][1],
              key: 'export-app-settings',
            },
            {
              render: true,
              inputOptions: {
                type: 'text',
                value: '',
                validator: (text) => {
                  try {
                    if (isValidAppSettings(JSON.parse(text))) return { isValid: true };
                    return { isValid: false, message: 'Not a valid lucid settings.' };
                  } catch {
                    return { isValid: false, message: 'Not a valid lucid settings.' };
                  }
                },
                onChange: (json) => {
                  settings.importSettings(json);
                },
              },
              label: fieldTexts['import-app-settings'][0],
              tooltip: fieldTexts['import-app-settings'][1],
              key: 'import-app-settings',
            },
            {
              render: true,
              inputOptions: {
                type: 'button',
                buttonType: 'danger',
                contents: 'Reset',
                onClick: () => {
                  if (
                    confirm(
                      'Are you sure you want to reset all settings to default values? This action cannot be undone.'
                    )
                  ) {
                    settings.resetState();
                    window.location.reload();
                  }
                },
              },
              label: fieldTexts['reset-app-settings'][0],
              tooltip: fieldTexts['reset-app-settings'][1],
              key: 'reset-app-settings',
            },
          ],
        },
      ],
    },
  ] satisfies Settings;
}
