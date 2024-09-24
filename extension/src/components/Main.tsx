import React from 'react';
import { logDebug } from '@/utils/logUtils';
import { ModalContextProvider } from '@/context/ModalContextProvider';
import BackgroundManager from '@/components/background/BackgroundManager';
import SettingsManager from '@/components/settings/SettingsManager';
import WindowControlsManager from '@/components/windowControls/WindowControlsManager';
import ChangeLogManager from '@/components/changelog/ChangeLogManager';
import MainStateManager from '@/components/MainStateManager';
import { replaceIcons } from '@/utils/replaceIcons';
import { manageBackgroundZIndex } from '@/utils/backgroundUtils';
import { useUnderMainViewLoader } from '@/hooks/useUnderMainViewLoader';

/**
 * Renders Main things for the theme
 */
const Main = () => {
  logDebug('Render <Main />');

  React.useEffect(() => {
    replaceIcons();
    manageBackgroundZIndex();
  }, []);

  useUnderMainViewLoader();

  return (
    <>
      <div id='state'>
        <MainStateManager />
      </div>
      <div
        id='background-container'
        className='background-container'
        style={{ containerType: 'normal' }}
      >
        <BackgroundManager />
      </div>
      <ModalContextProvider>
        <div
          id='modal-container'
          className='modal-container'
          style={{ containerType: 'normal' }}
        >
          <SettingsManager />
          <ChangeLogManager />
        </div>
      </ModalContextProvider>
      <div>
        <WindowControlsManager />
      </div>
    </>
  );
};

export default Main;
