import appSettingsStore from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { alphaToHex } from '@utils/colors/convert.ts';
import { waitForElement } from '@utils/dom/waitForElement.ts';

function mountPlaybarStyles(settings = appSettingsStore.getState().playbar) {
  const curr = settings.options[settings.type];
  const styles = lazyLoadStyleById('lucid-playbar');

  styles.textContent = `
    :root,
    .Root__now-playing-bar{
        --npb-height: ${curr.height ?? 80}px;
        --npb-blur: ${curr.backdropFilter.blur ?? 32}px;
        --npb-padding-x: ${curr.paddingX ?? 8}px;
        --npb-saturate: ${curr.backdropFilter.saturate ?? 150}%;
        --npb-brightness: ${curr.backdropFilter.brightness ?? 80}%;
        --npb-border-radius: ${curr.borderRadius ?? 8}px;
        --npb-image-radius: ${curr.imageRadius ?? 16}px;
        --npb-bg-opacity: ${curr.bgOpacity ?? 50}%;
        --npb-bg-color: ${
          curr.bgColor.hex
            ? curr.bgColor.hex + alphaToHex(curr.bgColor.alpha)
            : `rgba(var(--clr-surface-1-rgb), ${curr.bgColor.alpha}%)`
        } ;
    }`;

  if (settings.isFloating) {
    document.body.setAttribute('npb-is-floating', 'floating');
  } else {
    document.body.removeAttribute('npb-is-floating');
  }

  document.body.setAttribute('npb-type', settings.type);
}

let nowPlayingBar: HTMLElement | null =
  document.querySelector<HTMLElement>('.Root__now-playing-bar');

waitForElement(['.Root__now-playing-bar'], ([element]) => {
  nowPlayingBar = element;
  handleResize();
});

let hideIcon = appSettingsStore.getState().playbar.hideIcons;

function handleResize() {
  if (!nowPlayingBar) {
    return;
  }

  const width = nowPlayingBar.offsetWidth;
  nowPlayingBar.style.setProperty('--width', `${width}px`);
  hideIcons(hideIcon || width < 1000);
}

function hideIcons(condition = appSettingsStore.getState().playbar.hideIcons) {
  if (!nowPlayingBar) return;
  if (condition) {
    nowPlayingBar.setAttribute('hide-icons', 'true');
  } else {
    nowPlayingBar.removeAttribute('hide-icons');
  }
}

export function mountPlaybar() {
  window.addEventListener('resize', handleResize);

  mountPlaybarStyles();
  hideIcons(hideIcon || (nowPlayingBar?.clientWidth || 0) < 900);
  appSettingsStore.subscribe((state) => {
    hideIcon = state.playbar.hideIcons;
    hideIcons(hideIcon || (nowPlayingBar?.clientWidth || 0) < 900);
    mountPlaybarStyles(state.playbar);
  }, 'playbar');

  handleResize();
}
