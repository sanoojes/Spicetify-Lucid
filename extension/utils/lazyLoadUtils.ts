import { createElement } from '@utils/dom/createElement.ts';

export const lazyLoadElementByTag = (tag: string): HTMLElement => {
  let element = document.getElementById(tag);

  if (!element) {
    element = document.createElement(tag);
    document.body.appendChild(element);
  }

  return element as HTMLElement;
};
export const lazyLoadStyleById = (id: string): HTMLStyleElement => {
  let element = document.querySelector(`#style-${id}`) as HTMLStyleElement;

  if (!element) {
    element = createElement('style', { id: `style-${id}` });
    document.head.appendChild(element);
  }

  return element;
};
