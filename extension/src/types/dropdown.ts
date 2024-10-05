export type DropdownOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

export type DropdownSetting = {
	options: DropdownOption[];
	selectedValue?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
};
