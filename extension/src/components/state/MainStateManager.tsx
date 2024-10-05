import ArtworkManager from "@/components/state/ArtworkManager";
import BorderManager from "@/components/state/BorderManager";
import ColorManager from "@/components/state/ColorManager";
import FontStateManager from "@/components/state/FontStateManager";
import GlobalNavManager from "@/components/state/GlobalNavManager";
import GrainManager from "@/components/state/GrainManager";
import PathManager from "@/components/state/PathManager";
import PlaybarManager from "@/components/state/PlaybarManager";
import UnderMainViewManager from "@/components/state/UnderMainViewManager";
import WindowControlsManager from "@/components/state/WindowControlsManager";
import { logDebug } from "@/utils/logUtils";
import React from "react";

/**
 * Manages state for the whole theme
 */
const MainStateManager = React.memo(() => {
	logDebug("Render <MainStateManager />");

	return (
		<>
			<PathManager />
			<GrainManager />
			<ColorManager />
			<PlaybarManager />
			<ArtworkManager />
			<BorderManager />
			<GlobalNavManager />
			<FontStateManager />
			<UnderMainViewManager />
			<WindowControlsManager />
		</>
	);
});

export default MainStateManager;
