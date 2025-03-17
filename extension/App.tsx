import { patchIcons } from '@utils/patchIcons.ts';
import { mountAndWatchFont } from '@components/font.ts';
import appSettingsStore from '@store/setting.ts';
import { mountPageStyles } from '@app/hooks/pageStyles.ts';
import { mountColor } from '@app/hooks/color.ts';
import { mountPageType } from '@app/hooks/pageType.ts';
import mountControls from '@app/hooks/controls.ts';
import { mountPlaybar } from '@app/hooks/playbar.ts';
import { mountSettings } from '@app/hooks/settings.ts';
import { mountBackground } from '@app/hooks/background.ts';
import { mountNPV } from '@app/hooks/npv.ts';
import { mountGrains } from '@app/hooks/grains.ts';
import { mountAndOpenGuide } from '@app/hooks/guide.ts';
import { mountChangelog } from '@app/changelog/changelog.ts';
import setGlobals from '@utils/setGlobals.ts';
import { showNotification } from '@utils/showNotification.ts';
import { mountBorders } from '@app/hooks/border.ts';
import { mountUnderMainView } from '@app/hooks/umv.ts';

const main = () => {
  try {
    setGlobals();

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

    mountSettings();

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
