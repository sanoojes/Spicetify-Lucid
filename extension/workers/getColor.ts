import { getStyles } from '@app/workers/color/mcgUtils.ts';
import type { ColorMessage } from '@app/types/workers.ts';
import { getImageColor } from '@app/workers/color/getImageColor.ts';
import { LRUCache } from '@utils/cache/LRUCache.ts';

const MAX_CACHE_SIZE = 100;
const colorCache = new LRUCache<string, string | null>(MAX_CACHE_SIZE);

self.addEventListener('message', async (event: MessageEvent<ColorMessage>) => {
  try {
    const DEFAULT_COLOR = '#1bc858';
    let color: string | null = null;
    let cacheKey: string | null = null;

    if (event.data.type === 'image') {
      cacheKey = event.data.options.url;
      const cachedColor = colorCache.get(cacheKey);
      if (cachedColor !== undefined) {
        color = cachedColor;
      } else {
        color = await getImageColor(event.data.options.url, { requestMode: 'cors' });
        colorCache.set(cacheKey, color);
      }
    } else {
      cacheKey = event.data.options.hex;
      const cachedColor = colorCache.get(cacheKey);
      if (cachedColor !== undefined) {
        color = cachedColor;
      } else {
        color = event.data.options.hex;
        colorCache.set(cacheKey, color);
      }
    }

    const data = {
      style: getStyles(color ?? DEFAULT_COLOR, {
        dark: event.data.options.isDark,
        tonal: event.data.options.isTonal,
      }),
      color,
    };

    self.postMessage({ success: true, message: 'Colors generated Successfully.', data });
  } catch (error) {
    self.postMessage({ success: false, message: (error as Error).message });
  }
});
