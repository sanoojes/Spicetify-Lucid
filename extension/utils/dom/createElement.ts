export type CreateElementOptions<T extends keyof HTMLElementTagNameMap | string = 'div'> =
  | {
      [key in keyof (T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : HTMLElement)]?: (T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : HTMLElement)[key];
    }
  | {
      style?: Partial<CSSStyleDeclaration>;
      attributes?: Partial<Record<string, string>>;
      [key: string]: any;
    };

export function createElement<T extends keyof HTMLElementTagNameMap | string = 'div'>(
  tag: T,
  options?: CreateElementOptions<T>
) {
  const element = document.createElement(tag) as T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : HTMLElement;

  if (!options) return element;

  if (options.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      if (value) element.setAttribute(key, value);
      else element.removeAttribute(key);
    }
  }

  if (options.style) Object.assign(element.style, options.style);

  const { style, attributes, ...rest } = options;
  Object.assign(element, rest);

  return element;
}
