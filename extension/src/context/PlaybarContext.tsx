import React, { type ReactNode } from 'react';
import type { PlaybarOptions, PlaybarContextProps } from '@/types/playbar';

const PlaybarContext = React.createContext<PlaybarContextProps | null>(null);

const PlaybarContextProvider = ({ children }: { children: ReactNode }) => {
  const [playbar, setPlaybar] = React.useState<PlaybarOptions>('card');

  React.useEffect(() => {
    const storedGrains = localStorage.getItem('lucid:playbar');
    if (storedGrains) {
      setPlaybar(storedGrains as PlaybarOptions);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('lucid:playbar', playbar);
  }, [playbar]);

  return (
    <PlaybarContext.Provider value={{ playbar, setPlaybar }}>
      {children}
    </PlaybarContext.Provider>
  );
};

const usePlaybarContext = () => {
  const context = React.useContext(PlaybarContext);
  if (!context) {
    throw Error(
      '[Lucid] usePlaybarContext must be used within a PlaybarContextProvider'
    );
  }
  return context;
};

export { PlaybarContextProvider, usePlaybarContext };
