import CardWrapper from "@/components/settings/ui/CardWrapper";
import type { SectionProps } from "@/types/settingTypes";
import React from "react";

const Section = ({ title, description, children }: SectionProps) => {
	return (
		<div className="setting-section">
			<div className="heading-wrapper">
				<h3 className="title">{title}</h3>
				{description && <p className="description">{description}</p>}
			</div>
			{children}
		</div>
	);
};

export default Section;
