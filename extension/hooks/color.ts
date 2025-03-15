import type { AppSettings } from '@app/types/settings.ts';
import appSettingsStore from '@store/setting.ts';
import { npvState } from '@store/npv.ts';
import { createWorker } from '@utils/worker/getWorker.ts';
import type { ColorMessage, ColorOptions, ImageOptions } from '@app/types/workers.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { fetchAndCache } from '@utils/fetchAndCache.ts';
import { DEFAULT_COLOR, WORKER_SCIRPT_URLS, WORKER_SCRIPT_CACHE_KEY } from '@app/constant.ts';
import { showNotification } from '@utils/showNotification.ts';

let worker: null | Worker = null;
let unsubscribe: null | (() => void) = null;
const styleSheet = lazyLoadStyleById('clr-lucid');

function sendColorData(options: ColorOptions) {
  if (!worker) return;
  worker.postMessage({
    type: 'color',
    options,
  } satisfies ColorMessage);
}
function sendImageData(options: ImageOptions) {
  if (!worker) return;
  worker.postMessage({
    type: 'image',
    options,
  } satisfies ColorMessage);
}

function convertSpotifyImageUrl(url: string): string {
  return url.replace('spotify:image:', 'https://i.scdn.co/image/');
}

export async function mountColor(
  settings: AppSettings['color'] = appSettingsStore.getState().color
): Promise<void> {
  await initWorker();

  unsubscribe?.();

  if (settings.isDynamic) {
    const currentUrl = npvState.getState().url;
    if (currentUrl) {
      sendImageData({
        url: convertSpotifyImageUrl(currentUrl),
        isTonal: settings.isTonal,
        isDark: true,
        extractorOptions: settings?.extractorOptions ?? {},
      });
    }
    unsubscribe = npvState.subscribe((state) => {
      if (state.url) {
        sendImageData({
          url: convertSpotifyImageUrl(state.url),
          isTonal: settings.isTonal,
          isDark: true,
          extractorOptions: settings?.extractorOptions ?? {},
        });
      }
    });
    return;
  }

  if (settings.isCustom) {
    sendColorData({
      hex: settings.customColor.hex,
      isTonal: settings.isTonal,
      isDark: true,
    });
    return;
  }

  sendColorData({
    hex: DEFAULT_COLOR,
    isTonal: settings.isTonal,
    isDark: true,
  });
}

async function initWorker() {
  const workerScript = await fetchAndCache(WORKER_SCIRPT_URLS, WORKER_SCRIPT_CACHE_KEY);
  worker = createWorker(workerScript);

  if (!worker) {
    document.body.removeAttribute('color-from-worker');
    console.error('Failed to initialize worker from both endpoints.');
    showNotification(
      'Failed to initialize the color worker. If this issue persists, please report it. (Dynamic and custom colors may not function properly.)',
      true,
      5000
    );
    return;
  }

  document.body.setAttribute('color-from-worker', 'true');

  worker.onmessage = (event) => {
    const { message, data } = event.data || {};
    if (data) {
      console.debug(message, '\nEvent Data:', event.data);
      styleSheet.textContent = `:root,body{${data.style}}`;
    } else {
      console.error(message ?? 'Color not applied');
    }
  };

  worker.onerror = (event) => {
    console.error('Worker encountered an error:', event.message || event);
  };
}
