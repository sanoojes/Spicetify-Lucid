import { useLucidStore } from "@/store/useLucidStore";
import { logDebug } from "@/utils/logUtils";
import React, { useEffect, useRef } from "react";

const ZoomManager = () => {
	const prevValues = useRef({
		outerWidth: window.outerWidth,
		innerWidth: window.innerWidth,
		ratio: window.devicePixelRatio,
	});
	const { windowZoom, setWindowZoom } = useLucidStore();
	const prevOuterWidth = useRef(window.outerWidth);
	const prevInnerWidth = useRef(window.innerWidth);
	const prevRatio = useRef(window.devicePixelRatio);
	const startup = useRef(true);

	const mainRef = useRef(document.querySelector(".Root__main-view"));

	useEffect(() => {
		const updateZoom = () => {
			document.documentElement.style.setProperty("--main-view-height", `${mainRef.current?.clientHeight}px`);

			const newOuterWidth = window.outerWidth;
			const newInnerWidth = window.innerWidth;
			const newRatio = window.devicePixelRatio;

			if (
				startup.current ||
				((prevOuterWidth.current <= 160 || prevRatio.current !== newRatio) &&
					(prevOuterWidth.current !== newOuterWidth || prevInnerWidth.current !== newInnerWidth))
			) {
				const modified = newOuterWidth / newInnerWidth || 1;
				setWindowZoom(modified);
				document.documentElement.style.setProperty("--zoom", `${modified}`);

				logDebug(`Zoom Updated: ${newOuterWidth} / ${newInnerWidth} = ${modified}`);

				prevOuterWidth.current = newOuterWidth;
				prevInnerWidth.current = newInnerWidth;
				prevRatio.current = newRatio;
			}
		};

		const handleResize = () => {
			updateZoom();
		};

		updateZoom();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setWindowZoom]);

	return null;
};

export default ZoomManager;
