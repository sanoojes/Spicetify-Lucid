import type { CustomInputProps } from "@/types/ui";
import { isValidUrl } from "@/utils/fontUtils";
import React, { type ChangeEvent, type FC, useState } from "react";

const CustomInput: FC<CustomInputProps> = ({
	name,
	step,
	type,
	value,
	placeholder,
	onChange,
	isURL = false,
	expectURL = false,
}) => {
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		if (isURL || expectURL) {
			if (newValue && !isValidUrl(newValue)) {
				setError("Please enter a valid URL.");
			} else {
				setError(null);
			}
		}

		onChange(e);
	};

	return (
		<div className="custom-input-container">
			{error && <span className="error-message">{error}</span>}
			<input
				type={type}
				name={name}
				step={step}
				placeholder={placeholder}
				value={value !== undefined ? value?.toString() : ""}
				className={`input ${isURL ? "url" : null}`}
				onChange={handleChange}
			/>
		</div>
	);
};

export default React.memo(CustomInput);
