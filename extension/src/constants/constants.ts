import type {
	AppSettings,
	BackgroundStyleSettings,
	PlaybarStyleSettings,
} from "@/types/settingTypes";
import {
	checkSpotifyVersionIsAbove,
	detectWindows,
	getIsGlobalNav,
	getIsLightMode,
} from "@/utils/platformUtils";
import { getIsCustomControls } from "@/utils/windowControlUtils";

//  Settings Local Key
export const SETTINGS_LOCAL_KEY: string = "lucid:settings";

//  Settings
export const DEFAULT_BACKGROUND_STYLES: BackgroundStyleSettings = {
	solid: {
		opacity: 1,
		backgroundColor: "var(--spice-main)",
	},
	static: {
		blur: 32,
		opacity: 1,
		saturation: 1.1,
		contrast: 1.2,
		brightness: 0.6,
		backgroundColor: "var(--spice-main)",
	},
	animated: {
		blur: 32,
		time: 45,
		opacity: 1,
		saturation: 1.1,
		contrast: 1.2,
		brightness: 0.6,
		backgroundColor: "var(--spice-main)",
	},
};

export const DEFAULT_PLAYBAR_STYLES: PlaybarStyleSettings = {
	compact: {
		opacity: 1,
		saturation: 1.1,
		contrast: 1.2,
		brightness: 0.8,
		borderRadius: 8,
		backdropBlur: 32,
		paddingX: 6,
		backgroundColor: "rgba(var(--spice-rgb-card), 0.5)",
	},
	default: {
		opacity: 1,
		paddingX: 6,
		saturation: 1.1,
		contrast: 1.2,
		borderRadius: 8,
		brightness: 0.8,
		backdropBlur: 32,
		backgroundColor: "rgba(var(--spice-rgb-card), 0.5)",
	},
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
	backgroundMode: "static",
	backgroundStyles: DEFAULT_BACKGROUND_STYLES,
	grainEffect: "stary",
	isDynamicColor: false,
	isScrollMode: true,
	isCustomBackground: false,
	customBackgroundURL: "",
	playlistImageMode: "inherit",
	playbarMode: "default",
	playbarStyles: DEFAULT_PLAYBAR_STYLES,
	fontSettings: {
		title: { fontFamily: "Poppins", url: "" },
		body: { fontFamily: "Poppins", url: "" },
	},
	playlistViewMode: "card",
};

// API Urls
export const GITHUB_RELEASES_URL =
	"https://api.github.com/repos/sanoojes/spicetify-lucid/releases";

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
