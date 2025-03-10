import { TOUR_STORAGE_KEY } from '@app/constant.ts';
import { createElement } from '@utils/dom/createElement.ts';
import { fetchAndCache } from '@utils/fetchAndCache.ts';

const CACHE_KEY = 'LUCID_GUIDE_SCRIPT_CACHE';
const SCRIPT_LINKS = [
  'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/refs/heads/beta/src/guidedTour.js',
  'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@refs/heads/main/src/guidedTour.js',
];

export async function mountAndOpenGuide(open = false) {
  if (!localStorage.getItem(TOUR_STORAGE_KEY) || open) {
    await mountGuide();
    if (window?.guide?.open) {
      window.guide.open();
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } else {
      console.error('Guide script loaded, but window.guide is not available.');
    }
  }
}

export async function mountGuide(): Promise<void> {
  const id = 'guideScript';
  let guideScript = document.getElementById(id) as HTMLScriptElement | null;

  if (guideScript) {
    console.debug('Guide script already mounted.');
    return;
  }

  try {
    Spicetify?.showNotification('Please wait. Guided Tour is loading.', false, 1000);

    const scriptText = await fetchAndCache(SCRIPT_LINKS, CACHE_KEY);

    guideScript = createElement('script', {
      id,
      type: 'text/javascript',
      defer: true,
    });

    if (!guideScript) return;

    guideScript.textContent = scriptText;
    document.body.appendChild(guideScript);

    console.debug('Mounted Guide script.');
  } catch (error) {
    console.error('Failed to load guide script:', error);
    Spicetify?.showNotification('Failed to load Guided Tour.', true);
  }
}
