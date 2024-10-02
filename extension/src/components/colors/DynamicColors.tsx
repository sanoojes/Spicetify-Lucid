import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import {
	applyExtractedColorsToCSS,
	resetCSSColorVariables,
} from "@/utils/dynamicColorUtils";
import { logError, logInfo } from "@/utils/logUtils";
import React from "react";

const useDynamicBackground = () => {
	const { isDynamicColor } = useSettingsStore();
	const { artworkData } = useLucidStore();
	const styleRef = React.useRef<HTMLStyleElement | null>(null);
	const prevArtURL = React.useRef<string | null>(null);

	React.useEffect(() => {
		styleRef.current = document.createElement("style");
		styleRef.current.id = "lucid_dynamic_colors";
		document.head.appendChild(styleRef.current);

		return () => {
			if (styleRef.current) {
				document.head.removeChild(styleRef.current);
			}
		};
	}, []);

	React.useEffect(() => {
		if (!isDynamicColor) {
			if (prevArtURL.current) {
				prevArtURL.current = null;
			}

			if (styleRef.current) {
				resetCSSColorVariables(styleRef.current);
			}

			return;
		}

		if (isDynamicColor && artworkData.nowPlayingArtURL !== prevArtURL.current) {
			if (styleRef?.current && isDynamicColor && artworkData.nowPlayingArtURL) {
				applyExtractedColorsToCSS(
					styleRef.current,
					isDynamicColor,
					artworkData.nowPlayingArtURL,
				)
					.then(() => {
						logInfo("Dynamic colors updated!");
					})
					.catch((error) => {
						logError("Error updating colors:", error);
					});
			}

			prevArtURL.current = artworkData.nowPlayingArtURL;
		}
	}, [isDynamicColor, artworkData.nowPlayingArtURL]);
};

export default useDynamicBackground;
