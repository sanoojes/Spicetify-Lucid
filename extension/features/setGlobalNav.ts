import appStore from '@store/appStore.ts';
import setupHoverToggle from '@utils/setupHoverToggle.ts';

export function setGlobalNav(globalNav = appStore.getState().globalNav) {
  if (globalNav.autoHide)
    document.body.style.setProperty('--global-nav-target-width', `${globalNav.hoverTargetWidth}px`);
  else document.body.style.removeProperty('--global-nav-target-width');
  document.body.classList.toggle('global-nav-auto-hide', globalNav.floating && globalNav.autoHide);
  document.body.classList.toggle(
    'global-nav-not-auto-hide',
    globalNav.floating && !globalNav.autoHide
  );
  document.body.classList.toggle('global-nav-floating', globalNav.floating);
  setupHoverToggle({
    onHoverBodyClass: 'global-nav--hovering',
    onNotHoverBodyClass: 'global-nav-not--hovering',
    containerSelector: '.Root__top-container',
    onTopContainerSelectors: ['.Root__globalNav'],
    hoverTargetId: 'global-nav-hover-target',
    className: 'show',
    condition: globalNav.autoHide,
  });
}
appStore.subscribe((state) => state.globalNav, setGlobalNav);
