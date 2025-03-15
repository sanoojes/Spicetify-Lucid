import type { PageSettings } from '@app/types/settings.ts';
import appSettingsStore from '@store/setting.ts';

let lastStyle: string | null = null;
let lastImageStyle: string | null = null;
export function mountPageStyles(pageSettings: PageSettings = appSettingsStore.getState().pages) {
  const newStyle = `playlist-${pageSettings.style}`;
  if (lastStyle !== newStyle) {
    if (lastStyle) {
      document.body.classList.replace(lastStyle, newStyle);
    } else document.body.classList.add(newStyle);
    lastStyle = newStyle;
  }

  const newImageStyle = `playlist-image-${pageSettings.imageStyle}`;
  if (lastImageStyle !== newImageStyle) {
    if (lastImageStyle) {
      document.body.classList.replace(lastImageStyle, newImageStyle);
    } else document.body.classList.add(newImageStyle);
    lastImageStyle = newImageStyle;
  }

  if (!pageSettings.hideHomeHeader) document.body.classList.add('hide-home-header');
  else document.body.classList.remove('hide-home-header');

  document.body.style.setProperty('--custom-panel-gap', `${pageSettings.panelGap}px`);
}

appSettingsStore.subscribe((state) => {
  mountPageStyles(state.pages);
}, 'pages');
