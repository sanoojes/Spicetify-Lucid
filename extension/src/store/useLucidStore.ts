import { getRootStyle } from "@/utils/platformUtils";
import { create } from "zustand";

const DEFAULT_APP_SETTINGS: LucidStoreValues = {
	underMainBackgroundImage: "",
	pageCategory: "other",
	artworkData: {
		nowPlayingArtURL: "",
		currentPageURI: "",
		currentPageArtURL: "",
	},
	rootStyle: getRootStyle(),
};

export const useLucidStore = create<LucidStoreState>((set) => ({
	...DEFAULT_APP_SETTINGS,

	// Setters
	updateArtworkData: (newArtwork) =>
		set((state) => ({
			...state,
			artworkData: { ...state.artworkData, ...newArtwork },
		})),
	setPageCategory: (pageCategory: PageCategoryType) => set((state) => ({ ...state, pageCategory })),
	setUnderMainViewBackgroundImage: (url) => set((state) => ({ ...state, underMainBackgroundImage: url })),
	setIsCustomControls: (isCustomControls) => set((state) => ({ ...state, isCustomControls })),
	setRootStyle: (rootStyle) => set((state) => ({ ...state, rootStyle })),
}));
