export type BorderStyle =
	| "none"
	| "hidden"
	| "dotted"
	| "dashed"
	| "solid"
	| "double"
	| "groove"
	| "ridge"
	| "inset"
	| "outset";

export type BorderSettings = {
	color: string;
	style: BorderStyle;
	thickness: number;
};
