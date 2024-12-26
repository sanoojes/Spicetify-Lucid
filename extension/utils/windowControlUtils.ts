import { logError, logInfo } from "@/utils/logUtils";

export async function setWindowControlsHeight(height: number) {
	try {
		Spicetify?.Platform?.ControlMessageAPI?._updateUiClient?.updateTitlebarHeight({ height });
		Spicetify?.Platform?.UpdateAPI?._updateUiClient?.updateTitlebarHeight({ height });

		Spicetify.CosmosAsync.post("sp://messages/v1/container/control", {
			type: "update_titlebar",
			height: `${height}px`,
		});

		logInfo(`Control height set to ${height}px`);
	} catch (error) {
		logError(`Error setting control height: ${height}`, error);
	}
}

export function getIsCustomControls(): boolean {
	if (document.getElementById("customControls")) {
		document.querySelector(".lucid-transperent-window-controls")?.remove();
		return true;
	}
	return false;
}
