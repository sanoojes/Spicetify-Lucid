import { isValidUrl } from '@/utils/fontUtils';
import React, { useState, useEffect, useContext } from 'react';

const FontContext = React.createContext<FontContextProps | null>(null);

const FONT_VALUE_KEY = 'lucid:fontValue';
const DEFAULT_FONT_VALUE = 'Poppins';

const useFontContext = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error(
      '[Lucid] useFontContext must be used within a FontContextProvider'
    );
  }
  return context;
};

const FontContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontValue, setFontValue] = useState<string>(
    localStorage.getItem(FONT_VALUE_KEY) || DEFAULT_FONT_VALUE
  );

  useEffect(() => {
    localStorage.setItem(FONT_VALUE_KEY, fontValue);
  }, [fontValue]);

  useEffect(() => {
    let fontFamily = fontValue;
    if (isValidUrl(fontValue)) {
      fontFamily = decodeURIComponent(
        fontValue.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, ' ') || ''
      );
      const existingLink = document.getElementById(
        'custom-font'
      ) as HTMLLinkElement | null;

      // If font is a URL, update existing link or create a new one
      if (existingLink) {
        existingLink.href = fontValue;
      } else {
        const link = document.createElement('link');
        link.rel = 'preload stylesheet';
        link.as = 'style';
        link.href = fontValue;
        link.id = 'custom-font';
        document.head.appendChild(link);
      }
    }

    window.rootStyle.setProperty('--font-to-use', fontFamily);
  }, [fontValue]);

  const resetFontSettings = () => {
    // Remove any existing custom font link
    const existingLink = document.getElementById(
      'custom-font'
    ) as HTMLLinkElement | null;
    if (existingLink) {
      document.head.removeChild(existingLink);
    }

    // Reset font value and styles
    setFontValue(DEFAULT_FONT_VALUE);
    window.rootStyle.setProperty('--font-to-use', DEFAULT_FONT_VALUE);
  };

  return (
    <FontContext.Provider
      value={{ fontValue, setFontValue, resetFontSettings }}
    >
      {children}
    </FontContext.Provider>
  );
};

export { FontContextProvider, useFontContext };
