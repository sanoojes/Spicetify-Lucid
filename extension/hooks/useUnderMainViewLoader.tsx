import PlaylistViewManager from "@/components/state/PlaylistViewManager";
import React, { useEffect, useRef } from "react";

export const useUnderMainViewLoader = () => {
	const underMainViewRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const setUnderMainView = () => {
			if (document.getElementById("lucid-under-main-view")) {
				return;
			}

			const newUnderMainView = document.createElement("div");
			newUnderMainView.id = "lucid-under-main-view";
			newUnderMainView.className = "lucid-under-main-view";

			const mainViewContainer = document.querySelector(".main-view-container");
			if (mainViewContainer) {
				mainViewContainer.prepend(newUnderMainView);
			}

			underMainViewRef.current = newUnderMainView;

			if (underMainViewRef.current) {
				Spicetify.ReactDOM.createRoot(underMainViewRef.current).render(<PlaylistViewManager />);
			}
		};

		setUnderMainView();
		const unlistenHistory = Spicetify.Platform.History.listen(() => {
			setUnderMainView();
		});

		return () => {
			unlistenHistory();
		};
	}, []);
};
