import { FloatingModal } from '@components/modal.ts';
import { modalState } from '@store/modal.ts';
import appSettingsStore from '@store/setting.ts';
import { addSettingAccess } from '@utils/addSettingAccess.ts';
import { type Settings, SettingsMain } from '@components/settings/section.ts';
import { createElement } from '@utils/dom/createElement.ts';
import type {
  BackgroundMode,
  BorderStyle,
  CustomImageTypes,
  GrainSettings,
  PageImageStyle,
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
import { editImage, getImage } from '@app/imageDb.ts';

let _openSettings: (() => void) | null = null;
let _closeSettings: (() => void) | null = null;

export const settingModal: FloatingModal = new FloatingModal();
export const openSettings = () => {
  _openSettings?.();
};

export const closeSettings = () => {
  _closeSettings?.();
};

const getSettingsContents = async () => {
  const settingsContainer = createElement('div', { id: 'settings-container' });
  const settingSectionElement = new SettingsMain();
  settingSectionElement.isRender = true;
  settingSectionElement.options = await getSettings();

  appSettingsStore.subscribe(async (state) => {
    settingSectionElement.options = await getSettings(state);
  });

  settingsContainer.appendChild(settingSectionElement);
  return settingsContainer;
};

export async function mountSettings(lucidMain: HTMLElement) {
  settingModal.isFloating = modalState.getState().isFloating;
  settingModal.setContent(await getSettingsContents());
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

const fieldTexts = {
  floatWin: ['Floating Window', 'Allows settings to float. Drag header to reposition.'],
  winPos: ['Window Position', 'Settings window opens from context menu or nav bar.'],
  bgMode: ['Mode', 'Select background type.'],
  solidColor: ['Solid Color', 'Pick solid background color.'],
  custImg: ['Custom Image', 'Use custom image URL for static background.'],
  custUMVImg: ['Custom Image', 'Use custom image URL for playlist background.'],
  imgSrc: ['Image Source', 'Upload image or use URL for custom background.'],
  custImgUrl: ['Custom Image URL', 'Enter image URL for static background.'],
  custImgInput: ['Select Custom Image', 'Select local image for static background.'],
  custImgLocal: ['Select Local Image', 'Select images for static background.'],
  filterBlur: ['Blur', 'Blur level of image (0-200).'],
  filterBlurCustom: ['Blur (Custom)', 'Blur level for custom page background (0-200).'],
  filterBlurNormal: ['Blur (Default)', 'Blur level for default page background (0-200).'],
  filterBlurNpv: ['Blur (NPV)', 'Blur level for NPV page background (0-200).'],
  filterExtendedBlur: [
    'Extended background Blur',
    'Blur level of extended page background (0-200).',
  ],
  filterBright: ['Brightness', 'Brightness of image (0-200).'],
  filterSat: ['Saturation', 'Saturation of image (0-200).'],
  dynColor: ['Dynamic Color', 'Dynamic color themes based on artwork.'],
  tonalColor: ['Tonal Color', 'Tonal color scheme for UI.'],
  custColorEnable: ['Custom Color', 'Enable custom color to override theme color.'],
  custColorPicker: [
    'Select Custom Color',
    `Choose base theme color. Preview: <a href="https://material-foundation.github.io/material-theme-builder/">Material Theme Builder</a>`,
  ],
  gFontsEnable: ['Google Fonts', 'Enable fonts from Google Fonts.'],
  gFontsUrl: ['Google Fonts URL', 'URL of Google Fonts stylesheet.'],
  fontFamily: ['Font Family', 'Font family for UI when Google Fonts disabled.'],
  grainType: ['Grain Type', 'Type of grain effect overlay.'],
  winCtrlHeight: ['Control Height', 'Height of window control buttons on Windows (0-200).'],
  winPanelGap: ['Panel Gap', 'Gap between main cards.'],
  borderThick: ['Thickness', 'Thickness of interface border (0-10).'],
  borderColor: ['Color', 'Color of application border.'],
  borderStyle: ['Style', 'Visual style of interface border.'],
  pagesBgStyle: ['Style', 'Background display on pages.'],
  pagesImageStyle: ['Image Style', 'Image on pages. (playlist/album art)'],
  homeHeaderBg: ['Home Header Background', 'Enable/Disable Home header background.'],
  scrollFullBg: ['Scroll Fullscreen Background', 'Scroll background in fullscreen playlist.'],
  scaleFullBg: ['Scale Fullscreen Background', 'Scale background for fullscreen playlist.'],
  scrollNpvBg: ['Scroll Background', 'Scroll background for Now playing art playlist.'],
  scaleNpvBg: ['Scale Background', 'Scale background for Now playing art playlist.'],
  scrollNormBg: ['Scroll Background', 'Scroll background for normal playlist.'],
  scaleNormBg: ['Scale Background', 'Scale background for normal playlist.'],
  scrollCusBg: ['Scroll Background', 'Scroll background for custom playlist.'],
  scaleCusBg: ['Scale Custom Background', 'Scale background for custom playlist.'],
  rsbViewMode: ['View Mode', "Normal or compact 'Now Playing' sidebar."],
  rsbSize: ['Compact Sidebar Width', "Width of compact 'Now Playing' sidebar (0-512px)."],
  rsbPos: ['Position', "Position of compact 'Now Playing' sidebar."],
  rsbBgBlur: ['Blur', "Background blur of compact 'Now Playing' view (0-256)."],
  rsbCustBgEnable: ['Custom Background', 'Enable custom background for Now Playing view.'],
  rsbBgColor: ['Color', "Background color for 'Now Playing' sidebar."],
  rsbBgAlpha: ['Alpha', 'Background transparency (alpha) value (0-100).'],
  rsbBorderAlpha: ['Border Alpha', 'Border transparency (alpha) value (0-100).'],
  playbarType: ['Playbar Type', 'Default or Compact playbar style.'],
  compactPbHideIcons: [
    'Hide Extra Playbar Icons',
    'Hides extra icons in compact playbar (on hover).',
  ],
  compactPbBorderRad: ['Border Radius', 'Border Radius of compact playbar in pixels.'],
  normalPbBorderRad: ['Border Radius', 'Border Radius of normal playbar in pixels.'],
  compactPbImgBorderRad: [
    'Art Border Radius',
    'Border Radius of the cover image in compact playbar in pixels.',
  ],
  normalPbImgBorderRad: [
    'Art Border Radius',
    'Border Radius of the cover image in normal playbar in pixels.',
  ],
  compactPbHeight: ['Height', 'Height of compact playbar in pixels.'],
  normalPbHeight: ['Height', 'Height of normal playbar in pixels.'],
  playbarFloat: ['Floating', 'Now playing bar is floating.'],
  pbBackdropBlur: ['Backdrop Blur', 'Blur of normal playbar backdrop (0-256).'],
  pbBackdropSat: ['Backdrop Saturation', 'Saturation of normal playbar backdrop (0-256).'],
  pbBackdropBright: ['Backdrop Brightness', 'Brightness of normal playbar backdrop (0-256).'],
  showChangelog: ['Show Changelog', 'Changelog modal after updates.'],
  lucidTour: ['Take a Lucid Tour', 'Guided walkthrough of Lucid theme features.'],
  exportSettings: ['Export Settings', 'Export settings to clipboard as JSON.'],
  importSettings: ['Import Settings', 'Import settings from JSON.'],
  resetSettings: ['Reset All Settings', 'Reset all settings to default values (irreversible).'],
  pagesScrollType: ['Image Source', 'Now Playing View art or default playlist art for pages.'],
} as const;

async function getSettings(
  state = appSettingsStore.getState(),
  settings = appSettingsStore
): Promise<Settings> {
  const field = (
    key: keyof typeof fieldTexts,
    inputOptions: SettingsMain['options'][0]['groups'][0]['fields'][0]['inputOptions'],
    render?: boolean
  ) => ({
    render: render === undefined ? true : render,
    inputOptions,
    label: fieldTexts[key][0],
    tooltip: fieldTexts[key][1],
    key: key.replace(/([A-Z])/g, '-$1').toLowerCase(),
  });

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
            field('lucidTour', {
              type: 'button',
              buttonType: 'primary',
              contents: 'Start',
              onClick: () => {
                localStorage.removeItem('lucid-guided-tour');
                closeSettings();
                mountAndOpenGuide(true);
              },
            }),
            field('floatWin', {
              type: 'checkbox',
              checked: modalState.getState().isFloating,
              onChange: (isFloating) => {
                modalState.setState((state) => ({ ...state, isFloating }));
              },
            }),
            field('winPos', {
              type: 'select',
              value: state.position,
              options: [
                { label: 'Context Menu', value: 'context-menu' },
                { label: 'Navigation Bar', value: 'nav' },
              ],
              onChange: (value) => {
                settings.setPosition(value as SettingsPosition);
              },
            }),
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
            field('bgMode', {
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
            }),
          ],
        },
        {
          name: 'Background',
          key: 'group-bg-background',
          render: true,
          fields: [
            field(
              'solidColor',
              {
                type: 'color',
                value: state.background.options.solid.color.hex,
                onChange: (hex) => {
                  settings.setSolidBackgroundColor({ hex });
                },
              },
              state.background.mode === 'solid'
            ),
            field(
              'rsbBgAlpha',
              {
                type: 'number',
                value: state.background.options.solid.color.alpha,
                validator: isValidNumberInRange100,
                onChange: (alpha) => {
                  settings.setSolidBackgroundColor({ alpha });
                },
              },
              state.background.mode === 'solid'
            ),
            field(
              'custImg',
              {
                type: 'checkbox',
                checked: state.background.options.static.isCustomImage,
                onChange: (isCustomImage) => {
                  settings.setStaticBackgroundOptions({ isCustomImage });
                },
              },
              state.background.mode === 'static'
            ),
            field(
              'imgSrc',
              {
                type: 'select',
                value: state.customImage.type,
                options: [
                  { label: 'Local', value: 'local' },
                  { label: 'From Url', value: 'url' },
                ],
                onChange: (type) => {
                  settings.setCustomImageType(type as CustomImageTypes);
                },
              },
              state.background.mode === 'static' && state.background.options.static.isCustomImage
            ),
            field(
              'custImgUrl',
              {
                type: 'text',
                value: state.customImage.options.url.data ?? 'Enter Image URL',
                validator: isValidUrl,
                onChange: (data) => {
                  settings.setCustomImageOptions('url', { data });
                },
              },
              state.background.mode === 'static' &&
                state.background.options.static.isCustomImage &&
                state.customImage.type === 'url'
            ),
            field(
              'custImgInput',
              {
                type: 'image',
                value: (await getImage())[0].data,
                onChange: async (data) => {
                  if (data) editImage({ ...(await getImage())[0], data });
                },
              },
              state.background.mode === 'static' &&
                state.background.options.static.isCustomImage &&
                state.customImage.type === 'local'
            ),
          ],
        },
        {
          render: state.background.mode !== 'solid',
          name: 'Filters',
          key: 'group-bg-filters',
          fields: [
            field(
              'filterBlur',
              {
                type: 'number',
                value: state.background.options.static.filter.blur,
                onChange: (blur) => {
                  settings.setStaticBackgroundFilter({ blur });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'static'
            ),
            field(
              'filterBright',
              {
                type: 'number',
                value: state.background.options.static.filter.brightness,
                onChange: (brightness) => {
                  settings.setStaticBackgroundFilter({ brightness });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'static'
            ),
            field(
              'filterSat',
              {
                type: 'number',
                value: state.background.options.static.filter.saturate,
                onChange: (saturate) => {
                  settings.setStaticBackgroundFilter({ saturate });
                },
                step: 0.1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'static'
            ),
            field(
              'filterBlur',
              {
                type: 'number',
                value: state.background.options.animated.filter.blur,
                onChange: (blur) => {
                  settings.setAnimatedBackgroundFilter({ blur });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'animated'
            ),
            field(
              'filterBright',
              {
                type: 'number',
                value: state.background.options.animated.filter.brightness,
                onChange: (brightness) => {
                  settings.setAnimatedBackgroundFilter({ brightness });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'animated'
            ),
            field(
              'filterSat',
              {
                type: 'number',
                value: state.background.options.animated.filter.saturate,
                onChange: (saturate) => {
                  settings.setAnimatedBackgroundFilter({ saturate });
                },
                step: 1,
                validator: isValidNumberInRange200,
              },
              state.background.mode === 'animated'
            ),
          ],
        },
        {
          render: true,
          name: 'Color',
          key: 'group-color',
          fields: [
            field('dynColor', {
              type: 'checkbox',
              checked: state.color.isDynamic,
              onChange: (value) => {
                settings.setDynamicColor(value);
              },
            }),
            field('tonalColor', {
              type: 'checkbox',
              checked: state.color.isTonal,
              onChange: (value) => {
                settings.setTonalColor(value);
              },
            }),
            field(
              'custColorEnable',
              {
                type: 'checkbox',
                checked: state.color.isCustom,
                onChange: (value) => {
                  settings.setIsCustomColor(value);
                },
              },
              !state.color.isDynamic
            ),
            field(
              'custColorPicker',
              {
                type: 'color',
                value: state.color.customColor.hex,
                onChange: (hex) => {
                  settings.setCustomColor({ hex });
                },
              },
              !state.color.isDynamic && state.color.isCustom
            ),
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
            field('gFontsEnable', {
              type: 'checkbox',
              checked: state.font.isGoogleFonts,
              onChange: (isGoogleFonts) => {
                settings.setFont({ isGoogleFonts });
              },
            }),
            field(
              'gFontsUrl',
              {
                type: 'text',
                value: state.font.fontUrl || '',
                validator: isValidGoogleFontURL,
                onChange: (fontUrl) => {
                  settings.setFont({ fontUrl });
                },
              },
              state.font.isGoogleFonts
            ),
            field(
              'fontFamily',
              {
                type: 'text',
                value: state.font.fontFamily || '',
                onChange: (fontFamily) => {
                  settings.setFont({ fontFamily });
                },
              },
              !state.font.isGoogleFonts
            ),
          ],
        },
        {
          render: true,
          key: 'group-grain-effect',
          name: 'Grain Effect',
          fields: [
            field('grainType', {
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
            }),
          ],
        },
        {
          render: true,
          key: 'group-window-controls',
          name: 'Window',
          fields: [
            field('winPanelGap', {
              type: 'number',
              step: 1,
              value: state.pages.panelGap,
              validator: isValidNumberInRange100,
              onChange: (panelGap) => {
                settings.setPages({ panelGap });
              },
            }),

            field(
              'winCtrlHeight',
              {
                type: 'number',
                step: 1,
                value: state.control.height,
                validator: isValidNumberInRange200,
                onChange: (value) => {
                  settings.setControlHeight(value);
                },
              },
              isWindows()
            ),
          ],
        },
        {
          render: true,
          key: 'group-border',
          name: 'Border',
          fields: [
            field('borderThick', {
              type: 'number',
              step: 1,
              value: state.border.thickness,
              validator: isValidNumberInRange10,
              onChange: (thickness) => {
                settings.setBorder({ thickness });
              },
            }),
            field('borderStyle', {
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
            }),
            field('borderColor', {
              type: 'color',
              value: state.border.color.hex,
              onChange: (hex) => {
                settings.setBorderColor({ hex });
              },
            }),
            field('rsbBorderAlpha', {
              type: 'number',
              value: state.border.color.alpha,
              validator: isValidNumberInRange100,
              onChange: (alpha) => {
                settings.setBorderColor({ alpha });
              },
            }),
          ],
        },
        {
          render: true,
          key: 'group-now-playing-view',
          name: 'Now Playing View',
          fields: [
            field('rsbViewMode', {
              type: 'select',
              value: state.rightSidebar.mode,
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Compact', value: 'compact' },
              ],
              onChange: (mode) => {
                settings.setRightSidebar({ mode: mode as RightSidebarMode });
              },
            }),
            field(
              'rsbSize',
              {
                type: 'number',
                value: state.rightSidebar.size,
                validator: isValidNumberInRange512,
                onChange: (size) => {
                  settings.setRightSidebar({ size });
                },
              },
              state.rightSidebar.mode === 'compact'
            ),
            field(
              'rsbPos',
              {
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
              state.rightSidebar.mode === 'compact'
            ),
            field(
              'rsbBgBlur',
              {
                type: 'number',
                value: state.rightSidebar.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setRightSidebar({ blur });
                },
              },
              state.rightSidebar.mode === 'compact'
            ),
            field('rsbCustBgEnable', {
              type: 'checkbox',
              checked: state.rightSidebar.isCustomBg,
              onChange: (isCustomBg) => {
                settings.setRightSidebar({ isCustomBg });
              },
            }),
            field(
              'rsbBgColor',
              {
                type: 'color',
                value: state.rightSidebar.color.hex,
                onChange: (hex) => {
                  settings.setRightSidebarColor({ hex });
                },
              },
              state.rightSidebar.isCustomBg
            ),
            field(
              'rsbBgAlpha',
              {
                type: 'number',
                value: state.rightSidebar.color.alpha,
                validator: isValidNumberInRange100,
                onChange: (alpha) => {
                  settings.setRightSidebarColor({ alpha });
                },
              },
              state.rightSidebar.isCustomBg
            ),
          ],
        },
      ],
    },
    {
      name: 'Page Settings',
      render: true,
      groups: [
        {
          render: true,
          key: 'group-page-style',
          name: 'Page Styles',
          fields: [
            field('homeHeaderBg', {
              type: 'checkbox',
              checked: state.pages.hideHomeHeader,
              onChange: (hideHomeHeader) => {
                settings.setPages({ hideHomeHeader });
              },
            }),
            field('pagesBgStyle', {
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
            }),
            field('pagesImageStyle', {
              type: 'select',
              value: state.pages.imageStyle,
              onChange: (style) => {
                settings.setPageImageStyle(style as PageImageStyle);
              },
              options: [
                { label: 'Default', value: 'default' },
                { label: 'As Bg', value: 'as-bg' },
                { label: 'Hidden', value: 'hidden' },
              ],
            }),
            field('pagesScrollType', {
              type: 'select',
              value: state.pages.umv.type,
              options: [
                { value: 'normal', label: 'Default' },
                { value: 'custom', label: 'Custom' },
                { value: 'npv', label: 'Now Playing Art' },
              ],
              onChange: (type) => {
                settings.setUMV({ type: type as UMVSettings['type'] });
              },
            }),
            field(
              'custUMVImg',
              {
                type: 'text',
                validator: isValidUrl,
                value: state.pages.umv.options.custom.url ?? 'Enter a Url',
                onChange: (url) => {
                  settings.setUMVOption('custom', { url });
                },
              },
              state.pages.umv.type === 'custom'
            ),
          ],
        },
        {
          key: 'group-page-image-filter',
          name: 'Page Background Image Filter',
          render: true,
          fields: [
            field(
              'filterBlurCustom',
              {
                type: 'number',
                validator: isValidNumberInRange200,
                value: state.pages.umv.options.custom.filter?.blur,
                onChange: (blur) => {
                  settings.setUMVFilter('custom', { blur });
                },
              },
              state.pages.umv.type === 'custom'
            ),
            field(
              'filterBlurNormal',
              {
                type: 'number',
                validator: isValidNumberInRange200,
                value: state.pages.umv.options.normal.filter?.blur,
                onChange: (blur) => {
                  settings.setUMVFilter('normal', { blur });
                },
              },
              state.pages.umv.type === 'normal'
            ),
            field(
              'filterBlurNpv',
              {
                type: 'number',
                validator: isValidNumberInRange200,
                value: state.pages.umv.options.npv.filter?.blur,
                onChange: (blur) => {
                  settings.setUMVFilter('npv', { blur });
                },
              },
              state.pages.umv.type === 'npv'
            ),
            field('filterExtendedBlur', {
              type: 'number',
              validator: isValidNumberInRange200,
              value: state.pages.umv.options.expanded.filter?.blur,
              onChange: (blur) => {
                settings.setUMVFilter('expanded', { blur });
              },
            }),
          ],
        },
        {
          key: 'group-page-bg-behavior',
          name: 'Background Behavior',
          render: true,
          fields: [
            field(
              'scrollCusBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.custom.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('custom', { isScroll });
                },
              },
              state.pages.umv.type === 'custom'
            ),
            field(
              'scaleCusBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.custom.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('custom', { isScaling });
                },
              },
              state.pages.umv.type === 'custom'
            ),
            field(
              'scrollNormBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.normal.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('normal', { isScroll });
                },
              },
              state.pages.umv.type === 'normal'
            ),
            field(
              'scaleNormBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.normal.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('normal', { isScaling });
                },
              },
              state.pages.umv.type === 'normal'
            ),
            field(
              'scrollNpvBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.npv.isScroll,
                onChange: (isScroll) => {
                  settings.setUMVOption('npv', { isScroll });
                },
              },
              state.pages.umv.type === 'npv'
            ),
            field(
              'scaleNpvBg',
              {
                type: 'checkbox',
                checked: state.pages.umv.options.npv.isScaling,
                onChange: (isScaling) => {
                  settings.setUMVOption('npv', { isScaling });
                },
              },
              state.pages.umv.type === 'npv'
            ),
            field('scrollFullBg', {
              type: 'checkbox',
              checked: state.pages.umv.options.expanded.isScroll,
              onChange: (isScroll) => {
                settings.setUMVOption('expanded', { isScroll });
              },
            }),
            field('scaleFullBg', {
              type: 'checkbox',
              checked: state.pages.umv.options.expanded.isScaling,
              onChange: (isScaling) => {
                settings.setUMVOption('expanded', { isScaling });
              },
            }),
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
            field('playbarType', {
              type: 'select',
              value: state.playbar.type,
              onChange: (type) => {
                settings.setPlaybar({ type: type as PlaybarTypes });
              },
              options: [
                { label: 'Default', value: 'normal' },
                { label: 'Compact', value: 'compact' },
              ],
            }),
            field('playbarFloat', {
              type: 'checkbox',
              checked: state.playbar.isFloating,
              onChange: (isFloating) => {
                settings.setPlaybar({ isFloating });
              },
            }),
          ],
        },
        {
          render: state.playbar.type === 'compact',
          name: 'Compact Playbar',
          key: 'group-playbar-compact',
          showName: true,
          fields: [
            field('compactPbHideIcons', {
              type: 'checkbox',
              checked: state.playbar.hideIcons,
              onChange: (hideIcons) => {
                settings.setPlaybar({ hideIcons });
              },
            }),
            field('compactPbHeight', {
              type: 'number',
              value: state.playbar.options.compact.height,
              validator: isValidNumberInRange512,
              onChange: (height) => {
                settings.setPlaybarOptions('compact', { height });
              },
            }),
            field('compactPbBorderRad', {
              type: 'number',
              value: state.playbar.options.compact.borderRadius,
              validator: isValidNumberInRange512,
              onChange: (borderRadius) => {
                settings.setPlaybarOptions('compact', { borderRadius });
              },
            }),
            field(
              'pbBackdropBlur',
              {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setPlaybarFilter('compact', { blur });
                },
              },
              state.playbar.isFloating
            ),
            field(
              'pbBackdropSat',
              {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.saturate,
                validator: isValidNumberInRange256,
                onChange: (saturate) => {
                  settings.setPlaybarFilter('compact', { saturate });
                },
              },
              state.playbar.isFloating
            ),
            field(
              'pbBackdropBright',
              {
                type: 'number',
                value: state.playbar.options.compact.backdropFilter.brightness,
                validator: isValidNumberInRange256,
                onChange: (brightness) => {
                  settings.setPlaybarFilter('compact', { brightness });
                },
              },
              state.playbar.isFloating
            ),
            field('compactPbImgBorderRad', {
              type: 'number',
              value: state.playbar.options.compact.imageRadius,
              validator: isValidNumberInRange512,
              onChange: (imageRadius) => {
                settings.setPlaybarOptions('compact', { imageRadius });
              },
            }),
          ],
        },

        {
          render: state.playbar.type === 'normal',
          name: 'Normal Playbar',
          key: 'group-playbar-normal',
          showName: true,
          fields: [
            field('normalPbHeight', {
              type: 'number',
              value: state.playbar.options.normal.height,
              validator: isValidNumberInRange512,
              onChange: (height) => {
                settings.setPlaybarOptions('normal', { height });
              },
            }),
            field('normalPbBorderRad', {
              type: 'number',
              value: state.playbar.options.normal.borderRadius,
              validator: isValidNumberInRange512,
              onChange: (borderRadius) => {
                settings.setPlaybarOptions('normal', { borderRadius });
              },
            }),
            field(
              'pbBackdropBlur',
              {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.blur,
                validator: isValidNumberInRange256,
                onChange: (blur) => {
                  settings.setPlaybarFilter('normal', { blur });
                },
              },
              state.playbar.isFloating
            ),
            field(
              'pbBackdropSat',
              {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.saturate,
                validator: isValidNumberInRange256,
                onChange: (saturate) => {
                  settings.setPlaybarFilter('normal', { saturate });
                },
              },
              state.playbar.isFloating
            ),
            field(
              'pbBackdropBright',
              {
                type: 'number',
                value: state.playbar.options.normal.backdropFilter.brightness,
                validator: isValidNumberInRange256,
                onChange: (brightness) => {
                  settings.setPlaybarFilter('normal', { brightness });
                },
              },
              state.playbar.isFloating
            ),
            field('normalPbImgBorderRad', {
              type: 'number',
              value: state.playbar.options.normal.imageRadius,
              validator: isValidNumberInRange512,
              onChange: (imageRadius) => {
                settings.setPlaybarOptions('normal', { imageRadius });
              },
            }),
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
            field('showChangelog', {
              type: 'checkbox',
              checked: state.showChangelog,
              onChange: (state) => {
                settings.setChangelog(state);
              },
            }),
            field('exportSettings', {
              type: 'button',
              buttonType: 'primary',
              contents: 'Copy Settings',
              onClick: () => {
                copyToClipboard(settings.exportSettings(), 'Settings copied to clipboard!');
              },
            }),
            field('importSettings', {
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
            }),
            field('resetSettings', {
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
            }),
          ],
        },
      ],
    },
  ] satisfies Settings;
}
