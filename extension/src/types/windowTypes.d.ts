interface Window extends Window {
  rootStyle: CSSStyleDeclaration;
  currentArtUrl: string;
  playlistArtUrl: { url: string; uri: string };
  isCustomControls: boolean;
  isWindows: boolean;
  isLightMode: boolean;
  isGlobalNav: boolean;
  isModalOpen: boolean;
  pageCategory: PageCategoryType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}
