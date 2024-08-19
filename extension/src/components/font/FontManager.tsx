import { useSettingsStore } from '@/store/settingsStore';
import React from 'react';

const FontManager = () => {
  const { fontFamily, fontImportUrl, setFontFamily, setFontImportUrl } =
    useSettingsStore();
  const [error, setError] = React.useState<string | null>(null);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true; // Allow any valid URL
    } catch (error) {
      return false;
    }
  };

  const handleFontChange = () => {
    setError(null);

    if (isValidUrl(fontImportUrl)) {
      setFontFamily(
        decodeURIComponent(
          fontImportUrl.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, ' ') || ''
        )
      );

      let customFont = document.getElementById(
        'custom-font'
      ) as HTMLLinkElement;

      if (customFont) {
        customFont.href = fontImportUrl;
      } else {
        customFont = document.createElement('link');
        customFont.rel = 'preload stylesheet';
        customFont.as = 'style';
        customFont.id = 'custom-font';
        customFont.href = fontImportUrl;
        document.head.appendChild(customFont);
      }
    } else if (fontImportUrl) {
      setFontFamily(fontImportUrl);
      setFontImportUrl('');
    } else {
      setError('Please enter a valid font family or URL.');
    }

    window.rootStyle?.setProperty('--font-to-use', fontFamily);
  };

  React.useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
    }
  }, [error]);

  React.useEffect(() => {
    handleFontChange();
  }, [fontFamily, fontImportUrl]);

  return (
    <div
      id='font'
      data-font-family={fontFamily}
      data-font-import-url={fontImportUrl}
    />
  );
};

export default FontManager;
