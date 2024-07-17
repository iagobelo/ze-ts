import { pipe } from '@ze-ts/composition';

interface ZTSPromise<T, E = unknown> extends Promise<T> {
  e?: E;
}

type Then = <A, B, E>(
  fn: (value: A) => ZTSPromise<B, E>
) => (promise: ZTSPromise<A, E>) => ZTSPromise<B, E>;

/**
 *
 * @param fn
 * @returns
 */
export const then: Then = fn => promise => promise.then(fn);

type Map = <I, O, E>(
  fn: (value: I) => O
) => (promise: ZTSPromise<I, E>) => ZTSPromise<O, E>;

/**
 *
 * @param fn
 * @returns
 */
export const map: Map = fn => promise => promise.then(fn);

type Catch = <I, E>(
  fn: (e: E) => I
) => (promise: ZTSPromise<I, E>) => ZTSPromise<I, E>;

export const pCatch: Catch = fn => promise => promise.catch(fn);

type Finally = <T, E>(
  fn: () => T
) => (promise: ZTSPromise<T, E>) => ZTSPromise<T, E>;

export const pFinally: Finally = fn => promise => promise.finally(fn);

type CatchAndResolve = <T, E>(
  fn: (error: E) => T
) => (promise: ZTSPromise<T, E>) => ZTSPromise<T, E>;

export const catchAndResolve: CatchAndResolve = fn => promise =>
  promise.catch(error => Promise.resolve(fn(error)));

type TryCatch = <I, O, E>(
  tryer: (value: I) => O,
  onError: (error: E) => O
) => (promise: ZTSPromise<I, E>) => ZTSPromise<O, E>;

export const tryCatch: TryCatch = (tryer, onError) => promise =>
  promise.then(tryer).catch(onError);

// ---------------------------------------------

enum ErrorCodes {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_EMPTY = 'FILE_EMPTY',
}

const x = pipe(
  Promise.resolve(new File([], 'file_name')) as ZTSPromise<File, ErrorCodes>,
  then(value => Promise.resolve(`${value.name} is found`)),
  map(value => value.length),
  tryCatch(
    value => `${value} is the length`,
    error => error
  )
);
