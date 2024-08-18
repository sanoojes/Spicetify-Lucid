import React, { type ReactNode } from 'react';
import type {
  PlaylistViewContextProps,
  PlaylistViewOptions,
} from '@/types/playlistView';

const PlaylistViewContext =
  React.createContext<PlaylistViewContextProps | null>(null);

const PlaylistViewContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlaylistView, setSelectedPlaylistView] =
    React.useState<PlaylistViewOptions>('compact');

  React.useEffect(() => {
    const storedPlaylistViews = localStorage.getItem(
      'lucid:selectedPlaylistView'
    );
    if (storedPlaylistViews) {
      setSelectedPlaylistView(storedPlaylistViews as PlaylistViewOptions);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('lucid:selectedPlaylistView', selectedPlaylistView);
  }, [selectedPlaylistView]);

  const resetPlaylistViewSettings = () => {
    setSelectedPlaylistView('card');
  };

  return (
    <PlaylistViewContext.Provider
      value={{
        selectedPlaylistView,
        setSelectedPlaylistView,
        resetPlaylistViewSettings,
      }}
    >
      {children}
    </PlaylistViewContext.Provider>
  );
};

const usePlaylistViewContext = () => {
  const context = React.useContext(PlaylistViewContext);
  if (!context) {
    throw Error(
      '[Lucid] usePlaylistViewContext must be used within a PlaylistViewContextProvider'
    );
  }
  return context;
};

export { PlaylistViewContextProvider, usePlaylistViewContext };
