import setBackground from '@features/setBackground.tsx';
import setBodyClasses from '@features/setBodyClasses.ts';
import setColors from '@features/setColors.ts';
import { setPlayer } from '@features/setPlaybar.ts';
import setUIPreferences from '@features/setUIPreferences.ts';
import setUnderMainView from '@features/setUnderMainView.tsx';
import appStore from '@store/appStore.ts';
import tempStore from '@store/tempStore.ts';
import addRootCardSizeToDom from '@utils/addRootCardSizeToDom.ts';
import { initNotificationSystem } from '@utils/initNotificationSystem.tsx';
import addPageStyles from '@utils/page/addPageStyles.ts';
import addPlayerData from '@utils/player/addPlayerData.ts';
import resetTheme from '@utils/resetTheme.ts';
import addSettings from '@utils/settings/addSettings.tsx';
import { setLibrary } from '@features/setLibrary.ts';
import { setRightSidebar } from '@features/setRightSidebar.ts';
import { setGlobalNav } from '@features/setGlobalNav.ts';
import setPageStyles from '@features/setPageStyles.ts';

function main() {
  // Expose Lucid Methods
  window.Lucid = {
    Reset: () => resetTheme(),
    Config: () => appStore.getState(),
    AppStore: appStore,
    TempStore: tempStore,
  };

  // Set up global notification handler
  initNotificationSystem();

  // window.Lucid.Reset();

  // Initialize features
  setUIPreferences();
  setColors();
  setBackground();
  setPlayer();
  setUnderMainView(); // set lucid umv
  setBodyClasses(); // set body classes such as `hide-home-header`
  setPageStyles();
  setLibrary();
  setGlobalNav();
  setRightSidebar();

  // Add States
  addPlayerData();
  addPageStyles();
  addRootCardSizeToDom();

  // Add settings
  addSettings();
}

main();

declare global {
  interface Window {
    Lucid: {
      Reset: () => void;
      Config: () => ReturnType<typeof appStore.getState>;
      AppStore: typeof appStore;
      TempStore: typeof tempStore;
    };
    __LUCID__?: boolean;
  }
}
