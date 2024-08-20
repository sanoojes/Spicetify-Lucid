export const updateArtworkUrl = async () => {
  while (!Spicetify?.Player?.data) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    window.currentArtUrl =
      Spicetify.Player.data.item.metadata.image_xlarge_url ||
      Spicetify.Player.data.item.metadata.image_large_url ||
      Spicetify.Player.data.item.metadata.image_url ||
      Spicetify.Player.data.item.metadata.image_small_url ||
      '';

    window.rootStyle.setProperty(
      '--now-playing-art-image',
      `url(${window.currentArtUrl})`
    );
  } catch (error) {
    console.error('Error updating artwork URL:', error);
  }
};

export const updatePlaylistArtworkUrl = async () => {
  try {
    const pathname = Spicetify.Platform.History.location.pathname;

    if (
      Spicetify.URI.isPlaylistV1OrV2(pathname) ||
      Spicetify.URI.isArtist(pathname)
    ) {
      const id = pathname.match(/\/(?:playlist|artist)\/([^/]+)/)[1];
      const uri = `spotify:${
        Spicetify.URI.isPlaylistV1OrV2(pathname) ? 'playlist' : 'artist'
      }:${id}`;

      if (
        !window.playlistArtUrl ||
        window.playlistArtUrl.uri !== uri ||
        !window.playlistArtUrl.url
      ) {
        let imageUrl: string;

        if (Spicetify.URI.isPlaylistV1OrV2(pathname)) {
          const playlistMetadata =
            await Spicetify.Platform.PlaylistAPI.getMetadata(uri);

          imageUrl = playlistMetadata.images.find(
            (image: { url: string }) => image.url
          )?.url;
        } else {
          const artistMetadata = await Spicetify.GraphQL.Request(
            {
              name: 'queryArtistOverview',
              operation: 'query',
              sha256Hash:
                '35648a112beb1794e39ab931365f6ae4a8d45e65396d641eeda94e4003d41497',
              value: null,
            },
            {
              uri: uri,
              includePrerelease: true,
              locale: null,
            }
          );
          imageUrl =
            artistMetadata.data.artistUnion.visuals.headerImage?.sources?.[0]
              ?.url;
        }

        window.playlistArtUrl = { url: imageUrl, uri: uri };
      }

      if (window.playlistArtUrl.url) {
        window.rootStyle.setProperty(
          '--playlist-art-image',
          `url(${window.playlistArtUrl.url})`
        );
      } else {
        console.warn(`No playlist/artist artwork URL found for URI: ${uri}`);
      }
    }
  } catch (error) {
    console.error('Error fetching playlist/artist artwork:', error);
  }
};
