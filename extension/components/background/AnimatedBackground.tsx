import type { CustomCSSProperties, FCStyleOptions } from "@/types/styles";
import { getFormattedStylesAsCSSProperty } from "@/utils/styleUtils";
import React, { type FC } from "react";

const AnimatedBackground: FC<FCStyleOptions> = ({ style }) => {
	return (
		<div
			className="animated-background-container"
			style={{ ...(getFormattedStylesAsCSSProperty(style) as CustomCSSProperties) }}>
			<div className="back" />
			<div className="backleft" />
			<div className="backright" />
			<div className="front" />
		</div>
	);
};

export default AnimatedBackground;
