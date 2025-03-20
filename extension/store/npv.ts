import { getNowPlayingArtworkURL } from '@utils/artworkUtils.ts';
import Store from '@utils/state/store.ts';
import { PLACEHOLDER_IMAGE } from '@app/constant.ts';

type NPVState = {
  url: string | null;
};

const npvState = new Store<NPVState>({
  url: null,
});

async function updateNPVUrl(): Promise<void> {
  try {
    const newUrl = await getNowPlayingArtworkURL();
    npvState.setState(() => ({ url: newUrl }));
    document.body.style.setProperty('--npv-img-url', newUrl ? `url(${newUrl})` : PLACEHOLDER_IMAGE);
  } catch (error) {
    console.error('Error updating NPV state:', error);
    npvState.setState(() => ({ url: null }));
    document.body.style.setProperty('--npv-img-url', PLACEHOLDER_IMAGE);
  }
}

updateNPVUrl();
Spicetify.Player.addEventListener('songchange', updateNPVUrl);

export { npvState };
