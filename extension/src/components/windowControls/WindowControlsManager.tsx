import TransparentWindowControl from "@/components/windowControls/TransparentWindowControl";
import { isWindowsPlatform } from "@/constants/constants";
import React from "react";

const WindowControlsManager = React.memo(() => {
	return (
		<>
			{isWindowsPlatform ? (
				<div
					id="transperent-controls-container"
					className="transperent-controls-container"
					style={{ containerType: "normal" }}>
					<TransparentWindowControl />
				</div>
			) : null}
		</>
	);
});

export default WindowControlsManager;
