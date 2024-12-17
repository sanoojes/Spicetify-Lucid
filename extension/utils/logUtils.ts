const originalLog = console.log;
const originalDebug = console.debug;
const originalError = console.error;
const originalWarn = console.warn;

type LogLevel = "info" | "error" | "debug" | "warn";

const logStyles: { [K in LogLevel]: string } & { prefix: string } = {
	prefix: "font-weight: bold; color: #4DB6AC; font-size: 0.85rem;",
	error: "color: #dc3545;",
	warn: "color: #ffc107;",
	debug: "color: #17a2b8;",
	info: "",
};

export const logWithLevel = (level: LogLevel, message: unknown, ...optionalParams: unknown[]) => {
	const logFn = {
		info: originalLog,
		debug: originalDebug,
		error: originalError,
		warn: originalWarn,
	}[level];

	const levelStyle = logStyles[level];

	logFn(`%c[Lucid] %c${message}`, logStyles.prefix, levelStyle, ...optionalParams);
};

export const logInfo = (message: unknown, ...optionalParams: unknown[]) =>
	logWithLevel("info", message, ...optionalParams);
export const logDebug = (message: unknown, ...optionalParams: unknown[]) =>
	logWithLevel("debug", message, ...optionalParams);
export const logError = (message: unknown, ...optionalParams: unknown[]) =>
	logWithLevel("error", message, ...optionalParams);
export const logWarn = (message: unknown, ...optionalParams: unknown[]) =>
	logWithLevel("warn", message, ...optionalParams);
