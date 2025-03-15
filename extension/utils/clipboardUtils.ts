import { showNotification } from '@utils/showNotification.ts';

export async function copyToClipboard(
  text: string,
  successMessage = 'Text copied to clipboard!'
): Promise<void> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.debug(successMessage);
      showNotification(successMessage, false, 5000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      showNotification(
        `Error copying to clipboard: ${err instanceof Error ? err.message : err}`,
        true,
        5000
      );
    }
  } else {
    console.error('Error copying text (navigator.clipboard not found)');
    showNotification('Error copying text (navigator.clipboard not found)', true, 5000);
  }
}
