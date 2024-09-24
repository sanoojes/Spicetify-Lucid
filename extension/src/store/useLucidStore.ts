import {
  checkSpotifyVersion,
  detectWindows,
  getIsGlobalNav,
  getIsLightMode,
  getRootStyle,
} from '@/utils/platformUtils';
import { getIsCustomControls } from '@/utils/windowControlUtils';
import { create } from 'zustand';

const defaultSettings: LucidStoreValues = {
  underMainBackgroundImage: '',
  isCustomControls: getIsCustomControls(),
  pageCategory: 'other',
  artworkData: {
    nowPlayingArtURL: '',
    currentPageURI: '',
    currentPageArtURL: '',
  },
  isSpotifyV16Above: checkSpotifyVersion('1.2.46'),
  isLightMode: getIsLightMode(),
  isWindows: detectWindows(),
  isGlobalNav: getIsGlobalNav(),
  rootStyle: getRootStyle(),
};

export const useLucidStore = create<LucidStoreState>((set) => ({
  ...defaultSettings,

  // Setters
  updateArtworkData: (newArtwork) =>
    set((state) => ({
      ...state,
      artworkData: { ...state.artworkData, ...newArtwork },
    })),
  setPageCategory: (pageCategory: PageCategoryType) =>
    set((state) => ({ ...state, pageCategory })),
  setUnderMainViewBackgroundImage: (url) =>
    set((state) => ({ ...state, underMainBackgroundImage: url })),
  setIsCustomControls: (isCustomControls) =>
    set((state) => ({ ...state, isCustomControls })),
  setIsLightMode: (isLightMode) => set((state) => ({ ...state, isLightMode })),
  setRootStyle: (rootStyle) => set((state) => ({ ...state, rootStyle })),
}));
