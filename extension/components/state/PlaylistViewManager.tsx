import {
  PLAYLIST_ART_IMAGE_CLASS_PREFIX,
  PLAYLIST_VIEW_CLASS_PREFIX,
  SCROLL_NODE_SELECTORS,
} from "@/constants/constants";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { logDebug } from "@/utils/logUtils";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

const PlaylistViewManager = () => {
  const {
    interfaceSettings: {
      pagesSettings: { playlistViewMode, isScrollMode, backgroundImageMode },
    },
  } = useSettingsStore();

  const { pageCategory, underMainBackgroundImage, artworkData } =
    useLucidStore();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const blurRef = useRef<HTMLDivElement | null>(null);

  useBodyClass(`${PLAYLIST_VIEW_CLASS_PREFIX}${playlistViewMode}`);
  useBodyClass(`${PLAYLIST_ART_IMAGE_CLASS_PREFIX}${backgroundImageMode}`);
  useBodyClass(`${underMainBackgroundImage ? "under-main-view-present" : ""}`);

  const handleScroll = useCallback(
    (scrollNode: HTMLElement | Element) => {
      const { current: background } = backgroundRef;
      if (background) {
        const scrollAmount = Math.min(scrollNode.scrollTop, window.innerHeight);

        background.style.transform = `translate3d(0, ${
          isScrollMode ? -scrollAmount : 0
        }px, 0)`;
        background.style.setProperty("--scroll", `${scrollAmount / 1000}`);
      }
    },
    [isScrollMode]
  );

  const blurAmount = useMemo(() => {
    return pageCategory !== "artist" && !underMainBackgroundImage ? 4 : 0;
  }, [pageCategory, underMainBackgroundImage]);

  useEffect(() => {
    const { current: blur } = blurRef;
    if (blur) {
      blur.style.setProperty("--blur", `${blurAmount}px`);
    }
  }, [blurAmount]);

  useEffect(() => {
    const scrollNode = document.querySelector(SCROLL_NODE_SELECTORS);

    if (scrollNode) {
      const scrollHandler = () => handleScroll(scrollNode);
      scrollHandler();

      scrollNode.addEventListener("scroll", scrollHandler, { passive: true });
      return () => {
        scrollNode.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [handleScroll]);

  logDebug("New underMainBackgroundImage:", underMainBackgroundImage);

  const backgroundImageUrl =
    pageCategory !== "other" && backgroundImageMode !== "none"
      ? underMainBackgroundImage ||
        (backgroundImageMode === "inherit"
          ? artworkData.currentPageArtURL || ""
          : artworkData.nowPlayingArtURL || "")
      : "none";

  const containerClasses = `playlist-art-container ${playlistViewMode} ${backgroundImageMode}`;

  return (
    <span
      id='playlistArtContainer'
      className={containerClasses}
      data-playlist-view-mode={playlistViewMode}
      ref={backgroundRef}
    >
      <div
        className='background'
        ref={blurRef}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />
      <div
        className='overlay'
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
        }}
      />
    </span>
  );
};

export default PlaylistViewManager;
