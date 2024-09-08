import React from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useLucidStore } from '@/store/useLucidStore';

const PlaylistView = React.memo(() => {
  const { playlistViewMode, playlistImageMode, isScrollMode } =
    useSettingsStore();
  const { pageCategory, underMainBackgroundImage } = useLucidStore();
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);
  const blurRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const bodyClasses = document.body.classList;

    bodyClasses.add(
      `playlist-art-image-${playlistImageMode}`,
      `playlist-view-${playlistViewMode}`
    );

    return () => {
      bodyClasses.remove(
        `playlist-view-${playlistViewMode}`,
        `playlist-art-image-${playlistImageMode}`
      );
    };
  }, [playlistViewMode, playlistImageMode]);

  const handleScroll = React.useCallback(
    (scrollNode: Element) => {
      if (backgroundRef.current && blurRef.current) {
        const scrollAmount = Math.min(scrollNode.scrollTop, window.innerHeight);

        const blurAmount =
          scrollAmount * 0.03 +
          ((pageCategory === 'playlist' || pageCategory === 'show') &&
          !underMainBackgroundImage
            ? 4
            : 0);

        const brightnessAdjustment = isScrollMode
          ? ''
          : `brightness(${1 - (scrollAmount / window.innerHeight) * 0.5})`;

        blurRef.current.style.filter = `blur(${blurAmount}px) ${brightnessAdjustment}`;
        blurRef.current.style.transform = `scale(${
          1 + (scrollAmount / window.innerHeight) * 0.5
        })`;

        backgroundRef.current.style.transform = `translateY(${
          isScrollMode ? -scrollAmount : 0
        }px)`;
      }
    },
    [isScrollMode, pageCategory, underMainBackgroundImage]
  );

  React.useEffect(() => {
    const scrollNode = document.querySelector(
      '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]'
    );

    if (scrollNode) {
      const scrollHandler = () => handleScroll(scrollNode);
      scrollHandler();

      scrollNode.addEventListener('scroll', scrollHandler, { passive: true });

      return () => {
        scrollNode.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [handleScroll]);

  return (
    <span
      id='playlistArtContainer'
      className={`playlist-art-container ${playlistViewMode} ${playlistImageMode}`}
      data-playlistviewmode={playlistViewMode}
      ref={backgroundRef}
    >
      <div className='background' ref={blurRef} />
      <div
        className='overlay'
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'transparent',
        }}
      />
    </span>
  );
});

export default PlaylistView;
