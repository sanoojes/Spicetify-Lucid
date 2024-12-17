import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useImageStore } from "@/store/useImageStore";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { applyExtractedColorsToCSS, resetCSSColorVariables } from "@/utils/dynamicColorUtils";
import { logDebug, logError, logInfo } from "@/utils/logUtils";
import React, { useEffect, useRef } from "react";

const ColorManager = () => {
	logDebug("Render <ColorManager />");

	const {
		colorSettings: { isDynamicColor },
	} = useSettingsStore();

	const { artworkData } = useLucidStore();
	const { selectedLocalImage, isUseLocalImage } = useImageStore();
	const styleRef = useRef<HTMLStyleElement | null>(null);
	const prevArtURL = useRef<string | null>(null);

	useEffect(() => {
		styleRef.current = document.createElement("style");
		styleRef.current.id = "lucid_dynamic_colors";
		document.head.appendChild(styleRef.current);

		return () => {
			if (styleRef.current) {
				document.head.removeChild(styleRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!isDynamicColor) {
			if (prevArtURL.current) {
				prevArtURL.current = null;
			}

			if (styleRef.current) {
				resetCSSColorVariables(styleRef.current);
			}

			return;
		}

		if (isDynamicColor && (artworkData.nowPlayingArtURL !== prevArtURL.current || selectedLocalImage?.dataURL)) {
			if (styleRef?.current && isDynamicColor && artworkData.nowPlayingArtURL) {
				applyExtractedColorsToCSS(
					styleRef.current,
					isDynamicColor,
					(isUseLocalImage && selectedLocalImage?.dataURL) || artworkData.nowPlayingArtURL,
				)
					.then(() => {
						logInfo("Dynamic colors updated!");
					})
					.catch((error) => {
						logError("Error updating colors:", error);
					});
			}

			prevArtURL.current = (isUseLocalImage && selectedLocalImage?.dataURL) || artworkData.nowPlayingArtURL;
		}
	}, [isDynamicColor, artworkData.nowPlayingArtURL, selectedLocalImage?.dataURL, isUseLocalImage]);

	return null;
};

export default ColorManager;
