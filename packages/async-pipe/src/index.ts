import { isFunction, isPromise } from '@ze-ts/utils';

/**
 * A type that represents a function that takes a value of type `A` checks if it is a promise and if so unwraps it.
 *
 */
type Fn<A, B> = (a: A extends Promise<infer T> ? T : A) => B;

type UnknownFn = Fn<unknown, unknown>;

type AsyncPipeResultType<T extends unknown[]> = T extends [
  infer C,
  ...infer Rest
]
  ? C extends Promise<unknown>
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Promise<Rest extends [...infer A, infer LastType] ? LastType : never>
    : Rest extends [infer A]
    ? A
    : AsyncPipeResultType<Rest>
  : never;

// prettier-ignore
interface PipeAsync {
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
export const pipeAsync: PipeAsync = (
  ...[value, fn, ...fns]: [unknown, ...UnknownFn[]]
) => {
  if (isFunction(fn)) {
    const nextValue = isPromise(value) ? value.then(fn) : fn(value);
    return pipeAsync(nextValue, ...(fns as [UnknownFn]));
  }

  return value;
};

pipeAsync.__tag = 'pipe-async';
