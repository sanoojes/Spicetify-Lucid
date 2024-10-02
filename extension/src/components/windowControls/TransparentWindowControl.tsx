import {
	isCustomControls,
	isLightModeEnabled,
	isSpotifyV16Above,
	isWindowsPlatform,
} from "@/constants/constants";
import { useLucidStore } from "@/store/useLucidStore";
import { setWindowControlsHeight } from "@/utils/windowControlUtils";
import {
	calculateBrowserZoom,
	calculateInverseBrowserZoom,
	calculateScaledPx,
} from "@/utils/zoomUtils";
import React from "react";

const TransparentWindowControl = React.memo(() => {
	const TransparentWindowControlRef = React.useRef<HTMLDivElement | null>(null);

	const { rootStyle } = useLucidStore();

	React.useEffect(() => {
		async function setTopBarStyles() {
			if (!isCustomControls && isWindowsPlatform) {
				const baseHeight = isSpotifyV16Above ? 32 : 64;
				const baseWidth = 135;

				const normalZoom = calculateBrowserZoom();
				const inverseZoom = calculateInverseBrowserZoom();

				const constant = 0.912872807;

				const finalControlHeight = Math.round(
					((normalZoom * 100) ** constant * 100) / 100 -
						(isSpotifyV16Above ? 0 : 3),
				);

				await setWindowControlsHeight(finalControlHeight);

				const paddingStart = calculateScaledPx(64, inverseZoom, 1);
				const paddingEnd = calculateScaledPx(135, inverseZoom, 1);

				rootStyle.setProperty("--top-bar-padding-start", `${paddingStart}px`);
				rootStyle.setProperty("--top-bar-padding-end", `${paddingEnd}px`);

				if (isWindowsPlatform && !isCustomControls && !isLightModeEnabled) {
					const controlHeight = isSpotifyV16Above
						? calculateScaledPx(baseHeight, inverseZoom, 1)
						: baseHeight;
					const controlWidth = calculateScaledPx(baseWidth, inverseZoom, 1);

					if (TransparentWindowControlRef.current) {
						TransparentWindowControlRef.current.style.setProperty(
							"--transperent-controls-top-offset",
							`${isSpotifyV16Above ? finalControlHeight / 4 : 0}px`,
						);

						TransparentWindowControlRef.current.style.height = `${controlHeight}px`;
						TransparentWindowControlRef.current.style.width = `${controlWidth}px`;
					}
				}
			}
		}

		setTimeout(setTopBarStyles, 1000);
		window.addEventListener("resize", setTopBarStyles);

		return () => {
			window.removeEventListener("resize", setTopBarStyles);
		};
	}, [rootStyle]);

	return (
		<div
			ref={TransparentWindowControlRef}
			className="lucid-transperent-window-controls"
		/>
	);
});

export default TransparentWindowControl;
