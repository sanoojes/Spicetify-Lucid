import React from 'react';
import { replaceIcons } from '@/utils/replaceIcons';
import { updateArtworkUrl, updatePlaylistArtworkUrl } from '@/utils/artworkUrl';
import { setTopBarStyles } from '@/utils/windowControls';
import { ModalContextProvider } from '@/context/ModalContext';
import TransparentWindowControl from '@/components/windowControls/TransparentWindowControl';
import BackgroundManager from '@/components/background/BackgroundManager';
import SettingsManager from '@/components/settings/SettingsManager';
import PlaylistViewManager from '@/components/playlistViews/PlaylistViewManager';
import FontManager from '@/components/font/FontManager';
import GrainManager from '@/components/grain/GrainManager';
import { showError } from '@/components/error/ErrorBoundary';
import PlaybarManager from '@/components/playbar/PlaybarManager';

const Main = () => {
  try {
    const [pageCategory, setPageCategory] =
      React.useState<PageCategoryType>('other');
    const underMainViewRef = React.useRef<HTMLElement | null>(null);
    const [previousPath, setPreviousPath] = React.useState<string | null>(null);

    const handleSongChange = () => {
      updateArtworkUrl(); // change art url
    };

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
      replaceIcons();
      setTopBarStyles();
      handleSongChange();
      setUnderMainView();
      updatePlaylistArtworkUrl();

      // Event Listeners
      Spicetify.Platform.History.listen(() => {
        const currentPath = Spicetify.Platform.History.location.pathname;
        if (currentPath !== previousPath) {
          setPreviousPath(currentPath);
          setPath();
          setUnderMainView();
          updatePlaylistArtworkUrl();
        }
      }); // page change listener

      window.addEventListener('resize', setTopBarStyles); // window resize listener
      Spicetify.Player.addEventListener('songchange', handleSongChange); // song change listener

      // unload all listeners on removal
      return () => {
        window.removeEventListener('resize', setTopBarStyles);
        Spicetify.Player.removeEventListener('songchange', handleSongChange);
      };
    }, []);

    React.useEffect(() => {
      window.pageCategory = pageCategory;
      document.body.classList.add(pageCategory);
      return () => {
        document.body.classList.remove(pageCategory);
      };
    }, [pageCategory]);

    return (
      <>
        <div id='state'>
          <GrainManager />
          <FontManager />
          <PlaybarManager />
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
        {window.isWindows && !window.isLightMode ? (
          <div
            id='transperent-controls-container'
            className='transperent-controls-container'
            style={{ containerType: 'normal' }}
          >
            <TransparentWindowControl />
          </div>
        ) : null}
      </>
    );
  } catch (error) {
    showError(error);
    return <div />;
  }
};

export default Main;
