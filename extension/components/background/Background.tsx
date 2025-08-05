import AnimatedBackgroundCanvas from '@components/background/AnimatedBackgroundCanvas.tsx';
import StaticBackground from '@components/background/StaticBackground.tsx';
import appStore from '@store/appStore.ts';
import tempStore from '@store/tempStore.ts';
import React, { type FC } from 'react';
import { useStore } from 'zustand';

const Background: FC = () => {
  const mode = useStore(appStore, (state) => state.bg.mode);
  const color = useStore(appStore, (state) => state.bg.options.color);
  const imageMode = useStore(appStore, (state) => state.bg.options.imageMode);
  const customUrl = useStore(appStore, (state) => state.bg.options.imageSrc);
  const npUrl = useStore(tempStore, (state) => state.player?.current?.url);
  const pageImgUrl = useStore(tempStore, (state) => state.pageImg);
  const imageSrc =
    (imageMode === 'custom'
      ? customUrl
      : imageMode === 'page'
        ? (pageImgUrl.desktop ?? pageImgUrl.cover)
        : npUrl) ?? npUrl;

  return (
    <div className="bg-wrapper">
      {mode === 'animated' ? (
        <div className="bg animated">
          <AnimatedBackgroundCanvas imageSrc={imageSrc} />
        </div>
      ) : mode === 'solid' ? (
        <div className="bg solid" style={{ backgroundColor: color }}></div>
      ) : (
        <StaticBackground imageSrc={imageSrc} />
      )}
    </div>
  );
};

export default Background;
