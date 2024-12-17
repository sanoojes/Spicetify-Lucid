import ArrowDown from "@/components/svg/ArrowDown";
import type { DropdownSetting } from "@/types/dropdown";
import React, { useEffect, useRef, useState, type FC } from "react";

const Dropdown: FC<DropdownSetting> = ({ options, selectedValue, onChange, placeholder, disabled }) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSelect = (value: string) => {
		setIsOpen(false);
		onChange(value);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			<div className="dropdown-container" ref={dropdownRef}>
				<button
					className={`dropdown-button ${isOpen ? "open" : ""}`}
					onClick={handleToggle}
					aria-label="Toggle dropdown menu"
					type="button">
					<p className="encore-text">{placeholder || selectedValue || "Dropdown"}</p>
					<span className="dropdown-arrow">
						<ArrowDown />
					</span>
				</button>
				<div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
					{isOpen
						? options?.map((option) => (
								<li
									key={option.value}
									className={`dropdown-item ${selectedValue === option.value ? "selected" : ""}`}
									onClick={() => !option.disabled && handleSelect(option.value)}
									onKeyDown={(e) => !option.disabled && e.key === "Enter" && handleSelect(option.value)}
									style={{ opacity: `${disabled ? 0.75 : 1}` }}>
									<p className="encore-text">{option.label}</p>
								</li>
							))
						: null}
				</div>
			</div>
		</>
	);
};

export default Dropdown;
