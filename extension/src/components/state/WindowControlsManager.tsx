import TransparentWindowControl from "@/components/windowControls/TransparentWindowControl";
import { isCustomControls, isWindowsPlatform } from "@/constants/constants";
import React from "react";

const WindowControlsManager = React.memo(() => {
	return (
		<>
			{isWindowsPlatform ? (
				<div
					id="transperent-controls-container"
					className="transperent-controls-container"
					style={{ containerType: "normal" }}>
					{!isCustomControls && isWindowsPlatform ? <TransparentWindowControl /> : null}
				</div>
			) : null}
		</>
	);
});

export default WindowControlsManager;
