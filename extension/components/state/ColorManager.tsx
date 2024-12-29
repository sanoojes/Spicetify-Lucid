import { useImageStore } from "@/store/useImageStore";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { addDynamicColorsFromImage, resetDynamicColors } from "@/utils/dynamicColorUtils";
import { logDebug } from "@/utils/logUtils";
import { useEffect } from "react";

const ColorManager = () => {
	logDebug("Render <ColorManager />");

	const {
		colorSettings: { isDynamicColor },
	} = useSettingsStore();

	const { artworkData } = useLucidStore();
	const { selectedLocalImage, isUseLocalImage } = useImageStore();

	useEffect(() => {
		if (!isDynamicColor) {
			resetDynamicColors();
			return;
		}

		addDynamicColorsFromImage(
			isUseLocalImage && selectedLocalImage?.dataURL ? selectedLocalImage.dataURL : artworkData.nowPlayingArtURL,
		);
	}, [selectedLocalImage, isUseLocalImage, artworkData.nowPlayingArtURL, isDynamicColor]);

	return null;
};

export default ColorManager;
