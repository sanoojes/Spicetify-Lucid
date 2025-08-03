import type { ExtractedColor } from '@utils/graphql/getters.ts';
import { subscribeWithSelector } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export interface PlayerData {
  url?: string;
  colors?: ExtractedColor;
}

export interface PlayerState extends PlayerData {
  current?: PlayerData;
  next?: PlayerData[];
  prev?: PlayerData[];
}

export interface TempState {
  player?: PlayerState;
  pageImg: {
    cover?: string;
    desktop?: string;
  };
  //   currentColorScheme: string[];
}

export interface TempSetter {
  setPlayer: (player: TempState['player']) => void;
  setPageImg: (pageImg: TempState['pageImg']) => void;
  //   setCurrentColorScheme: (currentColorScheme: TempState['currentColorScheme']) => void;
}

const tempStore = createStore<TempState & TempSetter>()(
  subscribeWithSelector((set) => ({
    player: {},
    pageImg: {},
    setPlayer: (player) => set({ player }),
    setPageImg: (pageImg) => set({ pageImg }),
  }))
);

export default tempStore;
