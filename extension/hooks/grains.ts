import appSettingsStore from '@store/setting.ts';

let currentGrainType: string | null = null;

function mountGrainStyles(settings = appSettingsStore.getState().grains) {
  const newGrainType = settings.type;
  if (currentGrainType === newGrainType) return;
  if (currentGrainType) {
    document.body.classList.remove(`grain-${currentGrainType}`);
  }
  if (newGrainType) {
    document.body.setAttribute('grain-type', newGrainType);
    document.body.classList.add(`grain-${newGrainType}`);
  } else {
    document.body.removeAttribute('grain-type');
  }
  currentGrainType = newGrainType;
}

export function mountGrains() {
  mountGrainStyles();
  appSettingsStore.subscribe((state) => {
    mountGrainStyles(state.grains);
  }, 'grains');
}
