import { useSettingsStore } from '@/store/settingsStore';
import React, { useEffect } from 'react';

const PlaylistView = () => {
  const { playlistViewMode } = useSettingsStore();

  useEffect(() => {
    document.body.classList.remove(
      'playlist-view-compact',
      'playlist-view-default',
      'playlist-view-card'
    );

    document.body.classList.add(`playlist-view-${playlistViewMode}`);

    return () => {
      document.body.classList.remove(`playlist-view-${playlistViewMode}`);
    };
  }, [playlistViewMode]);

  return <div id='playlistViewMode' data-playlistViewMode={playlistViewMode} />;
};

export default PlaylistView;
