import { logToConsole } from '@/utils/logUtils';

export async function setWindowControlsHeight(height: number) {
  try {
    if (Spicetify?.CosmosAsync?.post)
      await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
        type: 'update_titlebar',
        height: height,
      });

    logToConsole(`Control height set to ${height}px`);
  } catch (error) {
    logToConsole(`Error setting control height: ${height}`, { level: 'error' });
  }
}

export async function checkForCustomControls(
  setIsCustomControls: (value: boolean) => void
) {
  if (document.getElementById('customControls')) {
    setIsCustomControls(true);
    document.querySelector('.lucid-transperent-window-controls')?.remove();
  }
}
