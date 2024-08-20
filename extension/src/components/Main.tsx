import React, { useEffect, useRef, useState } from 'react';
import { replaceIcons } from '@/utils/replaceIcons';
import { updateArtworkUrl, updatePlaylistArtworkUrl } from '@/utils/artworkUrl';
import { setTopBarStyles } from '@/utils/windowControls';
import { ModalContextProvider } from '@/context/ModalContext';
import TransparentWindowControl from '@/components/windowControls/TransparentWindowControl';
import BackgroundManager from '@/components/background/BackgroundManager';
import SettingsManager from '@/components/settings/SettingsManager';
import PlaylistViewManager from '@/components/playlistViews/PlaylistViewManager';
import FontManager from '@/components/font/FontManager';
import GrainManeger from '@/components/grain/GrainManeger';
import { showError } from './error/ErrorBoundary';
import PlaybarManager from './playbar/PlaybarManager';

const Main = () => {
  const [isArtistOrPlaylist, setIsArtistOrPlaylist] = useState<
    'artist' | 'playlist' | 'other'
  >('other');
  const underMainViewRef = useRef<HTMLElement | null>(null);

  Spicetify.React.useEffect(() => {
    try {
      setPath();
      replaceIcons();
      setTopBarStyles();
      handleSongChange();
      setUnderMainView();
      updatePlaylistArtworkUrl();
    } catch (error) {
      showError(error);
    }
  }, []);

  const handleSongChange = () => {
    try {
      updateArtworkUrl();
    } catch (error) {
      showError(error);
    }
  };

  // Resize Event
  window.addEventListener('resize', setTopBarStyles);

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
      setIsArtistOrPlaylist('playlist');
    } else if (Spicetify.URI.isArtist(pathname)) {
      setIsArtistOrPlaylist('artist');
    } else {
      setIsArtistOrPlaylist('other');
    }
  };

  useEffect(() => {
    document.body.classList.add(isArtistOrPlaylist);
    return () => {
      document.body.classList.remove(isArtistOrPlaylist);
    };
  }, [isArtistOrPlaylist]);

  // Song Event Listener
  Spicetify.Platform.History.listen(async () => {
    setPath();
    setUnderMainView();
    await updatePlaylistArtworkUrl();
  });
  Spicetify.Player.addEventListener('songchange', handleSongChange);

  return (
    <>
      <div id='state'>
        <GrainManeger />
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
};

export default Main;
