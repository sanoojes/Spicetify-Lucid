import type { BorderSettings } from "@/types/border";
import type { ControlSettings } from "@/types/controls";
import type { FontSettings } from "@/types/font";
import type { GrainSettings } from "@/types/grains";
import type { PagesSettings } from "@/types/pages";

export type InterfaceSettings = {
	controlSettings: ControlSettings;
	fontSettings: FontSettings;
	grainSettings: GrainSettings;
	pagesSettings: PagesSettings;
	borderSettings: BorderSettings;
};
