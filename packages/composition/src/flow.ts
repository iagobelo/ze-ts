import { UnknownFn, Fn } from './types';

// prettier-ignore
interface Flow {
  <A, B>(fn1: Fn<A, B>): (value: A) => B;
  <A, B, C>(fn1: Fn<A, B>, fn2: Fn<B, C>): (value: A) => C;
  <A, B, C, D>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>): (value: A) => D;
  <A, B, C, D, E>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>): (value: A) => E;
  <A, B, C, D, E, F>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>): (value: A) => F;
  <A, B, C, D, E, F, G>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>): (value: A) => G;
  <A, B, C, D, E, F, G, H>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>): (value: A) => H;
  <A, B, C, D, E, F, G, H, I>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>): (value: A) => I;
  <A, B, C, D, E, F, G, H, I, J>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>): (value: A) => J;
  <A, B, C, D, E, F, G, H, I, J, K>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>): (value: A) => K;
  <A, B, C, D, E, F, G, H, I, J, K, L>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>): (value: A) => L;
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>): (value: A) => M;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>): (value: A) => N;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>): (value: A) => O;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>, fn15: Fn<O, P>): (value: A) => P;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>, fn15: Fn<O, P>, fn16: Fn<P, Q>): (value: A) => Q;
  __tag: 'flow';
}

/**
 * Compose a list of functions from left to right. The first function can take any
 * number of arguments and the rest must take one argument.
 * @param fns - The list of functions to compose.
 * @returns A function that takes a value and applies the functions to it.
 */
const flow: Flow =
  (...fns: UnknownFn[]) =>
  (value: unknown): unknown => {
    if (fns.length === 0) return value;

    const [firstFn, ...restFns] = fns;
    const result = firstFn(value);

    return flow(...(restFns as [UnknownFn]))(result);
  };

flow.__tag = 'flow';

export default flow;
