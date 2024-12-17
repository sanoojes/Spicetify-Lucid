import Section from "@/components/settings/ui/SettingSection";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { SettingCardMap } from "@/types/settingTypes";
import { renderCards } from "@/utils/render/renderCards";
import React from "react";

const ResetSection = () => {
	const { resetAllSettings } = useSettingsStore();

	const handleSettingsReset = () => {
		if (
			window.confirm(
				"Are you sure you want to reset all settings to their default values? This action cannot be undone.",
			)
		) {
			resetAllSettings();
		}
	};

	const RESET_SETTINGS_CARDS: SettingCardMap = [
		{
			id: "resetButtonCard",
			conditionalRender: true,
			cardProps: {
				title: "Reset All Settings",
				type: "button",
				settings: {
					variant: "danger",
					size: "medium",
					children: "Reset",
					onClick: handleSettingsReset,
				},
			},
		},
	];

	return (
		<Section title="Reset Settings" description="Reset your theme settings.">
			{renderCards(RESET_SETTINGS_CARDS)}
		</Section>
	);
};

export default ResetSection;
