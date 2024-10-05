import SettingsModal from "@/components/settings/SettingsModal";
import { isSpotifyV16Above } from "@/constants/constants";
import { useModal } from "@/context/ModalContextProvider";
import useGlobalNavSettingsMenu from "@/hooks/useGlobalNavSettingsMenu";
import useSettingsProfileMenu from "@/hooks/useSettingsProfileMenu";
import { logDebug } from "@/utils/logUtils";
import React from "react";

const SettingsManager = React.memo(() => {
	logDebug("Render <SettingsManager />");

	const { isOpen, openModal } = useModal("settings");

	if (isSpotifyV16Above) useGlobalNavSettingsMenu({ onClick: openModal });
	else useSettingsProfileMenu({ onClick: openModal });

	return <>{isOpen && <SettingsModal />}</>;
});

export default SettingsManager;
