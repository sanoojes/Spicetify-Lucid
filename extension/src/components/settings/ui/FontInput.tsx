import React, { useEffect, type ChangeEvent } from 'react';
import CustomInput from '@/components/ui/CustomInput';
import { useSettingsStore } from '@/store/settingsStore';

export const FontInput = () => {
  const { fontFamily, fontImportUrl, setFontImportUrl } = useSettingsStore();
  const [inputValue, setInputValue] = React.useState(
    fontImportUrl || fontFamily
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFontImportUrl(e.target.value);
  };

  return (
    <div>
      <CustomInput
        name='Font Family'
        onChange={handleInputChange}
        placeholder='Enter Font Family Name or Google Fonts link'
        type='text'
        value={inputValue}
      />
    </div>
  );
};
