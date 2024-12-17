export type BaseInputSetting = {
	label: string;
	placeholder?: string;
	defaultValue?: string | number | null;
};

export type TextOrUrlInputSetting = BaseInputSetting & {
	type: "text" | "url";
	settings?: undefined;
	onChange?: (value: string) => void;
	validation?: (value: string) => boolean;
};

export type NumberInputSetting = BaseInputSetting & {
	type: "number";
	validation?: (value: number) => boolean;
	onChange?: (value: string) => void;
	settings?: {
		step?: number;
		min?: number;
		max?: number;
	};
};

export type FileInputSetting = BaseInputSetting & {
	type: "file";
	settings?: {
		accept?: string;
		multiple?: boolean;
	};
	onChange?: (file: FileList | null) => void;
	validation?: (file: FileList | null) => boolean;
};

export type InputSetting = TextOrUrlInputSetting | NumberInputSetting | FileInputSetting;
