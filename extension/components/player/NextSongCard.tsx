import CoverArt from '@components/player/CoverArt.tsx';
import TrackInfo from '@components/player/TrackInfo.tsx';
import appStore from '@store/appStore.ts';
import tempStore from '@store/tempStore.ts';
import React, { type CSSProperties, type FC, useEffect, useMemo, useState } from 'react';
import { useStore } from 'zustand';

const NextSongCard: FC = () => {
  const { height, paddingX, paddingY, coverArtSize, removeNextUp } = useStore(
    appStore,
    (state) => state.player.nextSongCard
  );
  const tmpPlayer = useStore(tempStore, (state) => state.player);
  const [songData, setSongData] = useState(() => Spicetify?.Player?.data?.nextItems?.[0] ?? null);
  const [loading, setLoading] = useState(false);

  console.log(tmpPlayer?.next);

  useEffect(() => {
    const next = tmpPlayer?.next?.[0]?.data ?? null;

    setSongData((prev) => {
      if (!next || prev?.uri === next?.uri) return prev;
      return next;
    });

    if (loading && songData?.uri !== next?.uri) {
      setLoading(false);
    }
  }, [tmpPlayer?.next?.[0]?.data?.uri]);

  useEffect(() => {
    const handle = () => {
      setLoading(true);
    };

    Spicetify?.Player?.addEventListener?.('songchange', handle);
    return () => {
      Spicetify?.Player?.removeEventListener?.('songchange', handle);
    };
  }, []);

  const imageSrc = useMemo(() => {
    const images = songData?.images ?? [];
    return images[3]?.url || images[2]?.url || images[1]?.url || images[0]?.url || null;
  }, [songData]);

  return (
    <div
      className="next-playing-card"
      style={
        {
          '--height': `${height}px`,
          '--x-padding': `${paddingX}px`,
          '--y-padding': `${paddingY}px`,
          '--cover-size': `${coverArtSize}px`,
        } as CSSProperties
      }
    >
      <CoverArt imageSrc={loading ? null : imageSrc} href={songData?.metadata?.album_uri} />
      <div className="main-nowPlayingWidget-trackInfo main-trackInfo-container">
        {removeNextUp ? null : (
          <p className="e-9890-text encore-text-marginal encore-internal-color-text-subdued next-up">
            Next Up...
          </p>
        )}
        <TrackInfo
          metadata={songData?.metadata}
          artists={songData?.artists}
          loading={loading || !songData}
        />
      </div>
    </div>
  );
};

export default NextSongCard;
