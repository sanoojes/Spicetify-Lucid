import type { FCStyleOptions } from "@/types/styles";
import { getFormattedStyles } from "@/utils/styleUtils";
import React, { type FC } from "react";

const AnimatedBackground: FC<FCStyleOptions> = ({ style }) => {
	return (
		<div className="animated-background-container" style={getFormattedStyles(style)}>
			<div className="back" />
			<div className="backleft" />
			<div className="backright" />
			<div className="front" />
		</div>
	);
};

export default AnimatedBackground;
