import TitleContainer from "@/components/settings/ui/TitleContainer";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import SliderSwitch from "@/components/ui/SliderSwitch";
import type { SettingCardProps } from "@/types/settingTypes";
import React, { type FC } from "react";

const Card: FC<SettingCardProps> = ({ title, tooltip, selectedValue, type, settings, children, style }) => {
	return (
		<div className="card">
			<TitleContainer title={title} tooltip={tooltip} selectedValue={selectedValue} />
			<div className="children-wrapper" style={style || {}}>
				{type === "dropdown" && <Dropdown {...settings} />}
				{type === "input" && <Input {...settings} />}
				{type === "toggle" && <SliderSwitch {...settings} />}
				{type === "button" && <Button {...settings} />}
				{children}
			</div>
		</div>
	);
};

export default Card;
