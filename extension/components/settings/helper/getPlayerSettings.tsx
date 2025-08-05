import type { SectionProps } from '@app/types/settingSchema.ts';
import { NextSongCardStateSchema, PlayerStyleSchema } from '@schemas/appStoreSchema.ts';
import CSSFilterSchema from '@schemas/cssFilterSchema.ts';
import type appStore from '@store/appStore.ts';
import { DEFAULT_STATE } from '@store/appStore.ts';

export const getPlayerSettings = (state: ReturnType<typeof appStore.getState>): SectionProps => {
  const { player } = state;
  const { compactStyle, defaultStyle, nextSongCard } = player;

  const createStyleGroups = (
    mode: 'compact' | 'default',
    styles: typeof compactStyle | typeof defaultStyle
  ) => {
    const isVisible = () => player.mode === mode;

    return [
      {
        id: `dimensions-${mode}`,
        groupName: 'Dimensions',
        visible: isVisible,
        components: [
          {
            id: `height-${mode}`,
            type: 'Input',
            label: 'Height (in px)',
            inputType: 'number',
            value: styles.height,
            validation: (v) => PlayerStyleSchema.shape.height.safeParse(v),
            onChange: (height) => state.setPlayerStyles(mode, { height }),
          },
          {
            id: `width-${mode}`,
            type: 'Input',
            label: 'Width (in %)',
            inputType: 'number',
            value: styles.width,
            validation: (v) => PlayerStyleSchema.shape.width.safeParse(v),
            onChange: (width) => state.setPlayerStyles(mode, { width }),
          },
          {
            id: `padding-x-${mode}`,
            type: 'Input',
            label: 'Horizontal Padding',
            inputType: 'number',
            value: styles.paddingX,
            validation: (v) => PlayerStyleSchema.shape.paddingX.safeParse(v),
            onChange: (paddingX) => state.setPlayerStyles(mode, { paddingX }),
          },
        ],
      },
      {
        id: `style-${mode}`,
        groupName: 'Style',
        visible: isVisible,
        components: [
          {
            id: `bg-color-${mode}`,
            type: 'Color',
            label: 'Background Color',
            color: styles.bgColor,
            initialColor:
              DEFAULT_STATE.player[mode === 'compact' ? 'compactStyle' : 'defaultStyle'].bgColor,
            onChange: (bgColor) => state.setPlayerStyles(mode, { bgColor }),
          },
          {
            id: `bg-opacity-${mode}`,
            type: 'Input',
            label: 'Opacity',
            inputType: 'number',
            value: styles.bgOpacity,
            validation: (v) => PlayerStyleSchema.shape.bgOpacity.safeParse(v),
            onChange: (bgOpacity) => state.setPlayerStyles(mode, { bgOpacity }),
          },
          {
            id: `border-radius-${mode}`,
            type: 'Input',
            label: 'Border Radius',
            inputType: 'number',
            value: styles.borderRadius,
            validation: (v) => PlayerStyleSchema.shape.borderRadius.safeParse(v),
            onChange: (borderRadius) => state.setPlayerStyles(mode, { borderRadius }),
          },
          {
            id: `cover-art-radius-${mode}`,
            type: 'Input',
            label: 'Cover Radius',
            inputType: 'number',
            value: styles.coverArtRadius,
            validation: (v) => PlayerStyleSchema.shape.coverArtRadius.safeParse(v),
            onChange: (coverArtRadius) => state.setPlayerStyles(mode, { coverArtRadius }),
          },
        ],
      },
      {
        id: `filters-${mode}`,
        groupName: 'Filters',
        visible: isVisible,
        components: [
          {
            id: `blur-${mode}`,
            type: 'Input',
            label: 'Blur',
            inputType: 'number',
            value: styles.backdropFilter.blur,
            validation: (v) => CSSFilterSchema.shape.blur.safeParse(v),
            onChange: (blur) => state.setPlayerBackdropFilter(mode, { blur }),
          },
          {
            id: `brightness-${mode}`,
            type: 'Input',
            label: 'Brightness',
            inputType: 'number',
            value: styles.backdropFilter.brightness,
            validation: (v) => CSSFilterSchema.shape.brightness.safeParse(v),
            onChange: (brightness) => state.setPlayerBackdropFilter(mode, { brightness }),
          },
          {
            id: `contrast-${mode}`,
            type: 'Input',
            label: 'Contrast',
            inputType: 'number',
            value: styles.backdropFilter.contrast,
            validation: (v) => CSSFilterSchema.shape.contrast.safeParse(v),
            onChange: (contrast) => state.setPlayerBackdropFilter(mode, { contrast }),
          },
          {
            id: `saturation-${mode}`,
            type: 'Input',
            label: 'Saturation',
            inputType: 'number',
            value: styles.backdropFilter.saturation,
            validation: (v) => CSSFilterSchema.shape.saturation.safeParse(v),
            onChange: (saturation) => state.setPlayerBackdropFilter(mode, { saturation }),
          },
          {
            id: `opacity-${mode}`,
            type: 'Input',
            label: 'Opacity',
            inputType: 'number',
            value: styles.backdropFilter.opacity,
            validation: (v) => CSSFilterSchema.shape.opacity.safeParse(v),
            onChange: (opacity) => state.setPlayerBackdropFilter(mode, { opacity }),
          },
        ],
      },
    ] as SectionProps['groups'];
  };

  return {
    id: 'player-settings',
    sectionName: 'Player',
    groups: [
      {
        id: 'type',
        groupName: 'Mode',
        components: [
          {
            id: 'type',
            type: 'Dropdown',
            label: 'Player Mode',
            value: player.mode,
            options: [
              ['Normal', 'default'],
              ['Compact', 'compact'],
            ],
            onChange: (mode) => state.setPlayer({ mode }),
          },
          {
            id: 'hide-icons',
            type: 'Toggle',
            label: 'Hide Extra Controls',
            visible: () => player.mode === 'compact',
            isChecked: player.hideExtraIcon,
            onChange: (hideExtraIcon) => state.setPlayer({ hideExtraIcon }),
          },
        ],
      },
      {
        id: 'float',
        groupName: 'Floating',
        components: [
          {
            id: 'is-floating',
            type: 'Toggle',
            label: 'Make the Player Floating',
            isChecked: player.isFloating,
            onChange: (isFloating) => state.setPlayer({ isFloating }),
          },
          {
            id: 'auto-hide',
            type: 'Toggle',
            label: 'Auto Hide Player',
            visible: () => player.isFloating,
            isChecked: player.autoHide,
            onChange: (autoHide) => state.setPlayer({ autoHide }),
          },
        ],
      },
      {
        id: 'next-song-card',
        groupName: 'Next Song Card',
        components: [
          {
            id: 'show-card',
            type: 'Toggle',
            label: 'Show Next Song Card',
            tippy:
              'Display a preview of the upcoming song in a small card next to the now playing bar.',
            isChecked: nextSongCard.show,
            onChange: (show) => state.setPlayerNextCard({ show }),
          },
        ],
      },
      {
        id: 'next-song-customize',
        groupName: 'Next Song Card',
        visible: () => nextSongCard.show,
        components: [
          {
            id: 'rm-text',
            type: 'Toggle',
            label: 'Remove Next Up Text',
            tippy: 'Remove the "Next Up" text above the next song card.',
            isChecked: nextSongCard.removeNextUp,
            onChange: (removeNextUp) => state.setPlayerNextCard({ removeNextUp }),
          },
          {
            id: `height`,
            type: 'Input',
            label: 'Card Height (px)',
            tippy: 'Adjust the height of the next song card displayed beside the player.',
            inputType: 'number',
            value: nextSongCard.height,
            validation: (v) => NextSongCardStateSchema.shape.height.safeParse(v),
            onChange: (height) => state.setPlayerNextCard({ height }),
          },
          {
            id: `cover-size`,
            type: 'Input',
            label: 'Cover Size (px)',
            tippy: 'Adjust the size of the next song card cover art.',
            inputType: 'number',
            value: nextSongCard.coverArtSize,
            validation: (v) => NextSongCardStateSchema.shape.coverArtSize.safeParse(v),
            onChange: (coverArtSize) => state.setPlayerNextCard({ coverArtSize }),
          },
          {
            id: `padding-x`,
            type: 'Input',
            label: 'Horizontal Padding (px)',
            tippy: 'Space inside the card on the left and right.',
            inputType: 'number',
            value: nextSongCard.paddingX,
            validation: (v) => NextSongCardStateSchema.shape.paddingX.safeParse(v),
            onChange: (paddingX) => state.setPlayerNextCard({ paddingX }),
          },
          {
            id: `padding-y`,
            type: 'Input',
            label: 'Vertical Padding (px)',
            tippy: 'Space inside the card on the top and bottom.',
            inputType: 'number',
            value: nextSongCard.paddingY,
            validation: (v) => NextSongCardStateSchema.shape.paddingY.safeParse(v),
            onChange: (paddingY) => state.setPlayerNextCard({ paddingY }),
          },
        ],
      },
      ...createStyleGroups('compact', compactStyle),
      ...createStyleGroups('default', defaultStyle),
    ],
  } satisfies SectionProps;
};
