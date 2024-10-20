import Section from "@/components/settings/ui/SettingSection";
import { BACKGROUND_MODE_OPTIONS } from "@/constants/dropdown";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { BackgroundMode } from "@/types/background";
import type { SettingCardMap } from "@/types/settingTypes";
import { isValidUrl } from "@/utils/fontUtils";
import { getStyleInputMap } from "@/utils/getStyleInputMap";
import { renderCards } from "@/utils/render/renderCards";
import React, { useState } from "react";

const BackgroundSection = () => {
	const {
		backgroundSettings: { mode, styles, customBackgroundOverride },
		colorSettings: { isDynamicColor },
		setBackgroundMode,
		updateBackgroundStyle,
		setIsDynamicColor,
		setCustomBackgroundOverride,
	} = useSettingsStore();

	const [selectedMode, setSelectedMode] = useState<string>(mode);

	const onBackgroundModeChange = (value: string) => {
		setSelectedMode(value);
		setBackgroundMode(value as BackgroundMode);
	};

	const BACKGROUND_SETTINGS_CARDS: SettingCardMap = [
		{
			id: "backgroundOption",
			conditionalRender: true,
			cardProps: {
				title: "Background Option",
				type: "dropdown",
				tooltip: "Select the background mode to customize your background.",
				settings: {
					placeholder: selectedMode,
					selectedValue: selectedMode,
					options: BACKGROUND_MODE_OPTIONS,
					onChange: onBackgroundModeChange,
				},
			},
		},
		...getStyleInputMap<BackgroundMode>(styles, mode, updateBackgroundStyle),
		{
			id: "backgroundCustomUrl",
			conditionalRender: mode === "static",
			cardProps: {
				title: "Background image",
				type: "input",
				tooltip: (
					<>
						<span>Use a custom URL for the background image.</span>
						<span>Ensure the URL is a valid image link (e.g., .jpg, .png).</span>
						<span>Use "now-playing" for the now playing art image.</span>
						<span>Use "current-page" for the current page art image.</span>
					</>
				),
				settings: {
					type: "text",
					defaultValue: customBackgroundOverride?.url || "",
					label: "Url",
					validation: (value) => isValidUrl(value),
					onChange: (value) => {
						setCustomBackgroundOverride(value);
					},
				},
			},
		},
		{
			// TODO: add color export and import and change it to 'ColorSection'
			id: "dynamicColorToggle",
			conditionalRender: true,
			cardProps: {
				title: "Dynamic Color",
				type: "toggle",
				tooltip: "Enable dynamic color to adjust colors based on current playing album art.",
				settings: {
					checked: isDynamicColor,
					label: "Dynamic Color Toggle",
					onChange: (value: boolean) => {
						setIsDynamicColor(value);
					},
				},
			},
		},
	];

	return (
		<Section title="Background Settings" description="Set your Spotify interface settings.">
			{renderCards(BACKGROUND_SETTINGS_CARDS)}
		</Section>
	);
};

export default BackgroundSection;
