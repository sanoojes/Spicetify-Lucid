import React from 'react';
import type {
  BackgroundContextProps,
  BackgroundCustomOptions,
  BackgroundOptions,
} from '@/types/background';
import {
  BACKGROUND_LOCAL_KEY,
  DEFAULT_BACKGROUND_OPTIONS,
} from '@/constants/constants';

const BackgroundContext =
  Spicetify.React.createContext<BackgroundContextProps | null>(null);

const BackgroundContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBackground, setSelectedBackground] =
    React.useState<BackgroundOptions>(
      localStorage.getItem(BACKGROUND_LOCAL_KEY)
        ? JSON.parse(localStorage.getItem(BACKGROUND_LOCAL_KEY) || '{}')
            .selectedBackground
        : 'animated'
    );

  const [backgroundOptions, setBackgroundOptions] =
    React.useState<BackgroundCustomOptions>(() => {
      const storedData = localStorage.getItem(BACKGROUND_LOCAL_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData).backgroundOptions;
        const mergedOptions: BackgroundCustomOptions = { ...parsedData };

        for (const type of Object.keys(DEFAULT_BACKGROUND_OPTIONS)) {
          if (!mergedOptions[type]) {
            mergedOptions[type] = DEFAULT_BACKGROUND_OPTIONS[type];
          }
        }

        return mergedOptions;
      }
      return DEFAULT_BACKGROUND_OPTIONS;
    });

  const [isDynamicColor, setIsDynamicColor] = React.useState<boolean>(
    Boolean(
      JSON.parse(localStorage.getItem('lucid:isDynamicColor') || 'false')
    ) || false
  );

  // Store isDynamicColor in local storage directly, no need for global variable
  Spicetify.React.useEffect(() => {
    localStorage.setItem(
      'lucid:isDynamicColor',
      isDynamicColor ? 'true' : 'false'
    );
  }, [isDynamicColor]);

  // Save changes to local storage
  Spicetify.React.useEffect(() => {
    saveToLocalStorage();
  }, [selectedBackground, backgroundOptions]);

  const saveToLocalStorage = () => {
    localStorage.setItem(
      BACKGROUND_LOCAL_KEY,
      JSON.stringify({
        selectedBackground,
        backgroundOptions,
      })
    );
  };

  const resetBackgroundSettings = () => {
    localStorage.removeItem(BACKGROUND_LOCAL_KEY);

    setSelectedBackground('static');
    setIsDynamicColor(false);
    setBackgroundOptions(DEFAULT_BACKGROUND_OPTIONS);
  };

  return (
    <BackgroundContext.Provider
      value={{
        selectedBackground,
        setSelectedBackground,
        backgroundOptions,
        setBackgroundOptions,
        resetBackgroundSettings,
        isDynamicColor,
        setIsDynamicColor,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

const useBackgroundContext = (): BackgroundContextProps => {
  const context = Spicetify.React.useContext(BackgroundContext);
  if (context) return context;
  throw new Error('[Lucid] Wrap Element with BackgroundContextProvider');
};

export { BackgroundContextProvider, useBackgroundContext };
