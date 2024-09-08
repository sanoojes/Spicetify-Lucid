import React from 'react';
import { logToConsole } from '@/utils/logUtils';
import { useLucidStore } from '@/store/useLucidStore';
import {
  fetchArtworkURLFromAPI,
  getNowPlayingArtworkUrl,
  getSpotifyURI,
} from '@/utils/artworkUrl';

const ArtworkManager: React.FC = () => {
  const { pageCategory, rootStyle, artworkData, updateArtworkData } =
    useLucidStore();

  React.useEffect(() => {
    const setPageArtwork = async () => {
      try {
        const pathname = Spicetify.Platform.History.location.pathname;
        const currentPageURI = getSpotifyURI(pathname);

        if (currentPageURI) {
          if (artworkData.currentPageURI !== currentPageURI) {
            const imageUrl =
              (await fetchArtworkURLFromAPI(currentPageURI)) || '';

            updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
          }
        } else {
          updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
        }
      } catch (error) {
        console.error('Error updating artwork:', error);
        updateArtworkData({ currentPageArtURL: '', currentPageURI: '' });
      }
    };

    const unlistenHistory = Spicetify.Platform.History.listen(setPageArtwork);
    setPageArtwork();

    return () => {
      unlistenHistory();
    };
  }, []);

  React.useEffect(() => {
    if (artworkData.currentPageArtURL) {
      rootStyle.setProperty(
        '--playlist-art-image',
        `url(${artworkData.currentPageArtURL})`
      );
      logToConsole(
        `Updated Artwork Url of page: ${artworkData.currentPageURI} to ${artworkData.currentPageArtURL}`,
        { level: 'info' }
      );
    } else if (pageCategory !== 'other') {
      logToConsole(
        `No artwork URL found for URI: ${artworkData.currentPageURI}`,
        { level: 'warn' }
      );
      rootStyle.setProperty('--playlist-art-image', 'none');
    }
  }, [
    rootStyle,
    artworkData.currentPageArtURL,
    artworkData.currentPageURI,
    pageCategory,
  ]);

  React.useEffect(() => {
    if (artworkData.nowPlayingArtURL) {
      rootStyle.setProperty(
        '--now-playing-art-image',
        `url(${artworkData.nowPlayingArtURL})`
      );

      logToConsole(
        `Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`,
        {
          level: 'info',
        }
      );
    }
  }, [artworkData.nowPlayingArtURL, rootStyle]);

  React.useEffect(() => {
    const handleSongChange = async () => {
      updateArtworkData({ nowPlayingArtURL: await getNowPlayingArtworkUrl() });
    };

    handleSongChange(); // initial run
    Spicetify.Player.addEventListener('songchange', handleSongChange);

    return () => {
      Spicetify.Player.removeEventListener('songchange', handleSongChange);
    };
  }, [rootStyle]);

  return null;
};

export default ArtworkManager;
