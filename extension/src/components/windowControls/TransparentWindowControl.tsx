import { isCustomControls, isLightModeEnabled, isSpotifyV16Above, isWindowsPlatform } from "@/constants/constants";
import { useLucidStore } from "@/store/useLucidStore";
import { setWindowControlsHeight } from "@/utils/windowControlUtils";
import { calculateBrowserZoom, calculateInverseBrowserZoom, calculateScaledPx } from "@/utils/zoomUtils";
import React, { memo, useEffect, useRef, useState, type CSSProperties } from "react";

const TransparentWindowControl = memo(() => {
	const TransparentWindowControlRef = useRef<HTMLDivElement | null>(null);
	const { rootStyle } = useLucidStore();
	const [style, setStyle] = useState<CSSProperties>({});

	useEffect(() => {
		async function setTopBarStyles() {
			if (!isCustomControls && isWindowsPlatform) {
				const baseHeight = isSpotifyV16Above ? 32 : 64;
				const baseWidth = 135;

				const normalZoom = calculateBrowserZoom();
				const inverseZoom = calculateInverseBrowserZoom();

				const constant = 0.912872807;

				const finalControlHeight = Math.round(
					((normalZoom * 100) ** constant * 100) / 100 - (isSpotifyV16Above ? 0 : 3),
				);

				await setWindowControlsHeight(finalControlHeight);

				const paddingStart = calculateScaledPx(64, inverseZoom, 1);
				const paddingEnd = calculateScaledPx(135, inverseZoom, 1);

				rootStyle.setProperty("--top-bar-padding-start", `${paddingStart}px`);
				rootStyle.setProperty("--top-bar-padding-end", `${paddingEnd}px`);

				if (isWindowsPlatform && !isCustomControls && !isLightModeEnabled) {
					const controlHeight = isSpotifyV16Above ? calculateScaledPx(baseHeight, inverseZoom, 1) : baseHeight;
					const controlWidth = calculateScaledPx(baseWidth, inverseZoom, 1);

					const newStyle: CSSProperties = {
						position: "fixed",
						height: `${controlHeight}px`,
						width: `${controlWidth}px`,
						top: `${isSpotifyV16Above ? finalControlHeight / 4 : 0}px`,
						right: 0,
						WebkitBackdropFilter: "brightness(2.12)",
						backdropFilter: "brightness(2.12)",
						zIndex: "var(--above-main-and-now-playing-view-grid-area, 6)",
					};

					setStyle(newStyle);
				}
			}
		}

		setTimeout(setTopBarStyles, 1000);
		window.addEventListener("resize", setTopBarStyles);

		return () => {
			window.removeEventListener("resize", setTopBarStyles);
		};
	}, [rootStyle]);

	return <div ref={TransparentWindowControlRef} style={style} />;
});

export default TransparentWindowControl;
