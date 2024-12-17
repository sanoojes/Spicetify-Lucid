import ArtworkManager from "@/components/state/ArtworkManager";
import BorderManager from "@/components/state/BorderManager";
import ColorManager from "@/components/state/ColorManager";
import FontStateManager from "@/components/state/FontStateManager";
import GlobalNavManager from "@/components/state/GlobalNavManager";
import GrainManager from "@/components/state/GrainManager";
import NpvManager from "@/components/state/NpvManager";
import PathManager from "@/components/state/PathManager";
import PlaybarManager from "@/components/state/PlaybarManager";
import UnderMainViewManager from "@/components/state/UnderMainViewManager";
import WindowControlsManager from "@/components/state/WindowControlsManager";
import ZoomManager from "@/components/state/ZoomManager";
import { logDebug } from "@/utils/logUtils";
import React from "react";

/**
 * Manages state for the whole theme
 */
const MainStateManager = () => {
	logDebug("Render <MainStateManager />");

	return (
		<>
			<PathManager />
			<GrainManager />
			<ColorManager />
			<ZoomManager />
			<PlaybarManager />
			<ArtworkManager />
			<BorderManager />
			<GlobalNavManager />
			<FontStateManager />
			<NpvManager />
			<UnderMainViewManager />
			<WindowControlsManager />
		</>
	);
};

export default MainStateManager;
