export const detectWindows = () => {
	if (Spicetify.Platform && Spicetify.Platform.operatingSystem === "Windows") {
		return true;
	}
	if (Spicetify.Platform?.PlatformData?.os_name) {
		return Spicetify.Platform.PlatformData.os_name.toLowerCase().includes("win");
	}
	return false;
};

export const getIsLightMode = () => Spicetify?.Config.color_scheme === "light" || false;

export const getIsGlobalNav = () =>
	!!(document.querySelector(".globalNav") || document.querySelector(".Root__globalNav"));
