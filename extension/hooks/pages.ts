import { waitForElement } from '@utils/dom/waitForElement.ts';

export function mountPlaylistModalObserver() {
  waitForElement(['.Root'], ([root]) => {
    if (!root) return;
    const rootObserver = new MutationObserver(() => {
      const sourceDiv = root.querySelector('.FP_XXx0FMQPJEu3WzfpM') as HTMLDivElement | null;
      if (!sourceDiv) return;

      const styleObserver = new MutationObserver(() => {
        const rgbRegex = /rgb\(\s*((?:\d{1,3}\s*,\s*){2}\d{1,3})\s*\)/;
        const color = sourceDiv.style.backgroundColor.match(rgbRegex)?.[1];
        if (!color || !sourceDiv.parentElement) return;

        sourceDiv.parentElement.style.setProperty('--accent-color', color);
      });

      styleObserver.observe(sourceDiv, { attributes: true });
    });
    rootObserver.observe(root, { childList: true });
  });
}
