import type { Dispatch, SetStateAction, CSSProperties } from 'react';

type GrainOptions = 'default' | 'stary' | 'none';

type GrainContextProps = {
  selectedGrain: GrainOptions;
  setSelectedGrain: Dispatch<SetStateAction<GrainOptions>>;
  resetGrainSettings: () => void;
};
