export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    if (url.includes('fonts.googleapis.com/css2')) {
      return true;
    }
    return true;
  } catch (error) {
    return false;
  }
};
