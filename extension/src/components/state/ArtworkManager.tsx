import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { fetchArtworkURLFromAPI, getNowPlayingArtworkUrl, getSpotifyURI } from "@/utils/artworkUrl";
import { logDebug, logError, logInfo } from "@/utils/logUtils";
import React from "react";

const ArtworkManager = () => {
	logDebug("Render <ArtworkManager />");

	const { pageCategory, rootStyle, artworkData, updateArtworkData } = useLucidStore();
	const {
		interfaceSettings: { pagesSettings },
	} = useSettingsStore();

	const setPageArtwork = React.useCallback(async () => {
		const pathname = Spicetify.Platform.History.location.pathname;
		const currentPageURI = getSpotifyURI(pathname);

		// Check if URI has actually changed
		if (artworkData.currentPageURI === currentPageURI) {
			return;
		}

		rootStyle.setProperty("--artwork-opacity", "0");
		try {
			if (currentPageURI) {
				const imageUrl = (await fetchArtworkURLFromAPI(currentPageURI)) || "";
				updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
			} else {
				updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
			}
		} catch (error) {
			console.error("Error updating artwork:", error);
			updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
		} finally {
			setTimeout(() => rootStyle.setProperty("--artwork-opacity", "1"), 500);
		}
	}, [artworkData.currentPageURI, rootStyle, updateArtworkData]);

	React.useEffect(() => {
		if (artworkData.currentPageArtURL) {
			rootStyle.setProperty("--playlist-art-image", `url(${artworkData.currentPageArtURL})`);
			logInfo(`Updated Playlist Artwork URL to ${artworkData.currentPageArtURL}`);
		} else if (artworkData.currentPageURI && pageCategory !== "other") {
			logError(`No artwork URL found for URI: ${artworkData.currentPageURI}`);
			rootStyle.setProperty("--playlist-art-image", "none");
		}

		if (pagesSettings.backgroundImageMode === "inherit") {
			const unlistenHistory = Spicetify.Platform.History.listen(setPageArtwork);
			setPageArtwork();

			return () => {
				unlistenHistory();
			};
		}
	}, [
		pagesSettings.backgroundImageMode,
		artworkData.currentPageArtURL,
		artworkData.currentPageURI,
		pageCategory,
		rootStyle,
		setPageArtwork,
	]);

	React.useEffect(() => {
		if (artworkData.nowPlayingArtURL) {
			rootStyle.setProperty("--now-playing-art-image", `url("${artworkData.nowPlayingArtURL}")`);
			logInfo(`Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`);
		}
	}, [artworkData.nowPlayingArtURL, rootStyle]);

	React.useEffect(() => {
		const handleSongChange = async () => {
			const nowPlayingArtURL = await getNowPlayingArtworkUrl();
			updateArtworkData({ nowPlayingArtURL });
		};

		handleSongChange(); // Initial call
		Spicetify.Player.addEventListener("songchange", handleSongChange);

		return () => {
			Spicetify.Player.removeEventListener("songchange", handleSongChange);
		};
	}, [updateArtworkData]);

	return null;
};

export default ArtworkManager;
