import { useSettingsStore } from "@/store/useSettingsStore";
import type { BorderSettings } from "@/types/border";
import React, { useEffect } from "react";

const BorderManager = () => {
	const {
		interfaceSettings: { borderSettings },
	} = useSettingsStore();
	useEffect(() => {
		const getFormattedStylesAsCSSProperty = (borderSettings: BorderSettings): string => {
			if (!Object.keys(borderSettings).length) return "";

			return Object.entries(borderSettings)
				.map(
					([key, value]) =>
						`--border-${key}: ${key === "thickness" || key === "roundedRadius" ? `${value}px` : value};`,
				)
				.join(" ");
		};

		const cssProperties = getFormattedStylesAsCSSProperty(borderSettings);
		document.documentElement.style.cssText += cssProperties;
	}, [borderSettings]);

	return null;
};

export default BorderManager;
