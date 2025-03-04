const getNPVElementImage = () => {
  const npv = document.querySelector(
    '.Root__right-sidebar .main-nowPlayingView-nowPlayingWidget .main-image-image'
  ) as HTMLImageElement;

  return npv?.src || '';
};

export const getNowPlayingArtworkURL = async () => {
  while (!Spicetify.Player?.data) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const item = Spicetify.Player.data?.item;

  if (!item || !item.metadata) {
    console.error('No item or metadata found in Spicetify Player data.');
    return '';
  }

  const artworkUrls = [
    item.metadata.image_xlarge_url,
    item.metadata.image_large_url,
    item.metadata.image_url,
    item.metadata.image_small_url,
  ];

  const imageUrl = artworkUrls.find((url) => url) || getNPVElementImage();

  return imageUrl || getNPVElementImage();
};

const makeRequest = async <T>(
  query: { name: string; sha256Hash: string },
  variables: object,
  retries = 3
): Promise<T | null> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await Spicetify.GraphQL.Request(
        { ...query, operation: 'query', value: null },
        variables
      );
      return response;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('DUPLICATE_REQUEST_ERROR') &&
        attempt < retries
      ) {
        console.warn(`Retrying ${query.name}... (${attempt + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      console.error(`Error in ${query.name}:`, error);
      throw error;
    }
  }
  return null;
};

type ImageData = {
  sources: {
    url: string;
    width?: number;
    height?: number;
  }[];
};
type ArtistMetadata = {
  data?: {
    artistUnion?: {
      visuals?: { avatarImage?: ImageData; headerImage?: ImageData };
    };
  };
};

type AlbumMetadata = {
  data?: {
    albumUnion?: {
      coverArt?: ImageData;
    };
  };
};

export const getAlbumMetaData = (uri: string) =>
  makeRequest<AlbumMetadata>(
    {
      name: 'getAlbum',
      sha256Hash: '469874edcad37b7a379d4f22f0083a49ea3d6ae097916120d9bbe3e36ca79e9d',
    },
    { uri, locale: null, offset: 0, limit: 50 }
  );

export const getArtistMetaData = (uri: string) =>
  makeRequest<ArtistMetadata>(
    {
      name: 'queryArtistOverview',
      sha256Hash: '35648a112beb1794e39ab931365f6ae4a8d45e65396d641eeda94e4003d41497',
    },
    { uri, includePrerelease: true, locale: null }
  );

export const getSpotifyURL = (pathname: string): string | null => {
  const id = pathname.match(/\/(playlist|artist|album|user|show)\/([^/]+)/);

  if (!id) {
    console.warn('No valid type or ID found in pathname:', pathname);
    return null;
  }

  const [, type, extractedId] = id;
  return `spotify:${type}:${extractedId}`;
};

export const getArtworkBySpotifyURL = async (url: string): Promise<string | null> => {
  const uri = getSpotifyURL(url);
  if (!uri) return null;
  const [, type, id] = uri.split(':');

  try {
    switch (type) {
      case 'playlist':
      case 'show': {
        const meta = await Spicetify.Platform.PlaylistAPI.getMetadata(uri);
        return meta.images[0]?.url || null;
      }
      case 'artist': {
        const meta = await getArtistMetaData(uri);
        const visuals = meta?.data?.artistUnion?.visuals;
        return (
          visuals?.headerImage?.sources[0]?.url || visuals?.avatarImage?.sources[0]?.url || null
        );
      }
      case 'album': {
        const meta = await getAlbumMetaData(uri);
        const sources = meta?.data?.albumUnion?.coverArt?.sources;
        return sources?.[2]?.url || sources?.[0]?.url || null;
      }
      case 'user': {
        const response = await Spicetify.Platform.RequestBuilder.build()
          .withHost('https://spclient.wg.spotify.com/user-profile-view/v3')
          .withPath(`/profile/${id}`)
          .send();
        return response?.body?.image_url || null;
      }
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${type} artwork:`, error);
    return null;
  }
};
