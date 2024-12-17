import SettingsModal from "@/components/settings/SettingsModal";
import { useModal } from "@/context/ModalContextProvider";
import useSettingsAccess from "@/hooks/useSettingsAccess";
import { logDebug } from "@/utils/logUtils";
import React, { memo } from "react";

const SettingsManager = memo(() => {
	logDebug("Render <SettingsManager />");

	const { isOpen } = useModal("settings");
	useSettingsAccess();

	return <>{isOpen && <SettingsModal />}</>;
});

export default SettingsManager;
