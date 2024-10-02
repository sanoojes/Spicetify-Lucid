import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { CustomCSSProperties } from "@/types/settingTypes";
import { logError } from "@/utils/logUtils";
import React from "react";

const usePlaybarManager = () => {
	const { playbarMode, playbarStyles } = useSettingsStore();

	useBodyClass(`playbar-${playbarMode}`);

	const dynamicStyleRef = React.useRef<CustomCSSProperties>(
		{} as CustomCSSProperties,
	);

	React.useEffect(() => {
		const newDynamicStyle = {
			"--background-color": playbarStyles[playbarMode]?.backgroundColor,
			"--opacity": playbarStyles[playbarMode]?.opacity,
			"--brightness": playbarStyles[playbarMode]?.brightness,
			"--contrast": playbarStyles[playbarMode]?.contrast,
			"--padding-x": `${playbarStyles[playbarMode]?.paddingX || 0}px`,
			"--padding-y": `${playbarStyles[playbarMode]?.paddingY || 0}px`,
			"--time": `${playbarStyles[playbarMode]?.time || 0}s`,
			"--blur": `${playbarStyles[playbarMode]?.blur || 0}px`,
			"--border-radius": `${playbarStyles[playbarMode]?.borderRadius || 8}px`,
			"--saturation": playbarStyles[playbarMode]?.saturation,
			"--backdrop-blur": `${playbarStyles[playbarMode]?.backdropBlur || 0}px`,
		};

		// Update the ref object directly to avoid unnecessary re-renders
		dynamicStyleRef.current = newDynamicStyle;

		const rootPlaybar = document.querySelector(
			".Root__now-playing-bar",
		) as HTMLElement | null;
		if (rootPlaybar) {
			rootPlaybar.style.cssText = Object.entries(dynamicStyleRef.current)
				.map(([key, value]) => `${key}: ${value};`)
				.join(" ");
		} else {
			logError("Playbar element not found!");
		}
	}, [playbarMode, playbarStyles]);

	return dynamicStyleRef.current;
};

export default usePlaybarManager;
