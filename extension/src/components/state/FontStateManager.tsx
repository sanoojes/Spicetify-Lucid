import { useSettingsStore } from "@/store/useSettingsStore";
import type { FontTypes } from "@/types/font";
import { loadFontFromUrl } from "@/utils/fontUtils";
import { logDebug } from "@/utils/logUtils";
import React from "react";

const FontStateManager = () => {
	logDebug("Render <FontManager />");

	const {
		interfaceSettings: { fontSettings },
	} = useSettingsStore();

	const updateCssVariable = React.useCallback((fontType: string, fontFamily: string) => {
		document.documentElement.style.setProperty(`--${fontType}-font-to-use`, fontFamily);
	}, []);

	const handleFontChange = React.useCallback(
		async (fontType: FontTypes) => {
			const { fontFamily, url } = fontSettings[fontType];

			try {
				await loadFontFromUrl(url, `${fontType}-font`);
				updateCssVariable(fontType, fontFamily);
			} catch (error) {
				console.error(`Failed to load font from ${url}`, error);
				updateCssVariable(fontType, fontFamily);
			}
		},
		[fontSettings, updateCssVariable],
	);

	React.useEffect(() => {
		logDebug("useFontManager effect ran.");
		Object.keys(fontSettings).map((fontType) => handleFontChange(fontType as FontTypes));
	}, [fontSettings, handleFontChange]);

	return null;
};

export default FontStateManager;
