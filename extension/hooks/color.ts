import { npvState } from '@store/npv.ts';
import { applyThemeFromHex } from '@app/utils/colors/mcg.ts';
import type { AppSettings } from '@app/types/settings.ts';
import appSettingsStore from '@store/setting.ts';
import { extractFromImage } from '@utils/colors/color.ts';

const DEFAULT_COLOR = '#1bc858';

let unsubscribe: (() => void) | null = null;

async function applyExtractedColor(url: string, tonal: boolean) {
  try {
    const color = await extractFromImage(url);
    if (!color?.hex) throw new Error('Extracted color is undefined');

    applyThemeFromHex(color.hex, { tonal });
  } catch (error) {
    console.error('Error extracting color from image:', error);
    Spicetify?.showNotification?.('Error extracting color from image.', true, 2500);
    applyThemeFromHex(DEFAULT_COLOR, { tonal });
  }
}

export function mountColor(settings: AppSettings['color'] = appSettingsStore.getState().color) {
  if (unsubscribe) unsubscribe();

  if (settings.isDynamic) {
    const npvUrl = npvState.getState().url;
    if (npvUrl) {
      applyExtractedColor(npvUrl, settings.isTonal);
    }

    unsubscribe = npvState.subscribe(async (state) => {
      if (state.url) {
        await applyExtractedColor(state.url, settings.isTonal);
      }
    });

    return;
  }

  const themeColor =
    settings.isCustom && settings.customColor?.hex ? settings.customColor.hex : DEFAULT_COLOR;

  applyThemeFromHex(themeColor, { tonal: settings.isTonal });
}
