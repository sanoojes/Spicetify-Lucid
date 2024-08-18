import type { Dispatch, SetStateAction, CSSProperties } from 'react';

type BackgroundOptions = 'animated' | 'static' | 'solid';

type BackgroundContextProps = {
  selectedBackground: BackgroundOptions;
  backgroundOptions: BackgroundCustomOptions;
  setBackgroundOptions: Dispatch<SetStateAction<BackgroundCustomOptions>>;
  setSelectedBackground: Dispatch<SetStateAction<BackgroundOptions>>;
  isDynamicColor: boolean;
  setIsDynamicColor: Dispatch<SetStateAction<boolean>>;
  resetBackgroundSettings: () => void;
};

type BackgroundCustomOptions = {
  [key in BackgroundOptions | string]: {
    opacity?: string;
    // Background Blur (backdrop-filter)
    backdropBlur?: string;
    // Normal Filter
    blur?: string;
    brightness?: string;
    saturation?: string;
    contrast?: string;
    bgColor?: string;
    time?: string;
  };
};

type CustomBackgroundStyle = CSSProperties & {
  '--backdrop-blur'?: string;
  '--background-color'?: string;
  '--opacity'?: string;
  '--blur'?: string;
  '--brightness'?: string;
  '--saturation'?: string;
  '--contrast'?: string;
  '--time'?: string;
};
