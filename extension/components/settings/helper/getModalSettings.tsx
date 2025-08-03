import type { SectionProps } from '@app/types/settingSchema.ts';
import type appStore from '@store/appStore.ts';

export const getModalSettings = (state: ReturnType<typeof appStore.getState>): SectionProps => {
  const { settingModal } = state;

  return {
    id: 'modal-settings',
    sectionName: 'Modal Settings',
    groups: [
      {
        id: 'setting-modal',
        groupName: 'Modal',
        components: [
          {
            id: 'modal-position',
            type: 'Dropdown',
            label: 'Opener Location',
            value: settingModal.accessPoint,
            options: [
              ['Menu', 'menu'],
              ['Navigation', 'nav'],
            ],
            onChange: (accessPoint) => state.setSettingModal({ accessPoint }),
            tippy: 'Choose where the modal button appears.',
          },
          {
            id: 'is-floating',
            type: 'Toggle',
            label: 'Floating Modal',
            isChecked: settingModal.isFloating,
            onChange: (isFloating) => state.setSettingModal({ isFloating }),
            tippy: 'Allow modal to be draggable on screen.',
          },
        ],
      },
    ],
  } satisfies SectionProps;
};
