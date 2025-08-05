import type { BackgroundState } from '@app/types/appStore.ts';
import appStore from '@store/appStore.ts';
import serializeFilters from '@utils/dom/serializeFilters.ts';
import type { FC } from 'react';
import React from 'react';
import { useStore } from 'zustand';

const StaticBackground: FC<{ imageSrc?: string }> = ({ imageSrc }) => {
  const filter = useStore(appStore, (state) => state.bg.options.filter);
  const imageMode = useStore(appStore, (state) => state.bg.options.imageMode);

  return (
    <div
      className={`bg static`}
      style={{
        backgroundImage: getStaticImageUrl({ imageSrc, imageMode }),
        filter: serializeFilters(filter),
      }}
    />
  );
};

export default StaticBackground;

function getStaticImageUrl(options: Partial<BackgroundState['options']>): string {
  const { imageMode, imageSrc } = options;
  if (imageMode === 'custom') return imageSrc ? `url(${imageSrc})` : 'var(--np-img-url)';
  if (imageMode === 'page') return 'var(--page-desktop-img-url, var(--page-img-url))';
  return 'var(--np-img-url)';
}
