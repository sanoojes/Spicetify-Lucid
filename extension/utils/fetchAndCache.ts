interface FetchCache {
  script: string;
  timestamp: number;
}

export async function fetchAndCache(
  urls: string[],
  localKey: string,
  time = 86400000
): Promise<string> {
  const cachedDataStr = localStorage.getItem(localKey);
  let cachedData: FetchCache | null = null;
  if (cachedDataStr) {
    try {
      cachedData = JSON.parse(cachedDataStr);
    } catch (e) {
      console.error('Error parsing cached guide script JSON:', e);
    }
  }

  if (navigator.onLine && cachedData?.script && cachedData.timestamp) {
    const age = Date.now() - cachedData.timestamp;
    if (age < time) {
      console.debug('Using cached guide script.');
      return cachedData.script;
    }
  }

  if (!navigator.onLine && cachedData?.script) {
    console.debug('Offline, using cached guide script.');
    return cachedData.script;
  }

  let scriptText: string | null = null;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      scriptText = await response.text();
      console.debug(`Fetched guide script from ${url}`);
      break;
    } catch (error) {
      console.error(`Failed to fetch guide script from ${url}:`, error);
    }
  }

  if (!scriptText) {
    if (cachedData?.script) {
      console.warn('Using outdated cached script because network fetch failed.');
      return cachedData.script;
    }
    throw new Error('Failed to fetch guide script from all sources.');
  }

  const newCache: FetchCache = { script: scriptText, timestamp: Date.now() };
  localStorage.setItem(localKey, JSON.stringify(newCache));
  return scriptText;
}
