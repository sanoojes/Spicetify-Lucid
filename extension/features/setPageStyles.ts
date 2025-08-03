import appStore from '@store/appStore.ts';

export default function setPageStyles(page = appStore.getState().page) {
  const { coverMode, homeCardGap, mode, panelGap } = page;

  const coverModes = ['compact', 'as-bg', 'default'];
  coverModes.forEach((type) => {
    document.body.classList.toggle(`page-cover-${type}`, coverMode === type);
  });

  const layoutModes = ['compact', 'compact-card', 'card', 'default'];
  layoutModes.forEach((type) => {
    document.body.classList.toggle(`page-${type}`, mode === type);
  });

  document.body.style.setProperty('--home-card-gap', `${homeCardGap}px`);
  document.body.style.setProperty('--panel-gap', `${panelGap}px`);
}

appStore.subscribe((state) => state.page, setPageStyles);
