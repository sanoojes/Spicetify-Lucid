import Tooltip from "@/components/settings/ui/Tooltip";
import React, { type FC, type ReactNode } from "react";

type TitleContainerProps = {
	title: string;
	tooltip?: ReactNode;
	selectedValue?: string | ReactNode;
};

const TitleContainer: FC<TitleContainerProps> = ({ title, tooltip, selectedValue }) => {
	return (
		<div className="title-container">
			<div className="title-wrapper">
				{title && <h5 className="encore-text encore-text-body-medium-bold">{title}</h5>}
				{tooltip && <Tooltip>{tooltip}</Tooltip>}
			</div>
			{selectedValue && <p className="selected-value">Selected: {selectedValue}</p>}
		</div>
	);
};

export default TitleContainer;
