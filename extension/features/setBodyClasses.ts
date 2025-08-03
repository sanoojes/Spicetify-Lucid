import appStore from '@store/appStore.ts';
import getOrCreateElement from '@utils/dom/getOrCreateElement.ts';
import waitForElements from '@utils/dom/waitForElements.ts';
import setupHoverToggle from '@utils/setupHoverToggle.ts';

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function setBodyClasses(bodyClass = appStore.getState().bodyClass) {
  const classList = document.body.classList;

  for (const [key, value] of Object.entries(bodyClass)) {
    const className = camelToKebab(key);
    classList.toggle(className, !!value);
  }
}

appStore.subscribe(
  (state) => state.bodyClass,
  (bodyClass) => {
    setBodyClasses(bodyClass);
  }
);

export default setBodyClasses;
