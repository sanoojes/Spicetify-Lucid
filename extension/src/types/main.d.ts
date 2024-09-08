type PageCategoryType =
  | 'artist'
  | 'playlist'
  | 'album'
  | 'profile'
  | 'show'
  | 'other';

// Lucid Store Types
type LucidStoreValues = {
  pageCategory: PageCategoryType;
  underMainBackgroundImage: string | null;
  isCustomControls: boolean;
  isLightMode: boolean;
  isWindows: boolean;
  isGlobalNav: boolean;
  rootStyle: CSSStyleDeclaration;
  artworkData: ArtworkData;
};

type LucidStoreSetters = {
  updateArtworkData: (newArtwork: Partial<ArtworkData>) => void;
  setPageCategory: (pageCategory: PageCategoryType) => void;
  setUnderMainViewBackgroundImage: (url: string | null) => void;
  setIsCustomControls: (isCustomControls: boolean) => void;
  setIsLightMode: (isLightMode: boolean) => void;
  setRootStyle: (rootStyle: CSSStyleDeclaration) => void;
};

type LucidStoreState = LucidStoreValues & LucidStoreSetters;

/*  Artwork Data Type */
type ArtworkData = {
  nowPlayingArtURL: string;
  currentPageArtURL: string;
  currentPageURI: string;
};
