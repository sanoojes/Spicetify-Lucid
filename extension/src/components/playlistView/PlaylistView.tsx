import { usePlaylistViewContext } from '@/context/PlaylistViewContext';
import React, { useEffect } from 'react';

const PlaylistView = () => {
  const { selectedPlaylistView } = usePlaylistViewContext();

  useEffect(() => {
    document.body.classList.remove(
      'playlist-view-compact',
      'playlist-view-default',
      'playlist-view-card'
    );

    document.body.classList.add(`playlist-view-${selectedPlaylistView}`);

    return () => {
      document.body.classList.remove(`playlist-view-${selectedPlaylistView}`);
    };
  }, [selectedPlaylistView]);

  return (
    <div
      id='selectedPlaylistView'
      data-selectedPlaylistView={selectedPlaylistView}
    />
  );
};

export default PlaylistView;
