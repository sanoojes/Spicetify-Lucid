import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";
import { logDebug } from "@/utils/logUtils";
import React from "react";

const GrainManager = () => {
	logDebug("Render <GrainManager />");

	const {
		interfaceSettings: {
			grainSettings: { grainEffect },
		},
	} = useSettingsStore();

	useBodyClass(`grain-${grainEffect}`);

	return <div id="grainEffect" data-grainEffect={grainEffect} />;
};

export default GrainManager;
