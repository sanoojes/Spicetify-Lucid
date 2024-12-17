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

export type BorderRadius = "card" | "rounded";

export type BorderSettings = {
	color: string;
	style: BorderStyle;
	thickness: number;
	roundedRadius: number;
};
