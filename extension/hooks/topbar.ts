import appSettingsStore from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { alphaToHex } from '@utils/colors/convert.ts';

export function mountTopbarStyles(settings = appSettingsStore.getState().topbar) {
  const styles = lazyLoadStyleById('lucid-topbar');

  styles.textContent = `
:root,
.marketplace-header,
.main-home-filterChipsSection,
.main-trackList-trackListHeaderStuck.main-trackList-trackListHeader,
.main-topBar-background,
.search-searchCategory-SearchCategory{
    --top-bar-blur: ${settings.backdropFilter.blur ?? 32}px;
    --top-bar-saturate: ${settings.backdropFilter.saturate ?? 150}%;
    --top-bar-brightness: ${settings.backdropFilter.brightness ?? 80}%;
    ${
      settings.isCustomColor
        ? `--top-bar-color: ${
            settings.bgColor.hex
              ? settings.bgColor.hex + alphaToHex(settings.bgColor.alpha)
              : `rgba(var(--clr-surface-1-rgb), ${settings.bgColor.alpha}%)`
          }`
        : ''
    } }`;
}

appSettingsStore.subscribe((state) => {
  mountTopbarStyles(state.topbar);
}, 'topbar');
