import type { BackgroundStyle } from "@/types/background";
import type { PlaybarStyles } from "@/types/playbar";
import type { ThemeSettings } from "@/types/settingTypes";

//  Settings
export const DEFAULT_BACKGROUND_STYLES: BackgroundStyle = {
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
	},
	animated: {
		blur: 32,
		time: 45,
		opacity: 1,
		saturation: 1.1,
		contrast: 1.2,
		brightness: 0.6,
	},
};

export const DEFAULT_PLAYBAR_STYLES: PlaybarStyles = {
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

export const DEFAULT_APP_SETTINGS: ThemeSettings = {
	backgroundSettings: {
		mode: "animated",
		styles: DEFAULT_BACKGROUND_STYLES,
		customBackgroundOverride: {
			url: null,
		},
	},
	interfaceSettings: {
		fontSettings: {
			body: {
				url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
				fontFamily: "Poppins",
			},
		},
		grainSettings: {
			grainEffect: "default",
		},
		pagesSettings: {
			isScrollMode: false,
			backgroundImageMode: "inherit",
			playlistViewMode: "default",
		},
		borderSettings: {
			color: "rgba(var(--spice-rgb-text), 0.125)",
			style: "solid",
			thickness: 1,
		},
	},
	colorSettings: {
		isDynamicColor: false,
	},
	playbarSettings: {
		mode: "default",
		styles: DEFAULT_PLAYBAR_STYLES,
	},
};
