import { useLucidStore } from "@/store/useLucidStore";
import React, { useCallback, useEffect } from "react";

/**
 * Observes changes in Spotify's "under-main-view" container
 * to extract and apply the background image as a CSS variable.
 */
const mountUnderMainViewWatcher = () => {
	const { underMainBackgroundImage, setUnderMainViewBackgroundImage } = useLucidStore();

	const handleMutations = useCallback(
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

			let imageUrl: string | null = null;
			if (targetImageNode?.style) {
				imageUrl = targetImageNode.style.backgroundImage.replace(/url\(['"]?([^'"]*)['"]?\)/i, "$1");
			} else if (underMainBackgroundImage !== null) {
				imageUrl = null;
			}

			setUnderMainViewBackgroundImage(imageUrl);
		},
		[setUnderMainViewBackgroundImage, underMainBackgroundImage],
	);

	useEffect(() => {
		const observer = new MutationObserver(handleMutations);
		const underMainView = document.querySelector(".under-main-view");

		if (underMainView) {
			observer.observe(underMainView, { childList: true });
		}

		return () => observer.disconnect();
	}, [handleMutations]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--under-main-view-art-image",
			underMainBackgroundImage ? `url(${underMainBackgroundImage})` : null,
		);
		return () => {
			document.documentElement.style.removeProperty("--under-main-view-art-image");
		};
	}, [underMainBackgroundImage]);
};

export default mountUnderMainViewWatcher;
