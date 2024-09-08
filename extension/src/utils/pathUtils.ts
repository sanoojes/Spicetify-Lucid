import React from 'react';
import { useLucidStore } from '@/store/useLucidStore';

export const getPathCategory = (pathname: string) => {
  if (Spicetify.URI.isPlaylistV1OrV2(pathname)) return 'playlist';
  if (Spicetify.URI.isArtist(pathname)) return 'artist';
  if (Spicetify.URI.isAlbum(pathname)) return 'album';
  if (Spicetify.URI.isShow(pathname)) return 'show';
  if (Spicetify.URI.isProfile(pathname)) return 'profile';
  return 'other';
};

export const usePathManagement = () => {
  const { setPageCategory } = useLucidStore();

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
