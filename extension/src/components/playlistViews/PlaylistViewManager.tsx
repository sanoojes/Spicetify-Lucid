import React from 'react';
import { useSettingsStore } from '@/store/settingsStore';

const PlaylistView = React.memo(() => {
  const { playlistViewMode, playlistImageMode } = useSettingsStore();
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);
  const blurRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const bodyClasses = document.body.classList;

    bodyClasses.add(`playlist-art-image-${playlistImageMode}`);
    bodyClasses.add(`playlist-view-${playlistViewMode}`);

    return () => {
      bodyClasses.remove(`playlist-view-${playlistViewMode}`);
      bodyClasses.remove(`playlist-art-image-${playlistImageMode}`);
    };
  }, [playlistViewMode, playlistImageMode]);

  React.useEffect(() => {
    const scrollNode = document.querySelector(
      '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]'
    );

    if (scrollNode && backgroundRef.current) {
      const handleScroll = () => {
        if (backgroundRef.current && !(window.pageCategory === 'other')) {
          backgroundRef.current.style.transform = `translateY(-${Math.min(
            scrollNode.scrollTop,
            window.screen.height
          )}px)`;

          // Apply blur filter based on scroll position
          if (blurRef.current) {
            const scrollAmount = Math.min(
              scrollNode.scrollTop,
              window.screen.height
            );
            blurRef.current.style.filter = `blur(${scrollAmount * 0.03}px)`;
          }
        }
      };

      // Use passive event listeners for better scroll performance
      scrollNode.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollNode.removeEventListener('scroll', handleScroll);
    }
  }, [window.screen.height]);

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
