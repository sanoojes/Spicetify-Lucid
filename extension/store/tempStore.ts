import type { ExtractedColor } from '@utils/graphql/getters.ts';
import { subscribeWithSelector } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export interface PlayerData {
  url?: string;
  colors?: ExtractedColor;
  data: Spicetify.PlayerTrack;
}

export interface PlayerState {
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
  subscribeWithSelector((set, get) => ({
    player: {},
    pageImg: {},
    setPlayer: (player) => set({ player: { ...get().player, ...player } }),
    setPageImg: (pageImg) => set({ pageImg: { ...get().pageImg, ...pageImg } }),
  }))
);

export default tempStore;
