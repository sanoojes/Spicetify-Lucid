import type { PageSettings } from '@app/types/settings.ts';
import appSettingsStore from '@store/setting.ts';

let lastClassName: string | null = null;
export function mountPageStyles(pageSettings: PageSettings = appSettingsStore.getState().pages) {
  const newClassName = `playlist-${pageSettings.style}`;
  if (lastClassName !== newClassName) {
    if (lastClassName) {
      document.body.classList.replace(lastClassName, newClassName);
    } else document.body.classList.add(newClassName);
    lastClassName = newClassName;
  }

  if (!pageSettings.hideHomeHeader) document.body.classList.add('hide-home-header');
  else document.body.classList.remove('hide-home-header');

  document.body.style.setProperty('--custom-panel-gap', `${pageSettings.panelGap}px`);
}

appSettingsStore.subscribe((state) => {
  mountPageStyles(state.pages);
}, 'pages');
