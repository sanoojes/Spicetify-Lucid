import { logError, logInfo } from '@/utils/logUtils';

export async function setWindowControlsHeight(height: number) {
  try {
    if (Spicetify?.CosmosAsync?.post)
      await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
        type: 'update_titlebar',
        height: height,
      });

    logInfo(`Control height set to ${height}px`);
  } catch (error) {
    logError(`Error setting control height: ${height}`);
  }
}

export function getIsCustomControls(): boolean {
  if (document.getElementById('customControls')) {
    document.querySelector('.lucid-transperent-window-controls')?.remove();
    return true;
  }
  return false;
}
