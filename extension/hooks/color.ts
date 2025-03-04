import { npvState } from '@store/npv.ts';
import { applyThemeFromHex } from '@app/utils/colors/mcg.ts';
import type { AppSettings } from '@app/types/settings.ts';
import appSettingsStore from '@store/setting.ts';
import { extractFromImage } from '@utils/colors/color.ts';

const DEFAULT_COLOR = '#1bc858';

let unsubscribe: (() => void) | null = null;

export async function mountColor(
  settings: AppSettings['color'] = appSettingsStore.getState().color
) {
  if (settings.isDynamic) {
    const npvUrl = npvState.getState().url;
    if (npvUrl) {
      try {
        applyThemeFromHex((await extractFromImage(npvUrl)).hex, {
          tonal: settings.isTonal,
        });
      } catch (error) {
        console.error('Error extracting color from image:', error);

        if (settings.isCustom && settings.customColor.hex) {
          applyThemeFromHex(settings.customColor.hex, {
            tonal: settings.isTonal,
          });
          return;
        }
        applyThemeFromHex(DEFAULT_COLOR, { tonal: settings.isTonal });
        return;
      }
    }

    unsubscribe = npvState.subscribe(async (state) => {
      if (state.url) {
        try {
          applyThemeFromHex((await extractFromImage(state.url)).hex, {
            tonal: settings.isTonal,
          });
        } catch (error) {
          console.error('Error extracting color from image during subscription:', error);
        }
      }
    });
    return;
  }

  if (settings.isCustom && settings.customColor) {
    applyThemeFromHex(settings.customColor.hex, { tonal: settings.isTonal });
    return;
  }

  if (unsubscribe) unsubscribe();
  applyThemeFromHex(DEFAULT_COLOR, { tonal: settings.isTonal });
}
