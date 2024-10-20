import { logError, logWarn } from "@/utils/logUtils";

export const getNowPlayingArtworkUrl = async () => {
	const waitForPlayerData = async () => {
		while (!Spicetify?.Player?.data) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	};

	await waitForPlayerData();

	const { item } = Spicetify.Player.data;

	if (!item || !item.metadata) {
		logError("No item or metadata found in Spicetify Player data.");
		return "";
	}

	const artworkUrls = [
		item.metadata.image_xlarge_url,
		item.metadata.image_large_url,
		item.metadata.image_url,
		item.metadata.image_small_url,
	];

	const imageUrl = artworkUrls.find((url) => url) || getFallbackImageUrl();

	return imageUrl || "";
};

const getFallbackImageUrl = () => {
	const fallbackImage = document.querySelector(
		".Root__right-sidebar .main-nowPlayingView-nowPlayingWidget .main-image-image",
	) as HTMLImageElement;

	return fallbackImage?.src || "";
};

export const getArtistMetaData = async (uri: string) => {
	const MAX_RETRIES = 3;
	let retries = 0;

	while (retries <= MAX_RETRIES) {
		try {
			const metadata = await Spicetify.GraphQL.Request(
				{
					name: "queryArtistOverview",
					operation: "query",
					sha256Hash: "35648a112beb1794e39ab931365f6ae4a8d45e65396d641eeda94e4003d41497",
					value: null,
				},
				{
					uri: uri,
					includePrerelease: true,
					locale: null,
				},
			);

			if (metadata) return metadata;
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes("DUPLICATE_REQUEST_ERROR") && retries < MAX_RETRIES) {
					retries++;
					logWarn(`Duplicate request detected (getArtistMetaData). Retrying in 1 second... (Attempt ${retries})`);
					await new Promise((resolve) => setTimeout(resolve, 1000));
					continue;
				}
			}
			logError("Error fetching artist metadata:", error);
			throw error;
		}
	}
};

export const getAlbumMetaData = async (uri: string) => {
	const MAX_RETRIES = 3;
	let retries = 0;

	while (retries <= MAX_RETRIES) {
		try {
			const metadata = await Spicetify.GraphQL.Request(
				{
					name: "getAlbum",
					operation: "query",
					sha256Hash: "469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d",
					value: null,
				},
				{
					uri: uri,
					locale: null,
					offset: 0,
					limit: 50,
				},
			);

			if (metadata) return metadata;
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.includes("DUPLICATE_REQUEST_ERROR") && retries < MAX_RETRIES) {
					retries++;
					logWarn(`Duplicate request detected (getAlbumMetaData). Retrying in 1 second... (Attempt ${retries})`);
					await new Promise((resolve) => setTimeout(resolve, 1000));
					continue;
				}
			}
			logError("Error fetching album metadata:", error);
			throw error;
		}
	}
};

export const getSpotifyURI = (pathname: string): string | null => {
	const isPlaylist = Spicetify.URI.isPlaylistV1OrV2(pathname);
	const isArtist = Spicetify.URI.isArtist(pathname);
	const isAlbum = Spicetify.URI.isAlbum(pathname);
	const isShow = Spicetify.URI.isShow(pathname);
	const isProfile = Spicetify.URI.isProfile(pathname);

	if (isPlaylist || isArtist || isAlbum || isProfile || isShow) {
		const id = pathname.match(/\/(?:playlist|artist|album|user|show)\/([^/]+)/)?.[1];
		if (!id) {
			logWarn("No ID found in pathname:", pathname);
			return null;
		}

		return `spotify:${
			isPlaylist ? "playlist" : isArtist ? "artist" : isAlbum ? "album" : isShow ? "show" : "user"
		}:${id}`;
	}

	return null;
};

export const fetchArtworkURLFromAPI = async (uri: string): Promise<string | null> => {
	const uriType = uri.split(":")[1];

	try {
		switch (uriType) {
			case "playlist":
			case "show": {
				const playlistMetadata = await Spicetify.Platform.PlaylistAPI.getMetadata(uri);
				return playlistMetadata.images.find((image: { url: string }) => image.url)?.url || null;
			}

			case "artist": {
				const artistMetadata = await getArtistMetaData(uri);

				return (
					artistMetadata.data?.artistUnion.visuals.headerImage?.sources?.[0]?.url ||
					artistMetadata.data?.artistUnion.visuals.avatarImage?.sources?.[0]?.url ||
					null
				);
			}

			case "album": {
				const albumMetadata = await getAlbumMetaData(uri);

				return (
					albumMetadata.data?.albumUnion.coverArt.sources?.[2]?.url ||
					albumMetadata.data?.albumUnion.coverArt.sources?.[0]?.url ||
					null
				);
			}

			case "user": {
				const req = await Spicetify.Platform.RequestBuilder.build()
					.withHost("https://spclient.wg.spotify.com/user-profile-view/v3")
					.withPath(`/profile/${uri.split(":")[2]}`)
					.send();
				return req?.body?.image_url || null;
			}

			default:
				return null;
		}
	} catch (error) {
		logError(`Error fetching artwork for ${uriType}:`, error);
		return null;
	}
};
