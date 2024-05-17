"use client";

import { useMemo } from "react";

export const useDebounceCallback = (callback: Function, delay: number) => {
	const debouncedCallback = useMemo(() => {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				callback(...args);
			}, delay);
		};
	}, [callback, delay]);

	return debouncedCallback;
};
