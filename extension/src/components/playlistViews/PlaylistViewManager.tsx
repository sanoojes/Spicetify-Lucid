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

  React.useEffect(() => {
    const scrollNode = document.querySelector(
      '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]'
    );

    if (scrollNode && backgroundRef.current) {
      const handleScroll = () => {
        if (
          backgroundRef.current &&
          !(pageCategory === 'other') &&
          blurRef.current
        ) {
          const scrollAmount = Math.min(
            scrollNode.scrollTop,
            window.screen.height
          );

          blurRef.current.style.filter = `blur(${
            scrollAmount * 0.03 +
            (pageCategory === 'playlist' && !underMainBackgroundImage ? 4 : 0)
          }px) ${
            !isScrollMode
              ? `brightness(${
                  1 - (scrollAmount / window.screen.height) * 0.5
                }) `
              : ''
          }`;
          blurRef.current.style.transform = `scale(${
            1 + (scrollAmount / window.screen.height) * 0.5
          })`;

          backgroundRef.current.style.transform = `translateY(${
            isScrollMode ? -scrollAmount : 0
          }px)`;
        }
      };

      handleScroll();

      scrollNode.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        scrollNode.removeEventListener('scroll', handleScroll);
      };
    }
  }, [
    window.screen.height,
    isScrollMode,
    pageCategory,
    underMainBackgroundImage,
  ]);

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
