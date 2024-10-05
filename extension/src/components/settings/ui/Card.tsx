import TitleContainer from "@/components/settings/ui/TitleContainer";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import SliderSwitch from "@/components/ui/SliderSwitch";
import type { SettingCardProps } from "@/types/settingTypes";
import React, { type FC } from "react";

const Card: FC<SettingCardProps> = ({ title, tooltip, selectedValue, type, settings }) => {
	return (
		<div className="card">
			<TitleContainer title={title} tooltip={tooltip} selectedValue={selectedValue} />
			<div className="children-wrapper">
				{type === "dropdown" ? <Dropdown {...settings} /> : null}
				{type === "input" ? <Input {...settings} /> : null}
				{type === "toggle" ? <SliderSwitch {...settings} /> : null}
				{type === "button" ? <Button {...settings} /> : null}
			</div>
		</div>
	);
};

export default Card;
