import { useLucidStore } from "@/store/useLucidStore";
import React from "react";

/**
 * Observes changes in Spotify's "under-main-view" container
 * to extract and apply the background image as a CSS variable.
 */
const mountUnderMainViewWatcher = () => {
	const { underMainBackgroundImage, setUnderMainViewBackgroundImage, rootStyle } = useLucidStore();

	const handleMutations = React.useCallback(
		(mutationsList: MutationRecord[]) => {
			const targetImageNode = mutationsList.reduce<HTMLDivElement | null>((foundNode, mutation) => {
				if (foundNode) return foundNode; // Early return if already found

				if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
					const firstAddedNode = mutation.addedNodes[0];
					if (firstAddedNode.firstChild instanceof HTMLDivElement) {
						return firstAddedNode.firstChild as HTMLDivElement;
					}
				}
				return null;
			}, null);

			if (targetImageNode?.style) {
				const imageUrl = targetImageNode.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/i, "$1");
				setUnderMainViewBackgroundImage(imageUrl);
			} else if (underMainBackgroundImage !== null) {
				setUnderMainViewBackgroundImage(null);
			}
		},
		[setUnderMainViewBackgroundImage, underMainBackgroundImage],
	);

	React.useEffect(() => {
		const observer = new MutationObserver(handleMutations);
		const underMainView = document.querySelector(".under-main-view");

		if (underMainView) {
			observer.observe(underMainView, { childList: true });
		}

		return () => observer.disconnect();
	}, [handleMutations]);

	React.useEffect(() => {
		rootStyle.setProperty(
			"--under-main-view-art-image",
			underMainBackgroundImage ? `url(${underMainBackgroundImage})` : null,
		);
		return () => {
			rootStyle.removeProperty("--under-main-view-art-image");
		};
	}, [underMainBackgroundImage, rootStyle]);
};

export default mountUnderMainViewWatcher;
