import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { fetchArtworkURLFromAPI, getNowPlayingArtworkUrl, getSpotifyURI } from "@/utils/artworkUrl";
import { logDebug, logError, logInfo } from "@/utils/logUtils";
import React, { useCallback, useEffect } from "react";

const ArtworkManager = () => {
	logDebug("Render <ArtworkManager />");

	const { pageCategory, artworkData, updateArtworkData } = useLucidStore();
	const {
		interfaceSettings: { pagesSettings },
	} = useSettingsStore();

	const setPageArtwork = useCallback(async () => {
		const pathname = Spicetify.Platform.History.location.pathname;
		const currentPageURI = getSpotifyURI(pathname);

		// Check if URI has actually changed
		if (artworkData.currentPageURI === currentPageURI) {
			return;
		}

		document.documentElement.style.setProperty("--artwork-opacity", "0");
		try {
			if (currentPageURI) {
				const imageUrl = (await fetchArtworkURLFromAPI(currentPageURI)) || "";
				updateArtworkData({ currentPageArtURL: imageUrl, currentPageURI });
			} else {
				updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
			}
		} catch (error) {
			logError("Error updating artwork:", error);
			updateArtworkData({ currentPageArtURL: "", currentPageURI: "" });
		} finally {
			setTimeout(() => document.documentElement.style.setProperty("--artwork-opacity", "1"), 500);
		}
	}, [artworkData.currentPageURI, updateArtworkData]);

	useEffect(() => {
		if (artworkData.currentPageArtURL) {
			document.documentElement.style.setProperty("--playlist-art-image", `url(${artworkData.currentPageArtURL})`);
			logInfo(`Updated Playlist Artwork URL to ${artworkData.currentPageArtURL}`);
		} else if (artworkData.currentPageURI && pageCategory !== "other") {
			logError(`No artwork URL found for URI: ${artworkData.currentPageURI}`);
			document.documentElement.style.setProperty("--playlist-art-image", "none");
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

		setPageArtwork,
	]);

	useEffect(() => {
		if (artworkData.nowPlayingArtURL) {
			document.documentElement.style.setProperty("--now-playing-art-image", `url("${artworkData.nowPlayingArtURL}")`);
			logInfo(`Updated Now Playing Art View: ${artworkData.nowPlayingArtURL}`);
		}
	}, [artworkData.nowPlayingArtURL]);

	useEffect(() => {
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
