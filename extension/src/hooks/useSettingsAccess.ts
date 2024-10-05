import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect } from "react";
import useGlobalNavSettingsMenu from "./useGlobalNavSettingsMenu";
import useSettingsProfileMenu from "./useSettingsProfileMenu";

const useSettingsAccess = (openModal: () => void) => {
	const { settingAccessPosition } = useSettingsStore();

	useEffect(() => {
		let element: Spicetify.Menu.Item | HTMLButtonElement | null = null;

		if (settingAccessPosition === "nav") {
			element = useGlobalNavSettingsMenu({ onClick: openModal });
		} else if (settingAccessPosition === "context-menu") {
			element = useSettingsProfileMenu({ onClick: openModal });
			element.register();
		}

		return () => {
			if (element) {
				if (settingAccessPosition === "nav" && (element as HTMLButtonElement).remove) {
					(element as HTMLButtonElement).remove();
				} else if (settingAccessPosition === "context-menu" && "deregister" in element) {
					element.deregister();
				}
			}
		};
	}, [settingAccessPosition, openModal]);
};

export default useSettingsAccess;
