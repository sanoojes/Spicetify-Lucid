import { deepmerge } from 'deepmerge-ts';

type Subscriber<T> = (state: T) => void;
type Reducer<T> = (state: T, payload?: unknown) => T;

interface StoreOptions {
  persist?: boolean;
  localStorageKey?: string;
}

type StringPath<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${Prefix}${K}` | StringPath<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

type Path<T> = StringPath<T>;

interface KeyWiseSubscriber<T> {
  subscriber: Subscriber<T>;
  path?: Path<T>;
}

function getValueByPath<T extends object>(obj: T, path?: Path<T>): unknown {
  if (!path) return obj;

  const pathSegments = (path as string).split(/[.\[\]'"]/).filter(Boolean);
  let current: any = obj;
  for (const segment of pathSegments) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }
  return current;
}

function shallowCompareObjects(objA: any, objB: any): boolean {
  if (objA === objB) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null)
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key) || objA[key] !== objB[key]) return false;
  }

  return true;
}

class Store<T extends object> {
  private state: T;
  private subscribers: KeyWiseSubscriber<T>[] = [];
  private options: StoreOptions;

  constructor(initialState: T, options: StoreOptions = {}) {
    this.options = {
      persist: false,
      localStorageKey: 'storeState',
      ...options,
    };

    if (this.options.persist && this.options.localStorageKey) {
      const storedState = localStorage.getItem(this.options.localStorageKey);

      if (!storedState) {
        this.state = initialState;
        return;
      }

      try {
        const parsedState = JSON.parse(storedState);
        this.state = deepmerge(initialState, parsedState) as T;
      } catch (error) {
        console.error('Error parsing stored state from localStorage:', error);
        this.state = initialState; // Fallback to initial state
      }
    } else {
      this.state = initialState;
    }
  }
  public getState(): T {
    return this.state;
  }

  public setState(reducer: Reducer<T>, payload?: unknown): void {
    const oldState = { ...this.state };
    const newState = reducer(this.state, payload);
    this.updateStateAndNotify(newState, oldState);
  }

  private updateStateAndNotify(newState: T, oldState: T): void {
    if (newState !== this.state) {
      this.state = newState;
      this.notifySubscribers(oldState);

      if (this.options.persist) {
        this.persist();
      }
    }
  }

  public subscribe(subscriber: Subscriber<T>, path?: Path<T>): () => void {
    const keyWiseSubscriber: KeyWiseSubscriber<T> = { subscriber, path };
    this.subscribers.push(keyWiseSubscriber);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== keyWiseSubscriber);
    };
  }

  private notifySubscribers(oldState: T): void {
    for (const sub of this.subscribers) {
      const { subscriber, path } = sub;

      const oldValue = getValueByPath(oldState, path);
      const newValue = getValueByPath(this.state, path);

      if (!shallowCompareObjects(oldValue, newValue)) {
        const start = performance.now();

        try {
          subscriber(this.state);
        } catch (error) {
          console.error(`Subscriber at path "${path}" threw an error:`, error);
        }

        const duration = performance.now() - start;

        if (duration > 10) {
          console.warn(
            `Slow subscriber at path "${path}" took ${duration.toFixed(2)}ms. Subscriber: ${subscriber}`
          );
        }
      }
    }
  }

  private persist(): void {
    try {
      if (this.options.localStorageKey) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(this.state));
      } else {
        console.warn('localStorageKey is not defined, skipping persistence.');
      }
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }
}

export default Store;
