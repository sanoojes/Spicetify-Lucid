import { getNowPlayingArtworkURL } from '@utils/artworkUtils.ts';
import Store from '@utils/state/store.ts';

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
  } catch (error) {
    console.error('Error updating NPV state:', error);
    npvState.setState(() => ({ url: null }));
  }
}

updateNPVUrl();
Spicetify.Player.addEventListener('songchange', updateNPVUrl);

export { npvState };
