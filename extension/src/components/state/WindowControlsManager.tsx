import TransparentWindowControl from "@/components/windowControls/TransparentWindowControl";
import { isCustomControls, isWindowsPlatform } from "@/constants/constants";
import React, { memo } from "react";

const WindowControlsManager = memo(() => {
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
