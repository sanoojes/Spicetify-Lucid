import type { BorderSettings } from "@/types/border";
import type { FontSettings } from "@/types/font";
import type { GrainSettings } from "@/types/grains";
import type { PagesSettings } from "@/types/pages";

export type InterfaceSettings = {
	fontSettings: FontSettings;
	grainSettings: GrainSettings;
	pagesSettings: PagesSettings;
	borderSettings: BorderSettings;
};
