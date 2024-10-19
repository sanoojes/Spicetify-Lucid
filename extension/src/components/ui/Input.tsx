import type { InputSetting } from "@/types/input";
import { debounce } from "@/utils/debounce";
import React, { useState, useCallback, type ChangeEvent, type FC, useMemo, forwardRef } from "react";

// TODO: implement input validation
const Input = forwardRef<HTMLInputElement, InputSetting>(
	({ label, defaultValue, onChange, type, placeholder, settings, validation }, ref) => {
		const [inputValue, setInputValue] = useState<string | number | null>(defaultValue || null);

		const debouncedOnChange = useMemo(() => {
			return debounce((value: string) => {
				onChange?.(value);
			}, 1000);
		}, [onChange]);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				const value = e.target.value;
				setInputValue(value);
				debouncedOnChange(value);
			},
			[debouncedOnChange],
		);

		return (
			<div className="input-container">
				<label aria-label={label}>
					<input
						aria-label={label}
						type={type}
						className="input encore-text"
						value={inputValue ?? ""}
						onChange={handleChange}
						placeholder={placeholder}
						step={type === "number" && settings ? settings.step : 1}
						min={type === "number" && settings ? settings.min : 0}
						max={type === "number" && settings ? settings.max : 100}
						ref={ref}
					/>
				</label>
			</div>
		);
	},
);

export default Input;
