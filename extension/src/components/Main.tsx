import React from 'react';
import { ModalContextProvider } from '@/context/ModalContext';
import BackgroundManager from '@/components/background/BackgroundManager';
import SettingsManager from '@/components/settings/SettingsManager';
import PlaylistViewManager from '@/components/playlistViews/PlaylistViewManager';
import FontManager from '@/components/font/FontManager';
import GrainManager from '@/components/grain/GrainManager';
import { showError } from '@/components/error/ErrorBoundary';
import PlaybarManager from '@/components/playbar/PlaybarManager';
import UnderMainViewManager from '@/components/underMainView/UnderMainViewManager';
import { useLucidStore } from '@/store/useLucidStore';
import ArtworkManager from './artworkManager/ArtworkManager';
import WindowControlsManager from './windowControls/WindowControlsManager';

const Main = () => {
  try {
    const underMainViewRef = React.useRef<HTMLElement | null>(null);
    const [previousPath, setPreviousPath] = React.useState<string | null>(null);
    const { isWindows, isLightMode, pageCategory, setPageCategory } =
      useLucidStore();

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

    const setPath = () => {
      const pathname = Spicetify.Platform.History.location.pathname;

      if (Spicetify.URI.isPlaylistV1OrV2(pathname)) {
        setPageCategory('playlist');
      } else if (Spicetify.URI.isArtist(pathname)) {
        setPageCategory('artist');
      } else if (Spicetify.URI.isAlbum(pathname)) {
        setPageCategory('album');
      } else if (Spicetify.URI.isShow(pathname)) {
        setPageCategory('show');
      } else if (Spicetify.URI.isProfile(pathname)) {
        setPageCategory('profile');
      } else {
        setPageCategory('other');
      }
    };

    Spicetify.React.useEffect(() => {
      setPath();
      setUnderMainView();

      // Event Listeners
      const unlistenHistory = Spicetify.Platform.History.listen(() => {
        const currentPath = Spicetify.Platform.History.location.pathname;
        if (currentPath !== previousPath) {
          setPreviousPath(currentPath);
          setPath();
          setUnderMainView();
        }
      });

      return () => unlistenHistory();
    }, []);

    React.useEffect(() => {
      document.body.classList.add(pageCategory);

      return () => {
        document.body.classList.remove(pageCategory);
      };
    }, [pageCategory]);

    return (
      <>
        <div id='state'>
          <GrainManager />
          <PlaybarManager />
          <FontManager />
          <UnderMainViewManager />
          <ArtworkManager />
        </div>
        <div
          id='background-container'
          className='background-container'
          style={{ containerType: 'normal' }}
        >
          <BackgroundManager />
        </div>
        <div
          id='modal-container'
          className='modal-container'
          style={{ containerType: 'normal' }}
        >
          <ModalContextProvider>
            <SettingsManager />
          </ModalContextProvider>
        </div>
        {isWindows && !isLightMode ? <WindowControlsManager /> : null}
      </>
    );
  } catch (error) {
    showError(error);
    return <div />;
  }
};

export default Main;
