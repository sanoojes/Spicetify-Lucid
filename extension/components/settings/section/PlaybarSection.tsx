import Section from "@/components/settings/ui/SettingSection";
import { PLAYBAR_MODE_OPTIONS } from "@/constants/dropdown";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { PlaybarMode } from "@/types/playbar";
import type { SettingCardMap } from "@/types/settingTypes";
import { getStyleInputMap } from "@/utils/getStyleInputMap";
import { renderCards } from "@/utils/render/renderCards";
import React, { useState } from "react";

const PlaybarSection = () => {
	const {
		playbarSettings: { mode, styles },
		setPlaybarMode,
		updatePlaybarStyle,
	} = useSettingsStore();

	const [selectedMode, setSelectedMode] = useState<string>(mode);

	const onPlaybarModeChange = (value: string) => {
		setSelectedMode(value);
		setPlaybarMode(value as PlaybarMode);
	};

	const PLAYBAR_SETTINGS_CARDS: SettingCardMap = [
		{
			id: "playbarOption",
			conditionalRender: true,
			cardProps: {
				title: "Playbar Option",
				type: "dropdown",
				settings: {
					placeholder: selectedMode,
					selectedValue: selectedMode,
					options: PLAYBAR_MODE_OPTIONS,
					onChange: onPlaybarModeChange,
				},
			},
		},
		...getStyleInputMap<PlaybarMode>(styles, mode, updatePlaybarStyle),
	];

	return (
		<Section title="Playbar Settings" description="Set your Spotify Now Playing Bar settings.">
			{renderCards(PLAYBAR_SETTINGS_CARDS)}
		</Section>
	);
};

export default PlaybarSection;
