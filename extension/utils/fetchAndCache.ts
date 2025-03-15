interface FetchCache {
  script: string;
  timestamp: number;
}

export async function fetchAndCache(
  urls: string[],
  localKey: string,
  time = 86400000
): Promise<string> {
  const cachedData = JSON.parse(localStorage.getItem(localKey) || 'null') as FetchCache | null;
  if (cachedData?.script && (!navigator.onLine || Date.now() - cachedData.timestamp < time)) {
    return cachedData.script;
  }
  let scriptText: string | null = null;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        scriptText = await response.text();
        break;
      }
    } catch {}
  }
  if (!scriptText) {
    if (cachedData?.script) return cachedData.script;
    throw new Error('Failed to fetch guide script from all sources.');
  }
  localStorage.setItem(localKey, JSON.stringify({ script: scriptText, timestamp: Date.now() }));
  return scriptText;
}
