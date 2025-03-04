import settingsManager from '@store/setting.ts';
import { lazyLoadStyleById } from '@utils/lazyLoadUtils.ts';
import { UnderMainViewElement } from '@components/umv.ts';
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

const main = () => {
  const lucidMain = new MainElement();

  function mountMain() {
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
    const underMainView = new UnderMainViewElement();
    const underMainViewParent = document.querySelector('.under-main-view')?.parentElement;
    if (underMainViewParent) underMainViewParent.prepend(underMainView);
    else document.querySelector('.main-view-container')?.prepend(underMainView);
  }
  setTimeout(mountUnderMainView, 500);

  // Call all fns here
  mountMain();
  mountBorders();
  mountBackground();
  patchIcons();
  mountAndWatchFont();

  mountGrains();

  mountColor();

  mountPageStyles();

  mountPageType();

  mountControls();

  mountPlaybar();

  mountNPV();

  appSettingsStore.subscribe((state) => {
    mountColor(state.color);
  }, 'color');

  mountSettings(lucidMain);
};

console.time('Main fn start');
main();
console.timeEnd('Main fn start');
