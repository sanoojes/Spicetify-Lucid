import Dropdown from "@/components/settings/ui/Dropdown";
import SettingsCard from "@/components/settings/ui/SettingsCard";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { GrainEffect } from "@/types/settingTypes";
import React, { type FC } from "react";

const grainsOptions: { label: string; value: GrainEffect }[] = [
	{ label: "Stary", value: "stary" },
	{ label: "Default", value: "default" },
	{ label: "None", value: "none" },
];

const GrainSettingsSection: FC = () => {
	const { grainEffect, setGrainEffect } = useSettingsStore();

	const handleSelect = (value: GrainEffect) => {
		setGrainEffect(value);
	};

	return (
		<SettingsCard title="Set Grains" selectedValue={grainEffect}>
			<Dropdown
				options={grainsOptions}
				onSelect={handleSelect}
				selectedValue={grainEffect}
			/>
		</SettingsCard>
	);
};

export default GrainSettingsSection;
