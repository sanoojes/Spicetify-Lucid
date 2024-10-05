export type BaseInputSetting = {
	label: string;
	placeholder?: string;
	defaultValue: string | number;
	onChange: (value: string) => void;
};

export type TextOrUrlInputSetting = BaseInputSetting & {
	type: "text" | "url";
	settings?: undefined;
	validation?: (value: string) => boolean;
};

export type NumberInputSetting = BaseInputSetting & {
	type: "number";
	validation?: (value: number) => boolean;
	settings?: {
		step?: number;
		min?: number;
		max?: number;
	};
};

export type InputSetting = TextOrUrlInputSetting | NumberInputSetting;
