import type { Dispatch, SetStateAction, CSSProperties } from 'react';

type PlaybarOptions = 'default' | 'compact' | 'card';

type PlaybarContextProps = {
  playbar: PlaybarOptions;
  setPlaybar: Dispatch<SetStateAction<PlaybarOptions>>;
};
