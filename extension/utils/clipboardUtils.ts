export async function copyToClipboard(
  text: string,
  successMessage = 'Text copied to clipboard!'
): Promise<void> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.debug(successMessage);
      Spicetify?.showNotification(successMessage, false, 5000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      Spicetify?.showNotification(
        `Error copying to clipboard: ${err instanceof Error ? err.message : err}`,
        true,
        5000
      );
    }
  } else {
    console.error('Error copying text (navigator.clipboard not found)');
    Spicetify?.showNotification('Error copying text (navigator.clipboard not found)', true, 5000);
  }
}
