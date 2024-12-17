export type FontTypes = "body";

export type FontData = {
	url: string;
	fontFamily: string;
};

export type FontSettings = {
	[key in FontTypes]: FontData;
};
