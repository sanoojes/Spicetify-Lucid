import React from 'react';
import { logToConsole } from '@/utils/logUtils';
import { useLucidStore } from '@/store/useLucidStore';
import {
  fetchArtworkURLFromAPI,
  getNowPlayingArtworkUrl,
  getSpotifyURI,
} from '@/utils/artworkUrl';
import { useSettingsStore } from '@/store/useSettingsStore';

const ArtworkManager = () => {
  const { pageCategory, rootStyle, artworkData, updateArtworkData } =
    useLucidStore();
  const { playlistImageMode } = useSettingsStore();

  const setPageArtwork = React.useCallback(async () => {
    rootStyle.setProperty('--artwork-opacity', '0');
    try {
      const pathname = Spicetify.Platform.History.location.pathname;
      const currentPageURI = getSpotifyURI(pathname);

      if (currentPageURI) {
        if (artworkData.currentPageURI !== currentPageURI) {
          const imageUrl = (await fetchArtworkURLFromAPI(currentPageURI)) || '';
          updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
        }
      } else {
        updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
      }
    } catch (error) {
      console.error('Error updating artwork:', error);
      updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
    } finally {
      rootStyle.setProperty('--artwork-opacity', '1');
    }
  }, [artworkData.currentPageURI, rootStyle, updateArtworkData]);

  React.useEffect(() => {
    if (playlistImageMode === 'inherit') {
      const unlistenHistory = Spicetify.Platform.History.listen(setPageArtwork);
      setPageArtwork();

      return () => {
        unlistenHistory();
      };
    }
  }, [playlistImageMode, setPageArtwork]);

  React.useEffect(() => {
    if (artworkData.currentPageArtURL) {
      rootStyle.setProperty(
        '--playlist-art-image',
        `url(${artworkData.currentPageArtURL})`
      );
      logToConsole(
        `Updated Playlist Artwork URL to ${artworkData.currentPageArtURL}`,
        { level: 'info' }
      );
    } else if (artworkData.currentPageURI && pageCategory !== 'other') {
      logToConsole(
        `No artwork URL found for URI: ${artworkData.currentPageURI}`,
        { level: 'warn' }
      );
      rootStyle.setProperty('--playlist-art-image', 'none');
    }
  }, [
    artworkData.currentPageArtURL,
    artworkData.currentPageURI,
    pageCategory,
    rootStyle,
  ]);

  React.useEffect(() => {
    if (artworkData.nowPlayingArtURL) {
      rootStyle.setProperty(
        '--now-playing-art-image',
        `url(${artworkData.nowPlayingArtURL})`
      );
      logToConsole(
        `Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`,
        { level: 'info' }
      );
    }
  }, [artworkData.nowPlayingArtURL, rootStyle]);

  React.useEffect(() => {
    const handleSongChange = async () => {
      const nowPlayingArtURL = await getNowPlayingArtworkUrl();
      updateArtworkData({ nowPlayingArtURL });
    };

    handleSongChange(); // initial call
    Spicetify.Player.addEventListener('songchange', handleSongChange);

    return () => {
      Spicetify.Player.removeEventListener('songchange', handleSongChange);
    };
  }, [updateArtworkData]);

  return null;
};

export default ArtworkManager;
