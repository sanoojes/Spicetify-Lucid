import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useLucidStore } from '@/store/useLucidStore';
import {
  PLAYLIST_ART_IMAGE_CLASS_PREFIX,
  PLAYLIST_VIEW_CLASS_PREFIX,
  SCROLL_NODE_SELECTORS,
} from '@/constants/constants';

const PlaylistViewManager = () => {
  const { playlistViewMode, playlistImageMode, isScrollMode } =
    useSettingsStore();
  const { pageCategory, underMainBackgroundImage } = useLucidStore();
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);
  const blurRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.body.classList.add(
      `${PLAYLIST_ART_IMAGE_CLASS_PREFIX}${playlistImageMode}`,
      `${PLAYLIST_VIEW_CLASS_PREFIX}${playlistViewMode}`
    );
    return () => {
      document.body.classList.remove(
        `${PLAYLIST_VIEW_CLASS_PREFIX}${playlistViewMode}`,
        `${PLAYLIST_ART_IMAGE_CLASS_PREFIX}${playlistImageMode}`
      );
    };
  }, [playlistViewMode, playlistImageMode]);

  const handleScroll = React.useCallback(
    (scrollNode: HTMLElement | Element) => {
      const { current: background } = backgroundRef;
      const { current: blur } = blurRef;

      if (background && blur) {
        const scrollAmount = Math.min(scrollNode.scrollTop, window.innerHeight);
        const blurAmount =
          scrollAmount * 0.03 +
          (pageCategory !== 'artist' && !underMainBackgroundImage ? 4 : 0);

        blur.style.setProperty('--blur', `${blurAmount}px`);

        background.style.transform = `translateY(${
          isScrollMode ? -scrollAmount : 0
        }px)`;

        background.style.setProperty('--scroll', `${scrollAmount / 1000}`);
      }
    },
    [isScrollMode, pageCategory, underMainBackgroundImage]
  );

  React.useEffect(() => {
    const scrollNode = document.querySelector(SCROLL_NODE_SELECTORS);

    if (scrollNode) {
      const scrollHandler = () => handleScroll(scrollNode);
      scrollHandler();

      scrollNode.addEventListener('scroll', scrollHandler, { passive: true });
      return () => scrollNode.removeEventListener('scroll', scrollHandler);
    }
  }, [handleScroll]);

  return (
    <span
      id='playlistArtContainer'
      className={`playlist-art-container ${playlistViewMode} ${playlistImageMode}`}
      data-playlist-view-mode={playlistViewMode}
      ref={backgroundRef}
    >
      <div className='background' ref={blurRef} />
      <div
        className='overlay'
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      />
    </span>
  );
};

export default PlaylistViewManager;
