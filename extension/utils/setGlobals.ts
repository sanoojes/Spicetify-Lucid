import appSettingsStore from '@store/setting.ts';
import { LUCID_VERSION_STORAGE_KEY } from '@app/constant.ts';
import { closeSettings, openSettings, settingModal } from '@app/hooks/settings.ts';

export default () => {
  window.lucid = {
    config: () => appSettingsStore.getState(),
    reset: () => {
      appSettingsStore.resetState();
    },
    store: appSettingsStore,
    version: localStorage.getItem(LUCID_VERSION_STORAGE_KEY) ?? '2.0.0',
    settings: { openSettings, closeSettings, settingModal },
  };
};
