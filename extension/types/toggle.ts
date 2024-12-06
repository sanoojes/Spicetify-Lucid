export type ToggleSetting = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};
