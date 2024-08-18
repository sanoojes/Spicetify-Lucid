interface Window extends Window {
  rootStyle: CSSStyleDeclaration;
  currentArtUrl: string;
  isCustomControls: boolean;
  isWindows: boolean;
  isLightMode: boolean;
  isGlobalNav: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}
