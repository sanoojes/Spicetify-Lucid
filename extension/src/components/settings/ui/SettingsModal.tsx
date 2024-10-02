import Modal from "@/components/modal/Modal";
import BackgroundSection from "@/components/settings/sections/BackgroundSettingsSection";
import FontSection from "@/components/settings/sections/FontSettingsSection";
import GrainSection from "@/components/settings/sections/GrainSettingsSection";
import PlaybarSettingsSection from "@/components/settings/sections/PlaybarSettingsSection";
import PlaylistViewSettingsSection from "@/components/settings/sections/PlaylistViewSettingsSection";
import ResetSettingsSection from "@/components/settings/sections/ResetSettingsSection";
import SettingSection from "@/components/settings/ui/SettingSection";
import { useModal } from "@/context/ModalContextProvider";
import type { SettingSectionData } from "@/types/settingTypes";
import React from "react";

const SettingsModal: React.FC = React.memo(() => {
	const SETTING_SECTIONS: SettingSectionData = React.useMemo(
		() => [
			{
				key: "background",
				title: "Background",
				description: "Customize your theme's background.",
				content: <BackgroundSection />,
			},
			{
				key: "grains",
				title: "Grains",
				description: "Set your grain texture.",
				content: <GrainSection />,
			},
			{
				key: "playlistView",
				title: "Playlist View",
				description: "Configure your playlist view.",
				content: <PlaylistViewSettingsSection />,
			},
			{
				key: "playbar",
				title: "Playbar",
				description: "Configure your playbar.",
				content: <PlaybarSettingsSection />,
			},
			{
				key: "font",
				title: "Font",
				description: "Select your desired font.",
				content: <FontSection />,
			},
			{
				key: "reset",
				title: "Reset Settings",
				description: "Reset to default settings.",
				content: <ResetSettingsSection />,
			},
		],
		[],
	);

	const [activeSection, setActiveSection] = React.useState<string>("all");
	const { isOpen, closeModal } = useModal("settings");

	const handleSectionClick = (sectionKey: string) => {
		setActiveSection(sectionKey);
	};

	const renderSections = () => {
		const sectionsToRender =
			activeSection === "all"
				? SETTING_SECTIONS
				: SETTING_SECTIONS.filter((section) => section.key === activeSection);

		return sectionsToRender.map((section) => (
			<div className="section-wrapper" key={section.key} id={section.key}>
				<SettingSection title={section.title} description={section.description}>
					{section.content}
				</SettingSection>
			</div>
		));
	};

	return (
		<Modal title="Lucid Settings" onClose={closeModal} isOpen={isOpen}>
			<div className="settings-navigation-container">
				<div className="navigation">
					<button
						type="button"
						onClick={() => handleSectionClick("all")}
						className={activeSection === "all" ? "active" : ""}>
						All
					</button>
					{SETTING_SECTIONS.map((section) => (
						<button
							type="button"
							key={section.key}
							onClick={() => handleSectionClick(section.key)}
							className={activeSection === section.key ? "active" : ""}>
							{section.title}
						</button>
					))}
				</div>
			</div>
			<div className="sections-container">{renderSections()}</div>
		</Modal>
	);
});

export default SettingsModal;
