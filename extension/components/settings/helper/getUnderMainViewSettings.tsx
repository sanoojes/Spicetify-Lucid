import type { SectionProps } from '@app/types/settingSchema.ts';
import CSSFilterSchema from '@schemas/cssFilterSchema.ts';
import type appStore from '@store/appStore.ts';
import { DEFAULT_STATE } from '@store/appStore.ts';
import React from 'react';
import z from 'zod';

export const getUnderMainViewSettings = (
  state: ReturnType<typeof appStore.getState>
): SectionProps => {
  const { filter, type, isScrolling, isScaling, customUrl, customColor } = state.umv;

  return {
    id: 'umv-settings',
    sectionName: 'Under Main View',
    groups: [
      {
        id: 'type',
        groupName: 'Type',
        components: [
          {
            id: 'type',
            type: 'Dropdown',
            label: 'Type',
            value: type,
            options: [
              ['Default', 'default'],
              ['Now Playing', 'playing'],
              ['Custom Color', 'custom-color'],
              ['Custom Image/GIF', 'custom-img'],
              ['None', 'none'],
            ],
            onChange: (selectedType) => state.setUMV({ type: selectedType }),
            tippy: (
              <div>
                <p>
                  <strong>Default:</strong> Playlist/page cover
                </p>
                <p>
                  <strong>Now Playing:</strong> Current track artwork
                </p>
                <p>
                  <strong>Custom Color:</strong> Your own color
                </p>
                <p>
                  <strong>Custom Image/GIF:</strong> URL-based image or GIF
                </p>
                <p>
                  <strong>None:</strong> Hidden
                </p>
              </div>
            ),
          },
        ],
      },
      {
        id: 'toggles',
        groupName: 'Behavior',
        visible: () => type !== 'none',
        components: [
          {
            id: 'is-scrolling',
            type: 'Toggle',
            label: 'Scrolling',
            tippy: 'Not recommended unless necessary.',
            isChecked: isScrolling,
            onChange: (isScrolling) => state.setUMV({ isScrolling }),
          },
          {
            id: 'is-scaling',
            type: 'Toggle',
            label: 'Scaling',
            visible: () => type !== 'custom-color',
            isChecked: isScaling,
            onChange: (isScaling) => state.setUMV({ isScaling }),
          },
        ],
      },
      {
        id: 'custom-url',
        groupName: 'Custom URL',
        visible: () => type === 'custom-img',
        components: [
          {
            id: 'custom-url',
            type: 'Input',
            label: 'Image/GIF URL',
            inputType: 'text',
            placeholder: 'Paste URL...',
            value: customUrl,
            validation: (val) => z.url({ error: 'Invalid URL' }).safeParse(val).success,
            onChange: (url) => state.setUMV({ customUrl: url }),
          },
        ],
      },
      {
        id: 'custom-color',
        groupName: 'Color',
        visible: () => type === 'custom-color',
        components: [
          {
            id: 'color',
            type: 'Color',
            label: 'Background',
            tippy: 'HEX color code.',
            color: customColor,
            initialColor: DEFAULT_STATE.umv.customColor,
            onChange: (customColor) => state.setUMV({ customColor }),
          },
        ],
      },
      {
        id: 'filter',
        groupName: 'Filters',
        visible: () => !(type === 'none' || type === 'custom-color'),
        components: [
          {
            id: 'blur',
            type: 'Input',
            label: 'Blur',
            inputType: 'number',
            value: filter.blur,
            validation: (val) => CSSFilterSchema.shape.blur.safeParse(val),
            onChange: (blur) => state.setUMVFilter({ blur }),
          },
          {
            id: 'brightness',
            type: 'Input',
            label: 'Brightness',
            inputType: 'number',
            value: filter.brightness,
            validation: (val) => CSSFilterSchema.shape.brightness.safeParse(val),
            onChange: (brightness) => state.setUMVFilter({ brightness }),
          },
          {
            id: 'contrast',
            type: 'Input',
            label: 'Contrast',
            inputType: 'number',
            value: filter.contrast,
            validation: (val) => CSSFilterSchema.shape.contrast.safeParse(val),
            onChange: (contrast) => state.setUMVFilter({ contrast }),
          },
          {
            id: 'saturation',
            type: 'Input',
            label: 'Saturation',
            inputType: 'number',
            value: filter.saturation,
            validation: (val) => CSSFilterSchema.shape.saturation.safeParse(val),
            onChange: (saturation) => state.setUMVFilter({ saturation }),
          },
          {
            id: 'opacity',
            type: 'Input',
            label: 'Opacity',
            inputType: 'number',
            value: filter.opacity,
            validation: (val) => CSSFilterSchema.shape.opacity.safeParse(val),
            onChange: (opacity) => state.setUMVFilter({ opacity }),
          },
        ],
      },
    ],
  } satisfies SectionProps;
};
