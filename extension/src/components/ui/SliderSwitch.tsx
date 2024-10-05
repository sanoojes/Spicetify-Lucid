import React from "react";

export type ToggleSetting = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const SliderSwitch = ({ onChange, checked, label }: ToggleSetting) => {
	const toggleSwtich = () => {
		onChange(!checked);
	};

	return (
		<div className="slider-wrapper">
			<label className="switch" aria-label={label}>
				<input aria-label="toggleSwtich" type="checkbox" checked={checked} onChange={toggleSwtich} />
				<span className="slider round" />
			</label>
		</div>
	);
};

export default SliderSwitch;
