type DebouncedFunction<T extends unknown[], U> = (...args: T) => void;

export const debounce = <T extends unknown[], U>(fn: (...args: T) => U, delay: number): DebouncedFunction<T, U> => {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return (...args: T): void => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};
