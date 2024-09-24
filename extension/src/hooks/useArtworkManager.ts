import React from 'react';
import { logError, logInfo } from '@/utils/logUtils';
import { useLucidStore } from '@/store/useLucidStore';
import {
  fetchArtworkURLFromAPI,
  getNowPlayingArtworkUrl,
  getSpotifyURI,
} from '@/utils/artworkUrl';
import { useSettingsStore } from '@/store/useSettingsStore';

const useArtworkManager = () => {
  const { pageCategory, rootStyle, artworkData, updateArtworkData } =
    useLucidStore();
  const { playlistImageMode } = useSettingsStore();

  const setPageArtwork = React.useCallback(async () => {
    const pathname = Spicetify.Platform.History.location.pathname;
    const currentPageURI = getSpotifyURI(pathname);

    // Check if URI has actually changed
    if (artworkData.currentPageURI === currentPageURI) {
      return;
    }

    rootStyle.setProperty('--artwork-opacity', '0');
    try {
      if (currentPageURI) {
        const imageUrl = (await fetchArtworkURLFromAPI(currentPageURI)) || '';
        updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
      } else {
        updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
      }
    } catch (error) {
      console.error('Error updating artwork:', error);
      updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
    } finally {
      setTimeout(() => rootStyle.setProperty('--artwork-opacity', '1'), 500);
    }
  }, [artworkData.currentPageURI, rootStyle, updateArtworkData]);

  React.useEffect(() => {
    if (artworkData.currentPageArtURL) {
      rootStyle.setProperty(
        '--playlist-art-image',
        `url(${artworkData.currentPageArtURL})`
      );
      logInfo(
        `Updated Playlist Artwork URL to ${artworkData.currentPageArtURL}`
      );
    } else if (artworkData.currentPageURI && pageCategory !== 'other') {
      logError(`No artwork URL found for URI: ${artworkData.currentPageURI}`);
      rootStyle.setProperty('--playlist-art-image', 'none');
    }

    // Logic for history listener moved here:
    if (playlistImageMode === 'inherit') {
      const unlistenHistory = Spicetify.Platform.History.listen(setPageArtwork);
      setPageArtwork(); // Call initially

      return () => {
        unlistenHistory();
      };
    }
  }, [
    playlistImageMode,
    artworkData.currentPageArtURL,
    artworkData.currentPageURI,
    pageCategory,
    rootStyle,
    setPageArtwork,
  ]);

  React.useEffect(() => {
    if (artworkData.nowPlayingArtURL) {
      rootStyle.setProperty(
        '--now-playing-art-image',
        `url(${artworkData.nowPlayingArtURL})`
      );
      logInfo(`Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`);
    }
  }, [artworkData.nowPlayingArtURL, rootStyle]);

  React.useEffect(() => {
    const handleSongChange = async () => {
      const nowPlayingArtURL = await getNowPlayingArtworkUrl();
      updateArtworkData({ nowPlayingArtURL });
    };

    handleSongChange(); // Initial call
    Spicetify.Player.addEventListener('songchange', handleSongChange);

    return () => {
      Spicetify.Player.removeEventListener('songchange', handleSongChange);
    };
  }, [updateArtworkData]);
};

export default useArtworkManager;
