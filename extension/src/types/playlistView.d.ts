import type { Dispatch, SetStateAction } from 'react';

type PlaylistViewOptions = 'default' | 'compact' | 'card';

type PlaylistViewContextProps = {
  selectedPlaylistView: PlaylistViewOptions;
  setSelectedPlaylistView: Dispatch<SetStateAction<PlaylistViewOptions>>;
  resetPlaylistViewSettings: () => void;
};
