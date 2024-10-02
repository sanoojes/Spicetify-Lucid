import { isGlobalNav } from "@/constants/constants";
import { useBodyClass } from "@/hooks/useBodyClass";
import React from "react";

const GlobalNavManager = () => {
	useBodyClass(isGlobalNav ? "global-nav" : "control-nav");

	return <></>;
};

export default GlobalNavManager;
