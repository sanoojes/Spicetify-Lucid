import { useImageStore } from "@/store/useImageStore";
import { useLucidStore } from "@/store/useLucidStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { FCStyleOptions } from "@/types/styles";
import { getFormattedStyles } from "@/utils/styleUtils";
import React, { type FC } from "react";

const StaticBackground: FC<FCStyleOptions> = ({ style }) => {
  const {
    backgroundSettings: { customBackgroundOverride },
  } = useSettingsStore();
  const { artworkData } = useLucidStore();
  const { isUseLocalImage, selectedLocalImage } = useImageStore();

  const backgroundImage = (() => {
    if (isUseLocalImage && selectedLocalImage?.dataURL) {
      return selectedLocalImage.dataURL;
    } else {
      const overrideUrl = customBackgroundOverride.url;

      if (overrideUrl === "current-page") {
        return (
          artworkData?.currentPageArtURL || artworkData?.nowPlayingArtURL || ""
        );
      }

      if (
        !overrideUrl ||
        overrideUrl.trim() === "" ||
        overrideUrl === "now-playing"
      ) {
        return artworkData?.nowPlayingArtURL || "";
      }

      return overrideUrl || "";
    }
  })();

  return (
    <div
      className='static-background'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        ...getFormattedStyles(style),
      }}
    />
  );
};

export default StaticBackground;
