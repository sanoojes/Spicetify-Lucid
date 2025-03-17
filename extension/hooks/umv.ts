import { waitForElement } from '@utils/dom/waitForElement.ts';
import { UMVElement } from '@components/umv.ts';

export function mountUnderMainView() {
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
