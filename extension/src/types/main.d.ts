type PageCategoryType =
  | 'artist'
  | 'playlist'
  | 'album'
  | 'profile'
  | 'show'
  | 'genre'
  | 'concert'
  | 'other';

// Lucid Store Types
type LucidStoreValues = {
  pageCategory: PageCategoryType;
  underMainBackgroundImage: string | null;
  rootStyle: CSSStyleDeclaration;
  artworkData: ArtworkData;
};

type LucidStoreSetters = {
  updateArtworkData: (newArtwork: Partial<ArtworkData>) => void;
  setPageCategory: (pageCategory: PageCategoryType) => void;
  setUnderMainViewBackgroundImage: (url: string | null) => void;
  setIsCustomControls: (isCustomControls: boolean) => void;
  setRootStyle: (rootStyle: CSSStyleDeclaration) => void;
};

type LucidStoreState = LucidStoreValues & LucidStoreSetters;

/*  Artwork Data Type */
type ArtworkData = {
  nowPlayingArtURL: string;
  currentPageArtURL: string;
  currentPageURI: string;
};
