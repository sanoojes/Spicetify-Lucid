import React, { type ChangeEvent } from 'react';
import CustomInput from '@/components/ui/CustomInput';
import { useFontContext } from '@/context/FontContext';
import { isValidUrl } from '@/utils/fontUtils';

export const FontInput = () => {
  const { fontValue, setFontValue } = useFontContext();

  const handleFontChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setFontValue(e.target.value);

    // Update font style on input change
    let fontFamily = e.target.value;

    if (isValidUrl(fontFamily)) {
      fontFamily = decodeURIComponent(
        fontFamily.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, ' ') || ''
      );

      const existingLink = document.getElementById(
        'custom-font'
      ) as HTMLLinkElement | null;

      if (existingLink) {
        existingLink.href = fontFamily;
      } else {
        const link = document.createElement('link');
        link.rel = 'preload stylesheet';
        link.as = 'style';
        link.href = fontFamily;
        link.id = 'custom-font';
        document.head.appendChild(link);
      }
    }
    window.rootStyle.setProperty('--font-to-use', fontFamily);
  };

  return (
    <div>
      <CustomInput
        name='Font Family'
        onChange={handleFontChange}
        placeholder='Enter Font Family Name or Google Fonts link'
        type='text'
        value={fontValue}
      />
    </div>
  );
};
