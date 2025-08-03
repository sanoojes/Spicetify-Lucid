import type { SectionProps } from '@app/types/settingSchema.ts';
import type appStore from '@store/appStore.ts';
import { DEFAULT_STATE } from '@store/appStore.ts';
import { showNotification } from '@utils/showNotification.tsx';
import React from 'react';

export const getColorSettings = (state: ReturnType<typeof appStore.getState>): SectionProps => {
  const { color } = state;

  return {
    id: 'color-settings',
    sectionName: 'Colors',
    groups: [
      {
        id: 'color-mode',
        components: [
          {
            id: 'color-mode',
            type: 'Dropdown',
            label: 'Theme Mode',
            tippy: (
              <div>
                <p>
                  <strong>Default:</strong> Uses the app theme.
                </p>
                <p>
                  <strong>Dynamic:</strong> Adapts to media artwork.
                </p>
                <p>
                  <strong>Custom:</strong> Use your own accent color.
                </p>
              </div>
            ),
            value: color.mode,
            options: [
              ['Default', 'default'],
              ['Dynamic', 'dynamic'],
              ['Custom', 'custom'],
            ],
            onChange: (mode) => state.setColor({ mode }),
          },
          {
            id: 'is-dark',
            type: 'Toggle',
            label: 'Light Mode (experimental)',
            tippy: 'Light mode is not ready yet. need ideas.',
            isChecked: !color.isDark,
            onChange: (isDark) => state.setColor({ isDark: !isDark }),
          },
          {
            id: 'is-tinted',
            type: 'Toggle',
            label: 'UI Tint',
            tippy: 'Adds a subtle color tint to the UI.',
            isChecked: color.isTinted,
            onChange: (isTinted) => state.setColor({ isTinted }),
          },
          {
            id: 'set-color',
            type: 'Color',
            label: 'Accent Color',
            tippy: 'Custom accent color.',
            color: color.accentColor,
            initialColor: DEFAULT_STATE.color.accentColor,
            hideAlpha: true,
            visible: () => color.mode === 'custom',
            onChangeComplete: (accentColor) => {
              state.setColor({ accentColor });
              setTimeout(() =>
                showNotification({ message: 'Accent color updated.', id: 'accent-update-noti' })
              );
            },
          },
        ],
      },
    ],
  } satisfies SectionProps;
};
