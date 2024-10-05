import { DEFAULT_APP_SETTINGS } from "@/constants/settingsStore";
import type { FontData, FontTypes } from "@/types/font";

export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const extractFontFamilyFromUrl = (url: string): string => {
	return decodeURIComponent(url.match(/family=([^&:]+)/)?.[1]?.replace(/\+/g, " ") || "") || "";
};

export const loadFontFromUrl = (url: string, fontId: string) => {
	let customFont = document.getElementById(fontId) as HTMLLinkElement;
	if (!customFont) {
		customFont = document.createElement("link");
		customFont.rel = "stylesheet";
		customFont.id = fontId;
		document.head.appendChild(customFont);
	}
	customFont.href = url;
};

export const getFontDataFromInput = (value: string): FontData => {
	let fontFamily = "";
	let url = "";

	if (isValidUrl(value)) {
		url = value;
		fontFamily = extractFontFamilyFromUrl(value);
	} else {
		url = value;
		fontFamily = value;
	}

	return { url, fontFamily };
};
