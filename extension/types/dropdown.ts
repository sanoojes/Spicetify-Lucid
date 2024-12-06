export type DropdownOption<T extends string = string> = {
	label: string;
	value: T;
	disabled?: boolean;
};

export type DropdownSetting = {
	options: DropdownOption[];
	selectedValue?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
};
