import CustomInput from "@/components/ui/CustomInput";
import React, { type FC, type ChangeEvent } from "react";

export const FontInput: FC<{
	fontFamily: string;
	fontUrl: string;
	onFontChange: (newFont: string) => void;
}> = ({ fontFamily, fontUrl, onFontChange }) => {
	const [inputValue, setInputValue] = React.useState(fontUrl || fontFamily);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onFontChange(e.target.value);
	};

	return (
		<div>
			<CustomInput
				name="Font Family"
				onChange={handleInputChange}
				placeholder="Enter Font Family Name or Google Fonts link"
				type="text"
				value={inputValue}
			/>
		</div>
	);
};
