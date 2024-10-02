import SettingsCardWrapper from "@/components/settings/ui/SettingsCardWrapper";
import type { SettingSectionProps } from "@/types/settingTypes";
import React from "react";

const SettingSection = ({
	title,
	description,
	children,
}: SettingSectionProps) => {
	return (
		<div className="setting-section">
			<div className="heading-wrapper">
				<h3 className="title">{title}</h3>
				{description && <p className="description">{description}</p>}
			</div>
			<SettingsCardWrapper>{children}</SettingsCardWrapper>
		</div>
	);
};

export default SettingSection;
