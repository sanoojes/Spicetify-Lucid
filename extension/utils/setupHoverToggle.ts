import debounce from '@utils/debounce.ts';
import getOrCreateElement from '@utils/dom/getOrCreateElement.ts';
import waitForElements from '@utils/dom/waitForElements.ts';

export default function setupHoverToggle({
  containerSelector,
  onTopContainerSelectors,
  className = 'show',
  condition = true,
  hoverTargetId = 'hover-target',
  bodyClass,
  onHoverBodyClass,
  onNotHoverBodyClass,
}: {
  bodyClass?: string;
  onHoverBodyClass?: string;
  onNotHoverBodyClass?: string;
  containerSelector: string;
  onTopContainerSelectors: string[];
  className?: string;
  condition?: boolean;
  hoverTargetId?: string;
}) {
  let hoverTarget: HTMLElement | null = null;
  let targetElements: HTMLElement[] = [];
  let isHoveringTarget = false;
  let isHoveringElements = false;
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  let isDelayingUpdate = false;

  if (bodyClass) document.body.classList.toggle(bodyClass, condition);

  const isResizingOrContextMenuOpen = () =>
    targetElements.some((el) =>
      el.querySelector('.LayoutResizer__resize-bar--resizing, [data-context-menu-open="true"]')
    );

  const performUpdateVisibility = () => {
    if (onHoverBodyClass)
      document.body.classList.toggle(onHoverBodyClass, isHoveringElements || isHoveringTarget);
    if (onNotHoverBodyClass)
      document.body.classList.toggle(
        onNotHoverBodyClass,
        !(isHoveringElements || isHoveringTarget)
      );
    targetElements.forEach((el) =>
      el.classList.toggle(className, isHoveringTarget || isHoveringElements)
    );
  };

  const updateVisibility = () => {
    if (isResizingOrContextMenuOpen()) {
      if (!isDelayingUpdate) {
        isDelayingUpdate = true;
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          isDelayingUpdate = false;
          updateVisibility();
        }, 2500);
      }
      return;
    }

    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
      resizeTimeout = null;
      isDelayingUpdate = false;
    }

    performUpdateVisibility();
  };

  const attachHoverListeners = () => {
    targetElements.forEach((el) => {
      el.removeEventListener('mouseenter', handleElementEnter);
      el.removeEventListener('mouseleave', handleElementLeave);
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });
  };

  const handleElementEnter = () => {
    isHoveringElements = true;
    updateVisibility();
  };

  const handleElementLeave = () => {
    isHoveringElements = false;
    updateVisibility();
  };

  const updateTargetElements = () => {
    const newElements = onTopContainerSelectors
      .map((selector) => document.querySelector(selector) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    const isChanged =
      newElements.length !== targetElements.length ||
      newElements.some((el, i) => el !== targetElements[i]);

    if (isChanged) {
      targetElements = newElements;
      attachHoverListeners();
      updateVisibility();
    }
  };

  const debouncedUpdate = debounce(updateTargetElements, 100);

  const observeBodyChanges = () => {
    const observer = new MutationObserver((mutations) => {
      const relevantChange = mutations.some(
        (mutation) =>
          Array.from(mutation.addedNodes).some(
            (node) =>
              node instanceof HTMLElement &&
              onTopContainerSelectors.some(
                (sel) => node.matches?.(sel) || node.querySelector?.(sel)
              )
          ) ||
          Array.from(mutation.removedNodes).some(
            (node) =>
              node instanceof HTMLElement &&
              onTopContainerSelectors.some(
                (sel) => node.matches?.(sel) || node.querySelector?.(sel)
              )
          )
      );

      if (relevantChange) debouncedUpdate();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const init = () => {
    waitForElements(containerSelector).then((container) => {
      if (!condition) {
        const existingTarget = document.getElementById(hoverTargetId);
        if (existingTarget) existingTarget.remove();
        return;
      }

      hoverTarget = getOrCreateElement('div', hoverTargetId, container);

      hoverTarget.addEventListener('mouseenter', () => {
        isHoveringTarget = true;
        updateVisibility();
      });

      hoverTarget.addEventListener('mouseleave', () => {
        isHoveringTarget = false;
        updateVisibility();
      });

      updateTargetElements();
      observeBodyChanges();
    });
  };

  init();
}
