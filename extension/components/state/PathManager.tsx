import { useBodyClass } from "@/hooks/useBodyClass";
import { useLucidStore } from "@/store/useLucidStore";
import { getPathCategory } from "@/utils/pathUtils";
import React, { useEffect } from "react";

const PathManager = () => {
	const { pageCategory, setPageCategory } = useLucidStore();

	useBodyClass(pageCategory);

	useEffect(() => {
		const setPath = () => {
			const pathname = Spicetify.Platform.History.location.pathname;
			setPageCategory(getPathCategory(pathname));
		};

		setPath();

		const unlistenHistory = Spicetify.Platform.History.listen(() => {
			setPath();
		});

		return () => {
			unlistenHistory();
		};
	}, [setPageCategory]);

	return null;
};

export default PathManager;
