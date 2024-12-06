import { isGlobalNav } from "@/constants/constants";
import { useBodyClass } from "@/hooks/useBodyClass";
import { logDebug } from "@/utils/logUtils";
import React from "react";

const GlobalNavManager = () => {
	logDebug("Render <GlobalNavManager />");

	useBodyClass(isGlobalNav ? "global-nav" : "control-nav");

	return null;
};

export default GlobalNavManager;
