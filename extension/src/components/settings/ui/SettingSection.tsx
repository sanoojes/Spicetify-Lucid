import type { SectionProps } from "@/types/settingTypes";
import React from "react";

const Section = ({ title, description, children }: SectionProps) => {
	return (
		<div className="setting-section">
			<div className="heading-wrapper">
				<h3 className="title encore-text encore-text-title-small">{title}</h3>
				{description && <p className="desc encore-text encore-text-body-small">{description}</p>}
			</div>
			{children}
		</div>
	);
};

export default Section;
