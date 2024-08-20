import React, { useRef, useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

const PlaylistView = () => {
  const { playlistViewMode, playlistImageMode } = useSettingsStore();
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bodyClasses = document.body.classList;

    bodyClasses.add(`playlist-art-image-${playlistImageMode}`);
    bodyClasses.add(`playlist-view-${playlistViewMode}`);

    return () => {
      bodyClasses.remove(`playlist-view-${playlistViewMode}`);
      bodyClasses.remove(`playlist-art-image-${playlistImageMode}`);
    };
  }, [playlistViewMode, playlistImageMode]);

  useEffect(() => {
    const scrollNode = document.querySelector(
      '.Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]'
    );
    if (scrollNode && backgroundRef.current) {
      const handleScroll = () => {
        if (backgroundRef.current)
          backgroundRef.current.style.transform = `translateY(-${scrollNode.scrollTop}px)`;
      };

      scrollNode.addEventListener('scroll', handleScroll);
      return () => scrollNode.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <span
      id='playlistArtContainer'
      className={`playlist-art-container ${playlistViewMode} ${playlistImageMode}`}
      data-playlistviewmode={playlistViewMode}
    >
      <div className='background' ref={backgroundRef} />
      <div
        className='overlay'
        style={{ backgroundColor: 'var(--spice-main)' }}
      />
    </span>
  );
};

export default PlaylistView;
