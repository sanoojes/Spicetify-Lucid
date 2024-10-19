import Modal from "@/components/modal/Modal";
import BackgroundSection from "@/components/settings/section/BackgroundSection";
import ImportExportSection from "@/components/settings/section/ImportExportSection";
import InterfaceSection from "@/components/settings/section/InterfaceSection";
import PlaybarSection from "@/components/settings/section/PlaybarSection";
import ResetSettingsSection from "@/components/settings/section/ResetSection";
import { useModal } from "@/context/ModalContextProvider";
import React, { type FC, memo } from "react";

// TODO: Add Pagination to sections
const SettingsModal: FC = memo(() => {
	const { isOpen, closeModal } = useModal("settings");

	return (
		<Modal title="Lucid Settings" onClose={closeModal} isOpen={isOpen}>
			<div className="sections-container">
				<BackgroundSection />
				<InterfaceSection />
				<PlaybarSection />
				<ResetSettingsSection />
				<ImportExportSection />
			</div>
		</Modal>
	);
});

export default SettingsModal;
