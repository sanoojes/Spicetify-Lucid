import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";
import { logError } from "@/utils/logUtils";
import { getFormattedStylesAsCSSProperty } from "@/utils/styleUtils";
import React from "react";

const usePlaybarManager = () => {
	const { playbarSettings } = useSettingsStore();

	useBodyClass(`playbar-${playbarSettings.mode}`);

	React.useEffect(() => {
		const dynamicStyle = getFormattedStylesAsCSSProperty(playbarSettings.styles[playbarSettings.mode], true);

		const rootPlaybar = document.querySelector(".Root__now-playing-bar") as HTMLElement | null;
		if (rootPlaybar) {
			rootPlaybar.style.cssText = dynamicStyle.toString();
			console.log(dynamicStyle);
		} else {
			logError("Playbar element not found!");
		}
	}, [playbarSettings]);
};

export default usePlaybarManager;
