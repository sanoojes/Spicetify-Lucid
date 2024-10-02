import { useBodyClass } from "@/hooks/useBodyClass";
import { useSettingsStore } from "@/store/useSettingsStore";
import React from "react";

const GrainManager = () => {
	const { grainEffect } = useSettingsStore();

	useBodyClass(`grain-${grainEffect}`);

	return <div id="grainEffect" data-grainEffect={grainEffect} />;
};

export default GrainManager;
