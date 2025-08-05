import appStore from '@store/appStore.ts';
import setupHoverToggle from '@utils/setupHoverToggle.ts';
import { updateCardBgAlpha } from '@utils/updateCardBgAlpha.ts';
import serializeFilters from '@utils/dom/serializeFilters.ts';

const FULL_SCREEN_CLASS_NAME = '.a7Ka5yznvrbSDPk1G36o,.pd3cZQBgtgOFLAp9ns7Q,.JVoVebPNAPKBLKSlIBXw';

export function setRightSidebar(rightSidebar = appStore.getState().rightSidebar) {
  const {
    mode,
    autoHide,
    hoverTargetWidth,
    positionX,
    positionY,
    compactBackdropFilter,
    compactSize,
  } = rightSidebar;

  ['compact', 'default'].forEach((type) =>
    document.body.classList.toggle(`npv-${type}`, mode === type)
  );
  ['left', 'right'].forEach((pos) =>
    document.body.classList.toggle(`npv-${pos}`, positionX === pos)
  );
  ['bottom', 'top'].forEach((pos) =>
    document.body.classList.toggle(`npv-${pos}`, positionY === pos)
  );

  document.body.classList.toggle('right-sidebar-auto-hide', autoHide && mode === 'default');

  if (autoHide) {
    document.body.style.setProperty('--rs-target-width', `${hoverTargetWidth}px`);
  } else {
    document.body.style.removeProperty('--rs-target-width');
  }

  if (mode === 'compact') {
    document.body.style.setProperty('--rs-compact-blur', serializeFilters(compactBackdropFilter));
    document.body.style.setProperty('--rs-compact-size', `${compactSize}px`);
  }
  setupHoverToggle({
    containerSelector: '.Root__top-container',
    onTopContainerSelectors: ['.Root__right-sidebar'],
    hoverTargetId: 'rs-hover-target',
    className: 'show',
    condition: autoHide && mode === 'compact',
  });

  let currentTarget: Element | null = null;
  let targetObserver: MutationObserver | null = null;

  const observeTarget = (el: Element) => {
    targetObserver?.disconnect();
    targetObserver = new MutationObserver(() => {
      updateCardBgAlpha(FULL_SCREEN_CLASS_NAME);
    });
    targetObserver.observe(el, {
      attributes: true,
      attributeFilter: ['style'],
    });
  };

  new MutationObserver(() => {
    const el = document.querySelector(FULL_SCREEN_CLASS_NAME);
    if (el && el !== currentTarget) {
      currentTarget = el;
      observeTarget(el);
    }
  }).observe(document.body, { childList: true, subtree: true });

  const initial = document.querySelector(FULL_SCREEN_CLASS_NAME);
  if (initial) {
    currentTarget = initial;
    observeTarget(initial);
  }
}

appStore.subscribe((state) => state.rightSidebar, setRightSidebar);
