import settingsManager from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { UMVElement } from '@components/umv.ts';
import { patchIcons } from '@utils/patchIcons.ts';
import MainElement from '@components/main.ts';
import { mountAndWatchFont } from '@components/font.ts';
import appSettingsStore from '@store/setting.ts';
import { mountPageStyles } from '@app/hooks/pageStyles.ts';
import { mountColor } from '@app/hooks/color.ts';
import { mountPageType } from '@app/hooks/pageType.ts';
import mountControls from '@app/hooks/controls.ts';
import { mountPlaybar } from '@app/hooks/playbar.ts';
import { mountSettings } from '@app/hooks/settings.ts';
import { mountBackground } from '@app/hooks/background.ts';
import { alphaToHex } from '@utils/colors/convert.ts';
import { mountNPV } from '@app/hooks/npv.ts';
import { mountGrains } from '@app/hooks/grains.ts';
import { waitForElement } from '@utils/dom/waitForElement.ts';
import { mountAndOpenGuide } from '@app/hooks/guide.ts';
import { mountChangelog } from '@app/changelog/changelog.ts';
import setGlobals from '@utils/setGlobals.ts';
import { initializeImage } from '@app/imageDb.ts';
import { showNotification } from '@utils/showNotification.ts';

const main = () => {
  try {
    const lucidMain = new MainElement();
    mountMain(lucidMain);

    setGlobals();

    initializeImage();

    setTimeout(mountUnderMainView, 500);

    // Call all fns here
    mountBorders();
    mountBackground();
    patchIcons();
    mountAndWatchFont();

    mountGrains();

    mountPageStyles();

    mountPageType();

    mountControls();

    mountPlaybar();

    mountNPV();

    mountColor();
    appSettingsStore.subscribe((state) => {
      mountColor(state.color);
    }, 'color');

    mountSettings(lucidMain);

    mountAndOpenGuide();

    mountChangelog();
  } catch (e) {
    console.error('Unexpected Error: ', e);
    showNotification('Lucid: Unexpected error. please report it to dev');
  }
};

console.time('Main fn start');
main();
console.timeEnd('Main fn start');

function mountMain(lucidMain: HTMLElement | MainElement) {
  const mainElement = document.getElementById('main');
  if (mainElement) mainElement.append(lucidMain);
  else document.body.appendChild(lucidMain);
}

function mountBorders() {
  const setStyles = () => {
    const borderSetting = settingsManager.getState().border;
    const styleSheet = lazyLoadStyleById('lucid-border');
    styleSheet.textContent = ':root{';
    styleSheet.textContent += `--border-color:${borderSetting.color.hex}${alphaToHex(
      borderSetting.color.alpha
    )};`;
    if (borderSetting.style) {
      styleSheet.textContent += `--border-style:${borderSetting.style};`;
    }
    if (borderSetting.thickness) {
      styleSheet.textContent += `--border-thickness:${borderSetting.thickness}px;`;
    }
    styleSheet.textContent += '}';
  };
  setStyles();
  settingsManager.subscribe(setStyles, 'border');
}

function mountUnderMainView() {
  waitForElement(['.Root__now-playing-bar', '.Root__globalNav'], ([playbar, nav]) => {
    document.body.style.setProperty(
      '--umv-offset',
      `${(playbar?.clientHeight || 80) + (nav?.clientHeight || 64)}px`
    );
  });

  const underMainView = new UMVElement();
  const underMainViewParent = document.querySelector('.under-main-view')?.parentElement;
  if (underMainViewParent) underMainViewParent.prepend(underMainView);
  else document.querySelector('.main-view-container')?.prepend(underMainView);
}
