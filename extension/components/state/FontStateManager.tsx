import { useSettingsStore } from "@/store/useSettingsStore";
import type { FontTypes } from "@/types/font";
import { loadFontFromUrl } from "@/utils/fontUtils";
import { logError } from "@/utils/logUtils";
import { useCallback, useEffect } from "react";

const FontStateManager = () => {
	const {
		interfaceSettings: { fontSettings },
	} = useSettingsStore();

	const updateCssVariable = useCallback((fontType: string, fontFamily: string) => {
		document.documentElement.style.setProperty(`--${fontType}-font-to-use`, fontFamily);
	}, []);

	const handleFontChange = useCallback(
		async (fontType: FontTypes) => {
			const { fontFamily, url } = fontSettings[fontType];

			try {
				await loadFontFromUrl(url, `${fontType}-font`);
				updateCssVariable(fontType, fontFamily);
			} catch (error) {
				logError(`Failed to load font from ${url}`, error);
				updateCssVariable(fontType, fontFamily);
			}
		},
		[fontSettings, updateCssVariable],
	);

	useEffect(() => {
		Object.keys(fontSettings).map((fontType) => handleFontChange(fontType as FontTypes));
	}, [fontSettings, handleFontChange]);

	return null;
};

export default FontStateManager;
