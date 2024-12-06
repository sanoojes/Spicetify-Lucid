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
import ZoomManager from "@/components/state/ZoomManager";
import NpvManager from "@/components/state/NpvManager";

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
