export class LRUCache<K, V> {
  private max: number;
  private cache: Map<K, V>;

  constructor(max: number) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (!value) return undefined;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      const lruKey = this.cache.keys().next().value;
      if (lruKey) this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}
