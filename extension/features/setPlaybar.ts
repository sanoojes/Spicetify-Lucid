import appStore from '@store/appStore.ts';
import getOrCreateStyle from '@utils/dom/getOrCreateStyle.ts';
import waitForElements from '@utils/dom/waitForElements.ts';
import setupHoverToggle from '@utils/setupHoverToggle.ts';

let playerElem: HTMLDivElement | null;
let hasResizeListener = false;
export function setPlayer(player = appStore.getState().player) {
  if (!playerElem) {
    waitForElements('.Root__now-playing-bar').then((e) => {
      playerElem = e as HTMLDivElement;
      setPlayer();
    });
    return;
  }

  const { hideExtraIcon, isFloating, autoHide, mode } = player;
  const { backdropFilter, bgColor, bgOpacity, borderRadius, coverArtRadius, height, paddingX } =
    player[mode === 'compact' ? 'compactStyle' : 'defaultStyle'];

  document.body.classList.toggle('player-compact', mode === 'compact');

  document.body.classList.toggle('player-floating', isFloating);
  playerElem.classList.toggle('floating', isFloating);

  document.body.classList.toggle('player-auto-hide', isFloating && autoHide);

  setupHoverToggle({
    onHoverBodyClass: 'player--hovering',
    onNotHoverBodyClass: 'player--not-hovering',
    containerSelector: '.Root__top-container',
    onTopContainerSelectors: ['.Root__now-playing-bar', '.main-nowPlayingBar-container'],
    hoverTargetId: 'player-hover-target',
    className: 'show',
    condition: isFloating && autoHide,
  });

  const styleElem = getOrCreateStyle('lucid-player-styles');

  styleElem.textContent = `
:root,
.Root__now-playing-bar{
    --player-height: ${height}px;
    --player-padding-x: ${paddingX}px;
    --player-border-radius: ${borderRadius}px;
    --player-image-radius: ${coverArtRadius}px;
    --player-bg-opacity: ${bgOpacity}%;
    --player-bg-color: ${bgColor ? bgColor : `rgba(var(--clr-surface-1-rgb),.7)`};
    --player-blur: ${backdropFilter.blur}px;
    --player-saturate: ${backdropFilter.saturation}%;
    --player-brightness: ${backdropFilter.brightness}%;
    --player-opacity: ${backdropFilter.opacity}%;
    --player-contrast: ${backdropFilter.contrast}%;
}`;

  const handleResize = () => {
    if (!playerElem) return;

    const width = playerElem.offsetWidth;
    document.body.style.setProperty('--player-width', `${width}px`);
    playerElem.style.setProperty('--width', `${width}px`);
    playerElem.classList.toggle(
      'hide-icons',
      (hideExtraIcon || playerElem.offsetWidth < 1000) && mode === 'compact'
    );
  };
  handleResize();

  if (!hasResizeListener) {
    window.addEventListener('resize', handleResize);
    hasResizeListener = true;
  }
}

appStore.subscribe((state) => state.player, setPlayer);
