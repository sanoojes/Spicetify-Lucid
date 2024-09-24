import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';
import { useBodyClass } from '@/hooks/useBodyClass';

export const getPathCategory = (pathname: string): PageCategoryType => {
  if (Spicetify.URI.isPlaylistV1OrV2(pathname)) return 'playlist';
  if (Spicetify.URI.isArtist(pathname)) return 'artist';
  if (Spicetify.URI.isAlbum(pathname)) return 'album';
  if (Spicetify.URI.isGenre(pathname)) return 'genre';
  if (Spicetify.URI.isShow(pathname)) return 'show';
  if (Spicetify.URI.isProfile(pathname)) return 'profile';
  if (
    Spicetify.URI.isConcert(pathname) ||
    Spicetify.URI.isArtistConcerts(pathname)
  )
    return 'concert';
  return 'other';
};

/**
 * Sets Path as per the user navigates.
 */
export const usePathManagement = () => {
  const { pageCategory, setPageCategory } = useLucidStore();

  useBodyClass(pageCategory);

  React.useEffect(() => {
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
};
