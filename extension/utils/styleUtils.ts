import type { StyleOptions } from "@/types/styles";
import type { CSSProperties } from "react";

const appendFilter = (currentFilter: string | undefined, newFilter: string): string =>
	[currentFilter, newFilter].filter(Boolean).join(" ").trim();

export const getFormattedStyles = (dynamicStyles: StyleOptions): CSSProperties => {
	if (!Object.keys(dynamicStyles).length) return {};

	const styles: CSSProperties = {};

	// Handle known cases first for performance
	if (dynamicStyles.blur !== undefined) {
		styles.filter = appendFilter(styles.filter, `blur(${dynamicStyles.blur}px)`);
	}
	if (dynamicStyles.backdropBlur !== undefined) {
		styles.backdropFilter = `blur(${dynamicStyles.backdropBlur}px)`;
	}
	if (dynamicStyles.contrast !== undefined) {
		styles.filter = appendFilter(styles.filter, `contrast(${dynamicStyles.contrast})`);
	}
	if (dynamicStyles.brightness !== undefined) {
		styles.filter = appendFilter(styles.filter, `brightness(${dynamicStyles.brightness})`);
	}
	if (dynamicStyles.saturation !== undefined) {
		styles.filter = appendFilter(styles.filter, `saturate(${dynamicStyles.saturation})`);
	}

	if (dynamicStyles.opacity !== undefined) {
		styles.opacity = dynamicStyles.opacity;
	}
	if (dynamicStyles.width !== undefined) {
		styles.width = `${dynamicStyles.width}px`;
	}
	if (dynamicStyles.height !== undefined) {
		styles.height = `${dynamicStyles.height}px`;
	}
	if (dynamicStyles.paddingX !== undefined || dynamicStyles.paddingY !== undefined) {
		styles.padding = `${dynamicStyles.paddingY || 0}px ${dynamicStyles.paddingX || 0}px`;
	}
	if (dynamicStyles.borderRadius !== undefined) {
		styles.borderRadius = `${dynamicStyles.borderRadius}px`;
	}

	if (dynamicStyles.backgroundColor !== undefined) {
		styles.backgroundColor = `${dynamicStyles.backgroundColor}`;
	}

	return styles;
};

import type { CustomCSSProperties } from "@/types/styles";

export const getFormattedStylesAsCSSProperty = (
	dynamicStyles: StyleOptions,
	isString = false,
): CustomCSSProperties | string => {
	// Handle case when no dynamic styles are provided
	if (!Object.keys(dynamicStyles).length) return isString ? "" : {};

	const styles: CustomCSSProperties = {};

	// Handle known cases
	if (dynamicStyles.blur !== undefined) {
		styles["--blur"] = `${dynamicStyles.blur}px`;
	}
	if (dynamicStyles.backdropBlur !== undefined) {
		styles["--backdrop-blur"] = `${dynamicStyles.backdropBlur}px`;
	}
	if (dynamicStyles.contrast !== undefined) {
		styles["--contrast"] = dynamicStyles.contrast;
	}
	if (dynamicStyles.brightness !== undefined) {
		styles["--brightness"] = dynamicStyles.brightness;
	}
	if (dynamicStyles.saturation !== undefined) {
		styles["--saturation"] = dynamicStyles.saturation;
	}
	if (dynamicStyles.width !== undefined) {
		styles["--width"] = `${dynamicStyles.width}px`;
	}
	if (dynamicStyles.height !== undefined) {
		styles["--height"] = `${dynamicStyles.height}px`;
	}
	if (dynamicStyles.paddingX !== undefined) {
		styles["--padding-x"] = `${dynamicStyles.paddingX}px`;
	}
	if (dynamicStyles.borderRadius !== undefined) {
		styles["--border-radius"] = `${dynamicStyles.borderRadius}px`;
	}
	if (dynamicStyles.backgroundColor !== undefined) {
		styles["--background-color"] = dynamicStyles.backgroundColor;
	}
	if (dynamicStyles.time !== undefined) {
		styles["--time"] = `${dynamicStyles.time}s`;
	}
	if (dynamicStyles.opacity !== undefined) {
		styles["--opacity"] = dynamicStyles.opacity;
	}

	// Return the styles as a string or as an object based on the flag
	if (isString) {
		return Object.entries(styles)
			.map(([key, value]) => `${key}: ${value};`)
			.join(" ");
	}

	return styles;
};
