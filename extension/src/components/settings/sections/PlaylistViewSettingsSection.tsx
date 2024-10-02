import Dropdown from "@/components/settings/ui/Dropdown";
import SettingsCard from "@/components/settings/ui/SettingsCard";
import SliderSwitch from "@/components/ui/SliderSwitch";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { PlaylistImageMode, PlaylistViewMode } from "@/types/settingTypes";
import React, { type FC } from "react";

const PlaylistViewSettingsSection: FC = () => {
	const playlistViewOptions: { label: string; value: PlaylistViewMode }[] = [
		{ label: "Default", value: "default" },
		{ label: "Compact", value: "compact" },
		{ label: "Card", value: "card" },
	];

	const playlistImageOptions: { label: string; value: PlaylistImageMode }[] = [
		{ label: "None", value: "none" },
		{ label: "Playlist Art Image", value: "inherit" },
		{ label: "Now Playing", value: "now-playing" },
	];

	const {
		playlistViewMode,
		playlistImageMode,
		setPlaylistViewMode,
		setPlaylistImageMode,
		isScrollMode,
		setIsScrollMode,
	} = useSettingsStore();

	const handlePlaylistViewSelect = (value: PlaylistViewMode) => {
		setPlaylistViewMode(value);
	};

	const handlePlaylistImageModeSelect = (value: PlaylistImageMode) => {
		setPlaylistImageMode(value);
	};

	return (
		<>
			<SettingsCard title="Set View Mode" selectedValue={playlistViewMode}>
				<Dropdown
					options={playlistViewOptions}
					onSelect={handlePlaylistViewSelect}
					selectedValue={playlistViewMode}
				/>
			</SettingsCard>
			<SettingsCard
				title="Set Background Image"
				selectedValue={playlistImageMode}>
				<Dropdown
					options={playlistImageOptions}
					onSelect={handlePlaylistImageModeSelect}
					selectedValue={playlistImageMode}
				/>
			</SettingsCard>
			<SettingsCard title="Scroll Background Image">
				<SliderSwitch currentValue={isScrollMode} onChange={setIsScrollMode} />
			</SettingsCard>
		</>
	);
};

export default PlaylistViewSettingsSection;
