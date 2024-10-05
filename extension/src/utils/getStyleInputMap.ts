import type { InputSetting } from "@/types/input";
import type { SettingsCardSection } from "@/types/settingTypes";
import type { StyleOptions } from "@/types/styles";

export const getStyleInputMap = <TMode extends string>(
	styles: Record<TMode, StyleOptions>,
	mode: TMode,
	setter: (mode: TMode, key: keyof StyleOptions, value: string | number) => void,
) => {
	return Object.entries(styles[mode]).map(
		([key, style]): SettingsCardSection => ({
			id: `style-${mode}`,
			sectionName: "Styles",
			conditionalRender: true,
			cardProps: {
				title: `Set ${key}`,
				type: "input",
				settings: {
					label: "",
					defaultValue: style,
					...(typeof style === "number"
						? {
								type: "number",
								onChange: (value: string) => {
									setter(mode, key as keyof StyleOptions, Number(value));
								},
								settings: {
									max: 256,
									min: 0,
									step: 1,
								},
							}
						: {
								type: "text",
								onChange: (value: string) => {
									setter(mode, key as keyof StyleOptions, value);
								},
							}),
				} as InputSetting,
			},
		}),
	);
};
