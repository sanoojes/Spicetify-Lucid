export const showNotification = (message: string, isError = false, timeout?: number) => {
  while (!Spicetify.showNotification) setTimeout(showNotification, 500);

  console.debug(`Notification: ${message} (Error: ${isError}, Timeout: ${timeout})`);

  Spicetify.showNotification(message, isError, timeout);
};
