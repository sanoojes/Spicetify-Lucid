import AnimatedBackground from "@/components/background/AnimatedBackground";
import SolidBackground from "@/components/background/SolidBackground";
import StaticBackground from "@/components/background/StaticBackground";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { FCStyleOptions } from "@/types/styles";
import { logDebug } from "@/utils/logUtils";
import React, { type FC } from "react";

type BackgroundMode = "animated" | "static" | "solid";

const BackgroundComponents: Record<BackgroundMode, FC<FCStyleOptions>> = {
	animated: AnimatedBackground,
	static: StaticBackground,
	solid: SolidBackground,
};

const BackgroundManager: FC = () => {
	logDebug("Render <BackgroundManager />");

	const {
		backgroundSettings: { mode: backgroundMode, styles: backgroundStyles },
	} = useSettingsStore();

	const currentBackgroundStyles = backgroundStyles[backgroundMode];

	const BackgroundComponent = BackgroundComponents[backgroundMode];

	return (
		<div className="background-wrapper">
			{BackgroundComponent ? (
				<BackgroundComponent style={currentBackgroundStyles} />
			) : (
				<SolidBackground style={{ backgroundColor: "#202020" }} />
			)}
		</div>
	);
};

export default BackgroundManager;
