import { useBodyClass } from "@/hooks/useBodyClass";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { logError } from "@/utils/logUtils";
import { getFormattedStylesAsCSSProperty } from "@/utils/styleUtils";
import React, { useEffect, useRef } from "react";

const PLAYBAR_CLASS_NAME = ".Root__now-playing-bar";

const PlaybarManager = () => {
	const { playbarSettings } = useSettingsStore();
	const playbarRef = useRef<HTMLElement>(document.querySelector(PLAYBAR_CLASS_NAME));

	useBodyClass(`playbar-${playbarSettings.mode}`);

	useEffect(() => {
		if (!playbarRef.current) {
			logError(`Playbar element with class '${PLAYBAR_CLASS_NAME}' not found!`);
			return;
		}

		const { mode, styles } = playbarSettings;
		const dynamicStyle = getFormattedStylesAsCSSProperty(styles[mode], true);
		const height = mode === "compact" ? styles[mode].height : playbarRef.current?.clientHeight || styles[mode]?.height;

		document.documentElement.style.setProperty("--playbar-height", `${height}px`);

		playbarRef.current.style.cssText = dynamicStyle.toString();
	}, [playbarSettings]);

	return null;
};

export default PlaybarManager;
