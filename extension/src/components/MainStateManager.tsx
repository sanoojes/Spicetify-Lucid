import ColorManager from "@/components/colors/ColorManager";
import { useFontManager } from "@/components/font/FontManager";
import GrainManager from "@/components/grain/GrainManager";
import GlobalNavManager from "@/components/nav/GlobalNavManager";
import mountUnderMainViewWatcher from "@/hooks/mountUnderMainViewWatcher";
import useArtworkManager from "@/hooks/useArtworkManager";
import usePlaybarManager from "@/hooks/usePlaybarManager";
import { logDebug } from "@/utils/logUtils";
import { usePathManagement } from "@/utils/pathUtils";
import React from "react";

/**
 * Manages state for the whole theme
 */
const MainStateManager = React.memo(() => {
	logDebug("Render <MainStateManager />");

	usePathManagement();

	useFontManager();
	usePlaybarManager();

	mountUnderMainViewWatcher();

	useArtworkManager();

	return (
		<>
			<ColorManager />
			<GrainManager />
			<GlobalNavManager />
		</>
	);
});

export default MainStateManager;
