import SettingsModal from "@/components/settings/SettingsModal";
import { useModal } from "@/context/ModalContextProvider";
import useSettingsAccess from "@/hooks/useSettingsAccess";
import { logDebug } from "@/utils/logUtils";
import React from "react";

const SettingsManager = React.memo(() => {
	logDebug("Render <SettingsManager />");

	const { isOpen, openModal } = useModal("settings");

	useSettingsAccess(openModal);

	return <>{isOpen && <SettingsModal />}</>;
});

export default SettingsManager;
