type TypeOf =
  | 'string'
  | 'number'
  | 'boolean'
  | 'bigint'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export function isCorrectType(type: TypeOf, value: unknown): boolean {
  // biome-ignore lint/suspicious/useValidTypeof: <explanation>
  if (typeof value !== type) {
    const message = `Type mismatch: Expected type '${type}', Received type: '${typeof value}', Value: ${value}`;
    console.warn(message);
    Spicetify?.showNotification(message, true, 5000);
    return false;
  }
  return true;
}
