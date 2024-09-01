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
    console.log('[Lucid] Updated artwork URL:', window.currentArtUrl);
  } catch (error) {
    console.error('[Lucid] Error updating artwork URL:', error);
  }
};

export const updatePlaylistArtworkUrl = async () => {
  try {
    const pathname = Spicetify.Platform.History.location.pathname;
    const isPlaylist = Spicetify.URI.isPlaylistV1OrV2(pathname);
    const isArtist = Spicetify.URI.isArtist(pathname);
    const isAlbum = Spicetify.URI.isAlbum(pathname);
    const isShow = Spicetify.URI.isShow(pathname);
    const isProfile = Spicetify.URI.isProfile(pathname);

    if (isPlaylist || isArtist || isAlbum || isProfile || isShow) {
      const id = pathname.match(
        /\/(?:playlist|artist|album|user|show)\/([^/]+)/
      )[1];
      const uri = `spotify:${
        isPlaylist
          ? 'playlist'
          : isArtist
          ? 'artist'
          : isAlbum
          ? 'album'
          : isShow
          ? 'show'
          : 'user'
      }:${id}`;

      if (
        !window.playlistArtUrl ||
        window.playlistArtUrl.uri !== uri ||
        !window.playlistArtUrl.url
      ) {
        let imageUrl = '';

        if (isPlaylist || isShow) {
          const playlistMetadata =
            await Spicetify.Platform.PlaylistAPI.getMetadata(uri);

          imageUrl = playlistMetadata.images.find(
            (image: { url: string }) => image.url
          )?.url;
        } else if (isArtist) {
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

          if (!artistMetadata.data) return;

          imageUrl =
            artistMetadata.data.artistUnion.visuals.headerImage?.sources?.[0]
              ?.url ||
            artistMetadata.data.artistUnion.visuals.avatarImage?.sources?.[0]
              ?.url;
        } else if (isAlbum) {
          const albumMetadata = await Spicetify.GraphQL.Request(
            {
              name: 'getAlbum',
              operation: 'query',
              sha256Hash:
                '469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d',
              value: null,
            },
            {
              uri: uri,
              locale: null,
              offset: 0,
              limit: 50,
            }
          );

          if (!albumMetadata.data) return;

          imageUrl =
            albumMetadata.data.albumUnion.coverArt.sources?.[2]?.url ||
            albumMetadata.data.albumUnion.coverArt.sources?.[0]?.url;
        } else if (isProfile) {
          const req = await Spicetify.Platform.RequestBuilder.build()
            .withHost('https://spclient.wg.spotify.com/user-profile-view/v3')
            .withPath(`/profile/${id}`)
            .send();

          if (req?.body) imageUrl = req.body.image_url;
        } else {
          imageUrl = '';
        }

        window.playlistArtUrl = { url: imageUrl, uri: uri };
      }

      if (window.playlistArtUrl.url) {
        window.rootStyle.setProperty(
          '--playlist-art-image',
          `url(${window.playlistArtUrl.url})`
        );
      } else {
        console.warn(
          `[Lucid] No playlist/artist artwork URL found for URI: ${uri}`
        );
      }
    }
  } catch (error) {
    console.error('[Lucid] Error fetching playlist/artist artwork:', error);
  }
};
