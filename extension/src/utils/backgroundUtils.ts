export const manageBackgroundZIndex = () => {
  type BackgroundContainer = HTMLDivElement | null;

  function applyBackgroundStyles() {
    const lyricsCinemaContainer: BackgroundContainer = document.querySelector(
      '#lyrics-cinema:has(.lyrics-lyrics-contentContainer)'
    );

    if (lyricsCinemaContainer) {
      const backgroundContainer: BackgroundContainer = document.querySelector(
        '#lucid-main .background-container .background-wrapper div'
      );

      if (backgroundContainer) {
        backgroundContainer.style.zIndex =
          'calc(var(--above-everything-except-now-playing-bar-z-index, 6) - 1)';
      } else {
        removeBackgroundZIndex();
      }
    } else {
      removeBackgroundZIndex();
    }
  }

  function removeBackgroundZIndex() {
    const backgroundContainer: BackgroundContainer = document.querySelector(
      '#lucid-main .background-container .background-wrapper div'
    );

    if (backgroundContainer) {
      backgroundContainer.style.zIndex = '';
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.target instanceof HTMLElement &&
        mutation.target.id === 'lyrics-cinema'
      ) {
        applyBackgroundStyles();
      } else {
        if (
          mutation.target instanceof HTMLElement &&
          mutation.target.classList.contains('lyrics-lyrics-contentContainer')
        ) {
          applyBackgroundStyles();
        }
      }
    }
  });

  const config = { childList: true, attributes: true, subtree: true };

  observer.observe(document.body, config);

  applyBackgroundStyles();
};
