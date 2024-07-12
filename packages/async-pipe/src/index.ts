import { isFunction, isPromise } from '@ze-ts/utils';

/**
 * A type that represents a function that takes a value of
 * type `A` checks if it is a promise and if so unwraps it.
 */
type Fn<A, B> = (a: A extends Promise<infer T> ? T : A) => B;

/**
 * A type alias for a function that takes an unknown value
 * and returns an unknown value.
 */
type UnknownFn = Fn<unknown, unknown>;

/**
 * A type that represents the result of a pipeAsync call.
 * It will be the last type in the list of functions.
 * If the last function returns a promise, the result will
 * be the type of the promise.
 * @example
 * pipeAsync(1, (v) => v + 1, (v) => v + 2, (v) => Promise.resolve(v + 3)) // will return a Promise<number> with the value 7
 * @example
 * pipeAsync(1, (v) => v + 1, (v) => v + 2, (v) => v + 3) // will return a number with the value 6
 */
type AsyncPipeResultType<T extends unknown[]> = T extends [
  infer C,
  ...infer Rest
]
  ? C extends Promise<unknown>
    ? Promise<Rest extends [...infer A, infer LastType] ? LastType : never>
    : Rest extends [infer A]
    ? A
    : AsyncPipeResultType<Rest>
  : never;

interface PipeAsyncThis {
  __callCount?: number;
}

/**
 * A type that represents a pipeAsync function.
 * It takes a value and a list of functions and returns
 * the result of the composition of the functions.
 * @example
 * pipeAsync(1, (v) => v + 1, (v) => v + 2, (v) => v + 3) // 7
 */
// prettier-ignore
interface PipeAsync extends PipeAsyncThis {
  <A, B>(v: A, fn1: Fn<A, B>): AsyncPipeResultType<[A, B]>;
  <A, B, C>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>): AsyncPipeResultType<[A, B, C]>;
  <A, B, C, D>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>): AsyncPipeResultType<[A, B, C, D]>;
  <A, B, C, D, E>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>): AsyncPipeResultType<[A, B, C, D, E]>;
  <A, B, C, D, E, F>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>): AsyncPipeResultType<[A, B, C, D, E, F]>;
  <A, B, C, D, E, F, G>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>): AsyncPipeResultType<[A, B, C, D, E, F, G]>;
  <A, B, C, D, E, F, G, H>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>): AsyncPipeResultType<[A, B, C, D, E, F, G, H]>;
  <A, B, C, D, E, F, G, H, I>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>): AsyncPipeResultType<[A, B, C, D, E, F, G, H, I]>;
  <A, B, C, D, E, F, G, H, I, J>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>): AsyncPipeResultType<[A, B, C, D, E, F, G, H, I, J]>;
  <A, B, C, D, E, F, G, H, I, J, K>(v: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>): AsyncPipeResultType<[A, B, C, D, E, F, G, H, I, J, K]>;
  
  __tag: 'pipe-async';
}

/**
 * Composes a list of functions from right to left. These functions can be
 * synchronous or asynchronous (promises).
 * @param params - The list of functions to compose. The first argument should be a value.
 * @returns The result of the composition.
 */
const pipeAsync: PipeAsync = function (
  this: PipeAsyncThis,
  ...[value, fn, ...fns]: [unknown, ...UnknownFn[]]
) {
  if (isFunction(fn)) {
    const nextValue = isPromise(value) ? value.then(fn) : fn(value);
    return pipeAsync.apply({ __callCount: (this?.__callCount ?? 0) + 1 }, [
      nextValue,
      ...fns,
    ]);
  }

  return value;
};

pipeAsync.__tag = 'pipe-async';

export default pipeAsync;
