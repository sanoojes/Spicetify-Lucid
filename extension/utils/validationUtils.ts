export type ValidatorResult = { isValid: true } | { isValid: false; message?: string };

export const isValidUrl = (value: string): ValidatorResult => {
  const message = 'Invalid URL';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { isValid: false, message };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, message };
  }
};

const isValidNumberInRange = (value: number, min: number, max: number): ValidatorResult => {
  const message = `Enter a number between ${min} and ${max}.`;

  if (typeof value !== 'number' || Number.isNaN(value)) {
    return { isValid: false, message };
  }
  if (value < min || value > max) {
    return { isValid: false, message };
  }
  return { isValid: true };
};

export const isValidNumberInRange512 = (value: number): ValidatorResult => {
  return isValidNumberInRange(value, 0, 512);
};
export const isValidNumberInRange256 = (value: number): ValidatorResult => {
  return isValidNumberInRange(value, 0, 256);
};

export const isValidNumberInRange200 = (value: number): ValidatorResult => {
  return isValidNumberInRange(value, 0, 200);
};
export const isValidNumberInRange100 = (value: number): ValidatorResult => {
  return isValidNumberInRange(value, 0, 100);
};

export const isValidNumberInRange10 = (value: number): ValidatorResult => {
  return isValidNumberInRange(value, 0, 10);
};

export const isValidGoogleFontURL = (url: string): ValidatorResult => {
  if (!url || url.trim() === '') {
    return { isValid: false, message: 'URL cannot be empty.' };
  }

  try {
    const parsedURL = new URL(url);

    if (
      !parsedURL.hostname.endsWith('fonts.googleapis.com') &&
      !parsedURL.hostname.endsWith('fonts.gstatic.com')
    ) {
      return {
        isValid: false,
        message: 'Hostname is not a Google Fonts domain.',
      };
    }

    if (parsedURL.protocol !== 'http:' && parsedURL.protocol !== 'https:') {
      return { isValid: false, message: 'Protocol must be HTTP or HTTPS.' };
    }

    if (!parsedURL.pathname.startsWith('/css') && !parsedURL.pathname.startsWith('/earlyaccess')) {
      if (!parsedURL.hostname.endsWith('fonts.gstatic.com')) {
        return {
          isValid: false,
          message: 'Path is not a typical Google Fonts CSS path.',
        };
      }
    }

    if (parsedURL.hostname.endsWith('fonts.googleapis.com')) {
      if (!parsedURL.searchParams.has('family')) {
        return {
          isValid: false,
          message: "URL does not contain the 'family' parameter.",
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: 'Invalid URL format.' };
  }
};
