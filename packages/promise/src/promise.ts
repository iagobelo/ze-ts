// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ZTSPromise<T, E = Error> extends Promise<T> {}

/**
 * A function that converts a Promise to a ZTSPromise, which is a Promise with a type
 * parameter for the error or whatever the Promise rejects with.
 * @param promise - The Promise to convert.
 * @returns The Promise converted to a ZTSPromise.
 */
export const toZTSPromise = <T, E>(promise: Promise<T>): ZTSPromise<T, E> =>
  promise as ZTSPromise<T, E>;

type Then = <A, B, E>(
  fn: (value: A) => ZTSPromise<B, E>
) => (promise: ZTSPromise<A, E>) => ZTSPromise<B, E>;

/**
 * Works like Promise.prototype.then, but with some type safety. The callback
 * should always return a Promise. If you wat to "`map`" over the value, use the `map` function instead.
 *
 * @example
 * const x = pipe(
 *   Promise.resolve(new File([], 'file_name')),
 *   then(value => uploadFile(value)),
 *   pCatch(error => error.message),
 * );
 *
 * @param fn - The function to call when the Promise resolves.
 * @returns A function that takes a Promise and returns a new Promise.
 */
export const then: Then = fn => promise => promise.then(fn);

type Map = <I, O, E>(
  fn: (value: I) => O
) => (promise: ZTSPromise<I, E>) => ZTSPromise<O, E>;

/**
 * Works like Promise.prototype.then, but with some type safety. The callback
 * should always return a value, not a Promise. If you want to return a
 * Promise, use the `then` function instead.
 *
 * @example
 * const x = pipe(
 *   Promise.resolve(new File([], 'file_name')),
 *   then(value => Promise.resolve(`${value.name} is found`)),
 *   map(value => value.length),
 * );
 *
 * @param fn - The function to call when the Promise resolves.
 * @returns A function that takes a Promise and returns a new Promise.
 */
export const map: Map = fn => promise => promise.then(fn);

type Otherwise = <I, E>(
  fn: (e: E) => ZTSPromise<I, E> | I
) => (promise: ZTSPromise<I, E>) => ZTSPromise<I, E>;

/**
 * Works identicaly Promise.prototype.catch.
 * @param fn - The function to call when the Promise rejects.
 * @returns A function that takes a Promise and returns a new Promise.
 */
export const otherwise: Otherwise = fn => promise => promise.catch(fn);

type TryCatch = <I, O, E>(
  trier: (value: I) => O | ZTSPromise<O>,
  onError: (error: E) => O | ZTSPromise<O>
) => (promise: ZTSPromise<I, E>) => ZTSPromise<O, E>;

/**
 * Function that works like a try-catch block. The first argument is the function to try, and the
 * second argument is the function to call if an error occurs.
 *
 * @example
 * const x = pipe(
 *  Promise.resolve('hello'),
 *  tryCatch(
 *   value => {
 *    if (value === 'hello') throw new Error('Error');
 *    return value;
 *   },
 *   error => error.message,
 *  ),
 * );
 *
 * @param tryer
 * @param onError
 * @returns A function that takes a Promise and returns a new Promise.
 */
export const tryCatch: TryCatch = (tryer, onError) => promise =>
  promise.then(tryer).catch(onError);
