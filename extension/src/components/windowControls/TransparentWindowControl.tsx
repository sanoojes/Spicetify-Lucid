import {
  isCustomControls,
  isLightModeEnabled,
  isSpotifyV16Above,
  isWindowsPlatform,
} from "@/constants/constants";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { setWindowControlsHeight } from "@/utils/windowControlUtils";
import React, { useEffect, useRef, useState, type CSSProperties } from "react";

const TransparentWindowControl = () => {
  const TransparentWindowControlRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const { windowZoom } = useLucidStore();
  const {
    interfaceSettings: {
      controlSettings: { height: controlHeight },
    },
  } = useSettingsStore();

  useEffect(() => {
    const setTopBarStyles = () => {
      if (isWindowsPlatform) {
        setWindowControlsHeight(controlHeight);

        if (!isCustomControls && !isLightModeEnabled) {
          const normalHeight = controlHeight || (isSpotifyV16Above ? 32 : 64);
          const controlTop = isSpotifyV16Above
            ? (controlHeight / windowZoom -
                Math.min(32 / windowZoom, controlHeight / windowZoom)) /
              2
            : 0;
          const height = normalHeight / windowZoom - controlTop * 2;

          window.document.body.style.setProperty(
            "--top-bar-padding-start",
            `${(controlHeight <= 16 ? 8 : 64) / windowZoom}px`
          );
          window.document.body.style.setProperty(
            "--top-bar-padding-end",
            `${(controlHeight <= 16 ? 8 : 135) / windowZoom}px`
          );

          const newStyle: CSSProperties = {
            position: "fixed",
            right: 0,
            top: `${controlTop}px`,
            height: `${height}px`,
            width: `${135 / windowZoom}px`,
            WebkitBackdropFilter: "brightness(2.12)",
            backdropFilter: "brightness(2.12)",
            pointerEvents: "none",
            zIndex: "var(--above-main-and-now-playing-view-grid-area, 6)",
          };

          setStyle(newStyle);
        } else {
          setStyle({}); //  remove styles
        }
      }
    };

    setTopBarStyles();

    const handleResize = () => {
      setTopBarStyles();
    };

    const timeoutId = setTimeout(setTopBarStyles, 1000);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowZoom, controlHeight]);

  return <div ref={TransparentWindowControlRef} style={style} />;
};

export default TransparentWindowControl;
