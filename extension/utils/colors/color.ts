import { extractColors } from 'extract-colors';

type FinalColor = {
  hex: string;
  red: number;
  green: number;
  blue: number;
  area: number;
  hue: number;
  saturation: number;
  lightness: number;
  intensity: number;
};

type CacheEntry = {
  color: FinalColor;
  timestamp: number;
};

type CacheMap = {
  [key: string]: CacheEntry;
};

const CACHE_KEY = 'extractedColorsCache';
const MAX_CACHE_ENTRIES = 100;

function getCache(): CacheMap {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    return cache ? (JSON.parse(cache) as CacheMap) : {};
  } catch (error) {
    console.error('Error retrieving cache:', error);
    return {};
  }
}

function setCache(cache: CacheMap): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

function evictIfNeeded(cache: CacheMap): void {
  const keys = Object.keys(cache);
  if (keys.length > MAX_CACHE_ENTRIES) {
    keys.sort((a, b) => cache[a].timestamp - cache[b].timestamp);
    const numToEvict = keys.length - MAX_CACHE_ENTRIES;
    for (let i = 0; i < numToEvict; i++) {
      delete cache[keys[i]];
    }
  }
}

export async function extractFromImage(src: string): Promise<FinalColor | null> {
  const imageUrl = src.replace('spotify:image:', 'https://i.scdn.co/image/');

  const cache: CacheMap = getCache();

  if (cache[imageUrl]) {
    cache[imageUrl].timestamp = Date.now();
    setCache(cache);
    console.debug('Returning cached color for:', imageUrl, cache[imageUrl].color);
    return cache[imageUrl].color;
  }

  const start = performance.now();

  try {
    const colors: FinalColor[] = await extractColors(imageUrl, {
      crossOrigin: 'anonymous',
    });

    const duration = performance.now() - start;
    console.debug(`extractFromImage took ${duration.toFixed(2)}ms`);
    console.debug('Extracted colors:', colors);

    const firstColor: FinalColor = colors[0];
    cache[imageUrl] = {
      color: firstColor,
      timestamp: Date.now(),
    };

    evictIfNeeded(cache);
    setCache(cache);

    return firstColor;
  } catch (error) {
    console.error('extractFromImage failed:', error);
    return null;
  }
}
