export const createLogger = (prefix: string = '') => ({
  info: (...args: any[]) => console.log('[Lucid-Lyrics]', prefix, ...args),
  debug: (...args: any[]) => console.debug('[Lucid-Lyrics]', prefix, ...args),
  warn: (...args: any[]) => console.trace('[Lucid-Lyrics]', prefix, ...args),
  trace: (...args: any[]) => console.trace('[Lucid-Lyrics]', prefix, ...args),
  error: (...args: any[]) => console.error('[Lucid-Lyrics]', prefix, ...args),
});

export const logger = createLogger();
