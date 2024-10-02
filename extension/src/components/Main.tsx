import MainStateManager from "@/components/MainStateManager";
import BackgroundManager from "@/components/background/BackgroundManager";
import ChangeLogManager from "@/components/changelog/ChangeLogManager";
import SettingsManager from "@/components/settings/SettingsManager";
import WindowControlsManager from "@/components/windowControls/WindowControlsManager";
import { ModalContextProvider } from "@/context/ModalContextProvider";
import { useUnderMainViewLoader } from "@/hooks/useUnderMainViewLoader";
import { manageBackgroundZIndex } from "@/utils/backgroundUtils";
import { logDebug } from "@/utils/logUtils";
import { replaceIcons } from "@/utils/replaceIcons";
import React from "react";

/**
 * Renders Main things for the theme
 */
const Main = () => {
	logDebug("Render <Main />");

	React.useEffect(() => {
		replaceIcons();
		manageBackgroundZIndex();
	}, []);

	useUnderMainViewLoader();

	return (
		<>
			<div id="state">
				<MainStateManager />
			</div>
			<div
				id="background-container"
				className="background-container"
				style={{ containerType: "normal" }}>
				<BackgroundManager />
			</div>
			<ModalContextProvider>
				<div
					id="modal-container"
					className="modal-container"
					style={{ containerType: "normal" }}>
					<SettingsManager />
					<ChangeLogManager />
				</div>
			</ModalContextProvider>
			<div>
				<WindowControlsManager />
			</div>
		</>
	);
};

export default Main;
