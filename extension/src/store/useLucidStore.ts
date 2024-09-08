import {
  detectWindows,
  getIsGlobalNav,
  getIsLightMode,
  getRootStyle,
} from '@/utils/platformUtils';
import { create } from 'zustand';

const defaultSettings: LucidStoreValues = {
  underMainBackgroundImage: '',
  isCustomControls: false,
  pageCategory: 'other',
  artworkData: {
    nowPlayingArtURL: '',
    currentPageURI: '',
    currentPageArtURL: '',
  },
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
