import React from 'react';
import { replaceIcons } from '@/utils/replaceIcons';
import { updateArtworkUrl } from '@/utils/updateArtworkUrl';
import { setTopBarStyles } from '@/utils/windowControls';
import TransparentControl from '@/components/windowControls/TransparentControl';
import { ModalContextProvider } from '@/context/ModalContext';
import BackgroundManager from '@/components/background/BackgroundManager';
import { BackgroundContextProvider } from '@/context/BackgroundContext';
import MainSettings from '@/components/settings/MainSettings';
import { FontContextProvider } from '@/context/FontContext';
import Grains from './grains/Grains';
import { GrainContextProvider } from '@/context/GrainContext';
import { PlaylistViewContextProvider } from '@/context/PlaylistViewContext';
import PlaylistView from './playlistView/PlaylistView';

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
      <FontContextProvider>
        <BackgroundContextProvider>
          <PlaylistViewContextProvider>
            <GrainContextProvider>
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
            </GrainContextProvider>
          </PlaylistViewContextProvider>
        </BackgroundContextProvider>
      </FontContextProvider>
    </>
  );
};

export default Main;
