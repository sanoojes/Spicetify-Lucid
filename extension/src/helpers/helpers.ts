// Wait for dom elements fn
export const waitForElement = async (
  selector: string,
  timeout?: number
): Promise<Element | null> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    let observer: MutationObserver | null = null;
    const startTime = Date.now();

    const checkAndResolve = () => {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        if (observer) {
          observer.disconnect();
        }
        resolve(targetElement);
      } else if (timeout && Date.now() - startTime >= timeout) {
        console.log(`[Lucid] ${selector} not found within ${timeout}ms`);
        if (observer) {
          observer.disconnect();
        }
        resolve(null);
      }
    };

    observer = new MutationObserver(checkAndResolve);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    checkAndResolve();
  });
};
