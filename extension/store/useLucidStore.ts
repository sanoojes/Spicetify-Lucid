import type { LucidStoreState, LucidStoreValues, PageCategoryType } from "@/types/main";
import { create } from "zustand";

const DEFAULT_APP_SETTINGS: LucidStoreValues = {
	underMainBackgroundImage: "",
	pageCategory: "other",
	artworkData: {
		nowPlayingArtURL: "",
		currentPageURI: "",
		currentPageArtURL: "",
	},
	windowZoom: 1.0,
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
	setWindowZoom: (windowZoom) => set((state) => ({ ...state, windowZoom })),
}));
