const originalConsoleLog = console.log;

const logStyles = {
  prefix: 'font-weight: bold; color: #4DB6AC; font-size: 0.85rem;',
  error: 'color: #dc3545;',
  warn: 'color: #ffc107;',
};

type LogLevel = 'info' | 'error' | 'warn';

type LogOptions = {
  level?: LogLevel;
  styles?: string;
};

export const logToConsole = (
  message: string,
  options: LogOptions = {},
  ...optionalParams: unknown[]
) => {
  const { level = 'info', styles = '' } = options;

  let messageStyle = styles;

  switch (level) {
    case 'error':
      messageStyle = `${logStyles.error} ${styles}`;
      break;
    case 'warn':
      messageStyle = `${logStyles.warn} ${styles}`;
      break;
    default:
      break;
  }

  originalConsoleLog(
    `%c[Lucid] %c${message}`,
    logStyles.prefix,
    messageStyle,
    ...optionalParams
  );
};
