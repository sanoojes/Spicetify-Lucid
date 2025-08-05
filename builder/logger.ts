const RESET = '\x1b[0m';
const COLORS = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[32m', // Green
  WARN: '\x1b[33m', // Yellow
  ERROR: '\x1b[31m', // Red
} as const;

const CONSOLE_METHODS = {
  DEBUG: console.debug,
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
} as const;

const Logger = {
  log(level: keyof typeof COLORS, msg: string, ...args: unknown[]) {
    const color = COLORS[level];
    const time = new Date().toISOString();
    const consoleMethod = CONSOLE_METHODS[level] || console.log;

    consoleMethod(
      `${color}[${level}]${RESET} ${level === 'INFO' || level === 'WARN' ? ' ' : ''}${time} - ${msg}`,
      ...args
    );

    if (level === 'ERROR') {
      for (const arg of args) {
        if (arg instanceof Error) {
          consoleMethod(arg.stack);
        }
      }
    }
  },

  debug(msg: string, ...args: unknown[]) {
    this.log('DEBUG', msg, ...args);
  },
  info(msg: string, ...args: unknown[]) {
    this.log('INFO', msg, ...args);
  },
  warn(msg: string, ...args: unknown[]) {
    this.log('WARN', msg, ...args);
  },
  error(msg: string, ...args: unknown[]) {
    this.log('ERROR', msg, ...args);
  },
};

export default Logger;
