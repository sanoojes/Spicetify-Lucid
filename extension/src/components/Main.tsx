import React from 'react';
import { replaceIcons } from '@/utils/replaceIcons';
import { updateArtworkUrl } from '@/utils/updateArtworkUrl';
import { setTopBarStyles } from '@/utils/windowControls';
import TransparentControl from '@/components/windowControls/TransparentControl';
import BackgroundManager from '@/components/background/BackgroundManager';
import MainSettings from '@/components/settings/MainSettings';
import PlaylistView from '@/components/playlistView/PlaylistView';
import { ModalContextProvider } from '@/context/ModalContext';
import FontManager from './font/FontManager';
import Grains from './grain/Grains';

const Main = () => {
  Spicetify.React.useEffect(() => {
    replaceIcons();
    setTopBarStyles();
    handleSongChange();
  }, []);

  const handleSongChange = () => {
    updateArtworkUrl();
  };

  // Resize Event
  window.addEventListener('resize', setTopBarStyles);

  // Song Event Listener
  Spicetify.Player.addEventListener('songchange', handleSongChange);

  return (
    <>
      <div id='state'>
        <PlaylistView />
        <Grains />
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
          <MainSettings />
        </ModalContextProvider>
      </div>
      {window.isWindows && !window.isLightMode ? (
        <div
          id='transperent-controls-container'
          className='transperent-controls-container'
          style={{ containerType: 'normal' }}
        >
          <TransparentControl />
        </div>
      ) : null}
      <FontManager />
    </>
  );
};

export default Main;
