// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// https://deno.land/std@0.177.0/async/debounce.ts

export interface DebouncedFunction<T extends Array<unknown>> {
  (...args: T): void;
  clear(): void;
  flush(): void;
  readonly pending: boolean;
}

// deno-lint-ignore no-explicit-any
export function debounce<T extends Array<any>>(
  fn: (this: DebouncedFunction<T>, ...args: T) => void,
  wait: number
): DebouncedFunction<T> {
  let timeout: number | null = null;
  let flush: (() => void) | null = null;

  const debounced: DebouncedFunction<T> = ((...args: T) => {
    debounced.clear();
    flush = () => {
      debounced.clear();
      fn.call(debounced, ...args);
    };
    timeout = setTimeout(flush, wait);
  }) as DebouncedFunction<T>;

  debounced.clear = () => {
    if (typeof timeout === 'number') {
      clearTimeout(timeout);
      timeout = null;
      flush = null;
    }
  };

  debounced.flush = () => {
    flush?.();
  };

  Object.defineProperty(debounced, 'pending', {
    get: () => typeof timeout === 'number',
  });

  return debounced;
}
