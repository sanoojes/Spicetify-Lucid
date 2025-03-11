import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import appSettingsStore from '@store/setting.ts';
import { parseFontFamilyFromGFonts } from '@utils/fonts/parseFontUrl.ts';
import type { AppSettings } from '@app/types/settings.ts';
import { createElement } from '@utils/dom/createElement.ts';

interface FontSettings {
  font?: AppSettings['font'];
}

export function mountAndWatchFont() {
  mountFont();

  appSettingsStore.subscribe((state: FontSettings) => {
    mountFont(state.font);
  });
}
function mountFont(font: AppSettings['font'] = appSettingsStore.getState().font) {
  const fontStyleSheet = lazyLoadStyleById('lucid-font');

  let preloadLink = document.head.querySelector('#lucid-custom-font') as HTMLLinkElement | null;
  if (font.isGoogleFonts && font.fontUrl) {
    if (!preloadLink) {
      preloadLink = createElement('link', {
        id: 'lucid-custom-font',
        rel: 'preload',
        href: font.fontUrl,
        as: 'style',
        crossOrigin: 'anonymous',
      }) as HTMLLinkElement;
      document.head.appendChild(preloadLink);
    } else if (preloadLink.href !== font.fontUrl) {
      preloadLink.href = font.fontUrl;
    }

    let stylesheetLink = document.head.querySelector(
      '#lucid-custom-font-style'
    ) as HTMLLinkElement | null;
    if (!stylesheetLink) {
      stylesheetLink = createElement('link', {
        id: 'lucid-custom-font-style',
        rel: 'stylesheet',
        href: font.fontUrl,
        crossOrigin: 'anonymous',
      }) as HTMLLinkElement;
      document.head.appendChild(stylesheetLink);
    } else if (stylesheetLink.href !== font.fontUrl) {
      stylesheetLink.href = font.fontUrl;
    }
  } else {
    if (preloadLink) {
      preloadLink.remove();
    }
    const stylesheetLink = document.head.querySelector(
      '#lucid-custom-font-style'
    ) as HTMLLinkElement | null;
    if (stylesheetLink) {
      stylesheetLink.remove();
    }
  }

  const fontFamilyValue =
    font.isGoogleFonts && font.fontUrl ? parseFontFamilyFromGFonts(font.fontUrl) : font.fontFamily;

  fontStyleSheet.innerText = `:root,* { --custom-font: "${fontFamilyValue}"; font-family: var(--custom-font) !important; }`;
}
