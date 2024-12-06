import React, { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window !== "undefined") {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		}
		return initialValue;
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
};
