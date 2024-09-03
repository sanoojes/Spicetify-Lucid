import { logToConsole } from '@/utils/logUtils';

function applyBackgroundStyles(
  backgroundStyleElement: HTMLElement,
  zIndex: number
) {
  backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: ${zIndex} !important; }
  `;
}

function removeBackgroundZIndex(backgroundStyleElement: HTMLElement) {
  backgroundStyleElement.innerHTML = `
    #lucid-main .background-container .background-wrapper div { z-index: -1 !important; }
  `;
}

function manageBackgroundZIndexForElement(
  element: HTMLElement,
  selector: string,
  backgroundStyleElement: HTMLElement,
  zIndex = 6
) {
  let isContainerPresent = false;

  const observer = new MutationObserver(() => {
    const container = element.querySelector(selector);

    if (container) {
      if (!isContainerPresent) {
        logToConsole(`Applying background z-index: ${zIndex}`);
        isContainerPresent = true;
        applyBackgroundStyles(backgroundStyleElement, zIndex);
      }
    } else {
      if (isContainerPresent) {
        logToConsole(`Removing background z-index. ${zIndex}`);
        isContainerPresent = false;

        const lyricsCinemaElement = document.querySelector(
          '#lyrics-cinema'
        ) as HTMLElement;
        if (lyricsCinemaElement) {
          manageBackgroundZIndexForElement(
            lyricsCinemaElement,
            '#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container',
            backgroundStyleElement
          );
        } else {
          removeBackgroundZIndex(backgroundStyleElement);
        }
      }
    }
  });

  const config = { childList: true, attributes: true, subtree: true };

  observer.observe(element, config);
  removeBackgroundZIndex(backgroundStyleElement);
}

export const manageBackgroundZIndex = () => {
  let backgroundStyleElement = document.getElementById(
    'lucid-background-style'
  );

  if (!backgroundStyleElement) {
    backgroundStyleElement = document.createElement('style');
    backgroundStyleElement.id = 'lucid-background-style';
    document.head.appendChild(backgroundStyleElement);
  }

  const lyricsCinemaElement = document.querySelector(
    '#lyrics-cinema'
  ) as HTMLElement;
  if (lyricsCinemaElement) {
    manageBackgroundZIndexForElement(
      lyricsCinemaElement,
      '#lyrics-cinema .lyrics-lyrics-background, #lyrics-cinema .lyrics-lyrics-container',
      backgroundStyleElement
    );
  }

  const fullScreenElement = document.querySelector(
    '#main .Root'
  ) as HTMLElement;
  if (fullScreenElement) {
    manageBackgroundZIndexForElement(
      fullScreenElement,
      '.Root div[data-testid="fullscreen-mode-container"], .Root .npv-main-container',
      backgroundStyleElement,
      15
    );
  }
};
