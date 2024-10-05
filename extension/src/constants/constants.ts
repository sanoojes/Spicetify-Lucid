import { checkSpotifyVersionIsAbove, detectWindows, getIsGlobalNav, getIsLightMode } from "@/utils/platformUtils";
import { getIsCustomControls } from "@/utils/windowControlUtils";

//  Settings Local Key
export const SETTINGS_LOCAL_KEY: string = "lucid:settings";

// API Urls
export const GITHUB_RELEASES_URL = "https://api.github.com/repos/sanoojes/spicetify-lucid/releases";

// DOM Selectors & Prefixes
export const SCROLL_NODE_SELECTORS =
	".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]";
export const PLAYLIST_ART_IMAGE_CLASS_PREFIX = "playlist-art-image-";
export const PLAYLIST_VIEW_CLASS_PREFIX = "playlist-view-";

// Feature Flags
export const isSpotifyV16Above = checkSpotifyVersionIsAbove("1.2.46");
export const isLightModeEnabled = getIsLightMode();
export const isWindowsPlatform = detectWindows();
export const isGlobalNav = getIsGlobalNav();
export const isCustomControls = getIsCustomControls();
