type PageCategoryType =
  | 'artist'
  | 'playlist'
  | 'album'
  | 'profile'
  | 'show'
  | 'genre'
  | 'concert'
  | 'other'
  | 'search';

const getPathCategory = (pathname: string): PageCategoryType => {
  if (Spicetify.URI.isPlaylistV1OrV2(pathname)) return 'playlist';
  if (Spicetify.URI.isArtist(pathname)) return 'artist';
  if (Spicetify.URI.isAlbum(pathname)) return 'album';
  if (Spicetify.URI.isGenre(pathname)) return 'genre';
  if (Spicetify.URI.isShow(pathname)) return 'show';
  if (Spicetify.URI.isSearch(pathname)) return 'search';
  if (Spicetify.URI.isProfile(pathname)) return 'profile';
  if (Spicetify.URI.isConcert(pathname) || Spicetify.URI.isArtistConcerts(pathname)) {
    return 'concert';
  }
  return 'other';
};

function setPage(pathname: string) {
  document.body.dataset.path = pathname;
  document.body.dataset.pageType = getPathCategory(pathname);
}
export function mountPageType() {
  setPage(Spicetify?.Platform?.History?.location?.pathname || '/');
  Spicetify?.Platform?.History?.listen((state?: { pathname?: string }) => {
    if (!state || !state.pathname) return;
    setPage(state.pathname);
  });
}
