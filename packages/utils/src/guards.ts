/**
 * Checks if the given value is a promise.
 * @param value - function to check.
 * @returns true if value is a promise.
 */
export const isPromise = (value: any): value is Promise<unknown> =>
  Boolean(Boolean(value) && typeof value.then === 'function');

/**
 * Checks if the given value is a function.
 * @param value - function to check.
 * @returns true if fn is a function.
 */
export const isFunction = (value: any): value is (a: any) => any =>
  Boolean(value) && typeof value === 'function';
