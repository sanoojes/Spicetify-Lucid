export const calculateBrowserZoom = (): number => {
	const viewportWidth: number = window.innerWidth;
	const windowWidth: number = window.outerWidth;
	const zoomLevel: number = windowWidth / viewportWidth;
	return zoomLevel;
};

export const calculateInverseBrowserZoom = (): number => {
	const viewportWidth: number = window.innerWidth;
	const windowWidth: number = window.outerWidth;
	const inverseZoomLevel: number = viewportWidth / windowWidth;
	return inverseZoomLevel;
};

export const calculateScaledPx = (
	baseWidth: number,
	inverseZoom: number,
	scalingFactorOut = 1,
	minWidth = 0,
	maxWidth: number = Number.POSITIVE_INFINITY,
): number => {
	const scaledWidth = baseWidth * (inverseZoom + scalingFactorOut - 1);
	return Math.max(minWidth, Math.min(scaledWidth, maxWidth));
};
