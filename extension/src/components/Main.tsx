import React from 'react';
import { ModalContextProvider, useModal } from '@/context/ModalContext';
import BackgroundManager from '@/components/background/BackgroundManager';
import SettingsManager from '@/components/settings/SettingsManager';
import PlaylistViewManager from '@/components/playlistViews/PlaylistViewManager';
import FontManager from '@/components/font/FontManager';
import GrainManager from '@/components/grain/GrainManager';
import PlaybarManager from '@/components/playbar/PlaybarManager';
import UnderMainViewManager from '@/components/underMainView/UnderMainViewManager';
import { useLucidStore } from '@/store/useLucidStore';
import ArtworkManager from '@/components/artworkManager/ArtworkManager';
import WindowControlsManager from '@/components/windowControls/WindowControlsManager';
import { manageBackgroundZIndex } from '@/utils/backgroundUtils';
import { replaceIcons } from '@/utils/replaceIcons';
import { usePathManagement } from '@/utils/pathUtils';
import ColorManager from '@/components/colors/ColorManager';
import { checkForGlobalNav } from '@/utils/navUtils';
import ChangeLogManager from './changelog/ChangeLogManager';

const Main = () => {
  const underMainViewRef = React.useRef<HTMLElement | null>(null);
  const [previousPath, setPreviousPath] = React.useState<string | null>(null);
  const { pageCategory } = useLucidStore();

  usePathManagement();

  checkForGlobalNav();

  React.useEffect(() => {
    const setUnderMainView = () => {
      if (document.getElementById('lucid-under-main-view')) {
        return;
      }

      const newUnderMainView = document.createElement('div');
      newUnderMainView.id = 'lucid-under-main-view';
      newUnderMainView.className = 'lucid-under-main-view';

      const mainViewContainer = document.querySelector('.main-view-container');
      if (mainViewContainer) {
        mainViewContainer.prepend(newUnderMainView);
      }

      underMainViewRef.current = newUnderMainView;

      if (underMainViewRef.current) {
        Spicetify.ReactDOM.createRoot(underMainViewRef.current).render(
          <PlaylistViewManager />
        );
      }
    };
    setUnderMainView();
    replaceIcons();
    manageBackgroundZIndex();

    const unlistenHistory = Spicetify.Platform.History.listen(() => {
      const currentPath = Spicetify.Platform.History.location.pathname;
      if (currentPath !== previousPath) {
        setPreviousPath(currentPath);
        setUnderMainView();
      }
    });

    return () => {
      unlistenHistory();
    };
  }, [previousPath]);

  React.useEffect(() => {
    document.body.classList.add(pageCategory);

    return () => {
      document.body.classList.remove(pageCategory);
    };
  }, [pageCategory]);

  return (
    <>
      <div id='state'>
        <FontManager />
        <ColorManager />
        <GrainManager />
        <PlaybarManager />
        <ArtworkManager />
        <UnderMainViewManager />
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
      <WindowControlsManager />
    </>
  );
};

export default Main;
