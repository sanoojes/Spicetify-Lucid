export type SettingsPositions = "nav" | "context-menu";

export type PageCategoryType = "artist" | "playlist" | "album" | "profile" | "show" | "genre" | "concert" | "other";

// Lucid Store Types
export type LucidStoreValues = {
	pageCategory: PageCategoryType;
	underMainBackgroundImage: string | null;
	rootStyle: CSSStyleDeclaration;
	artworkData: ArtworkData;
};

export type LucidStoreSetters = {
	updateArtworkData: (newArtwork: Partial<ArtworkData>) => void;
	setPageCategory: (pageCategory: PageCategoryType) => void;
	setUnderMainViewBackgroundImage: (url: string | null) => void;
	setIsCustomControls: (isCustomControls: boolean) => void;
	setRootStyle: (rootStyle: CSSStyleDeclaration) => void;
};

export type LucidStoreState = LucidStoreValues & LucidStoreSetters;

/*  Artwork Data Type */
export type ArtworkData = {
	nowPlayingArtURL: string;
	currentPageArtURL: string;
	currentPageURI: string;
};
