import React, { type ReactNode } from 'react';
import type { GrainContextProps, GrainOptions } from '@/types/grain';

const GrainContext = React.createContext<GrainContextProps | null>(null);

const GrainContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGrain, setSelectedGrain] =
    React.useState<GrainOptions>('stary');

  React.useEffect(() => {
    const storedGrains = localStorage.getItem('lucid:selectedGrain');
    if (storedGrains) {
      setSelectedGrain(storedGrains as GrainOptions);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('lucid:selectedGrain', selectedGrain);
  }, [selectedGrain]);

  const resetGrainSettings = () => {
    setSelectedGrain('stary');
  };

  return (
    <GrainContext.Provider
      value={{ selectedGrain, setSelectedGrain, resetGrainSettings }}
    >
      {children}
    </GrainContext.Provider>
  );
};

const useGrainContext = () => {
  const context = React.useContext(GrainContext);
  if (!context) {
    throw Error(
      '[Lucid] useGrainContext must be used within a GrainContextProvider'
    );
  }
  return context;
};

export { GrainContextProvider, useGrainContext };
