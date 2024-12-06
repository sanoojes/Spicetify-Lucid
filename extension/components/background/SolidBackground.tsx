import type { FCStyleOptions } from "@/types/styles";
import { getFormattedStyles } from "@/utils/styleUtils";
import React, { type FC } from "react";

const SolidBackground: FC<FCStyleOptions> = ({ style }) => {
	return <div className="solid-background" style={{ ...getFormattedStyles(style) }} />;
};

export default SolidBackground;
