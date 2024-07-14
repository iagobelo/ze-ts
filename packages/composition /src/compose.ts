import type { UnknownFn, Fn } from './types';
import flow from './flow';

// prettier-ignore
interface Compose {
  <B, A>(fn1: Fn<A, B>): (value: A) => B;
  <C, B, A>(fn1: Fn<B, C>, fn2: Fn<A, B>): (value: A) => C;
  <D, C, B, A>(fn1: Fn<C, D>, fn2: Fn<B, C>, fn3: Fn<A, B>): (value: A) => D;
  <E, D, C, B, A>(fn1: Fn<D, E>, fn2: Fn<C, D>, fn3: Fn<B, C>, fn4: Fn<A, B>): (value: A) => E;
  <F, E, D, C, B, A>(fn1: Fn<E, F>, fn2: Fn<D, E>, fn3: Fn<C, D>, fn4: Fn<B, C>, fn5: Fn<A, B>): (value: A) => F;
  <G, F, E, D, C, B, A>(fn1: Fn<F, G>, fn2: Fn<E, F>, fn3: Fn<D, E>, fn4: Fn<C, D>, fn5: Fn<B, C>, fn6: Fn<A, B>): (value: A) => G;
  <H, G, F, E, D, C, B, A>(fn1: Fn<G, H>, fn2: Fn<F, G>, fn3: Fn<E, F>, fn4: Fn<D, E>, fn5: Fn<C, D>, fn6: Fn<B, C>, fn7: Fn<A, B>): (value: A) => H;
  <I, H, G, F, E, D, C, B, A>(fn1: Fn<H, I>, fn2: Fn<G, H>, fn3: Fn<F, G>, fn4: Fn<E, F>, fn5: Fn<D, E>, fn6: Fn<C, D>, fn7: Fn<B, C>, fn8: Fn<A, B>): (value: A) => I;
  <J, I, H, G, F, E, D, C, B, A>(fn1: Fn<I, J>, fn2: Fn<H, I>, fn3: Fn<G, H>, fn4: Fn<F, G>, fn5: Fn<E, F>, fn6: Fn<D, E>, fn7: Fn<C, D>, fn8: Fn<B, C>, fn9: Fn<A, B>): (value: A) => J;
  <K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<J, K>, fn2: Fn<I, J>, fn3: Fn<H, I>, fn4: Fn<G, H>, fn5: Fn<F, G>, fn6: Fn<E, F>, fn7: Fn<D, E>, fn8: Fn<C, D>, fn9: Fn<B, C>, fn10: Fn<A, B>): (value: A) => K;
  <L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<K, L>, fn2: Fn<J, K>, fn3: Fn<I, J>, fn4: Fn<H, I>, fn5: Fn<G, H>, fn6: Fn<F, G>, fn7: Fn<E, F>, fn8: Fn<D, E>, fn9: Fn<C, D>, fn10: Fn<B, C>, fn11: Fn<A, B>): (value: A) => L;
  <M, L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<L, M>, fn2: Fn<K, L>, fn3: Fn<J, K>, fn4: Fn<I, J>, fn5: Fn<H, I>, fn6: Fn<G, H>, fn7: Fn<F, G>, fn8: Fn<E, F>, fn9: Fn<D, E>, fn10: Fn<C, D>, fn11: Fn<B, C>, fn12: Fn<A, B>): (value: A) => M;
  <N, M, L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<M, N>, fn2: Fn<L, M>, fn3: Fn<K, L>, fn4: Fn<J, K>, fn5: Fn<I, J>, fn6: Fn<H, I>, fn7: Fn<G, H>, fn8: Fn<F, G>, fn9: Fn<E, F>, fn10: Fn<D, E>, fn11: Fn<C, D>, fn12: Fn<B, C>, fn13: Fn<A, B>): (value: A) => N;
  <O, N, M, L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<N, O>, fn2: Fn<M, N>, fn3: Fn<L, M>, fn4: Fn<K, L>, fn5: Fn<J, K>, fn6: Fn<I, J>, fn7: Fn<H, I>, fn8: Fn<G, H>, fn9: Fn<F, G>, fn10: Fn<E, F>, fn11: Fn<D, E>, fn12: Fn<C, D>, fn13: Fn<B, C>, fn14: Fn<A, B>): (value: A) => O;
  <P, O, N, M, L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<O, P>, fn2: Fn<N, O>, fn3: Fn<M, N>, fn4: Fn<L, M>, fn5: Fn<K, L>, fn6: Fn<J, K>, fn7: Fn<I, J>, fn8: Fn<H, I>, fn9: Fn<G, H>, fn10: Fn<F, G>, fn11: Fn<E, F>, fn12: Fn<D, E>, fn13: Fn<C, D>, fn14: Fn<B, C>, fn15: Fn<A, B>): (value: A) => P;
  <Q, P, O, N, M, L, K, J, I, H, G, F, E, D, C, B, A>(fn1: Fn<P, Q>, fn2: Fn<O, P>, fn3: Fn<N, O>, fn4: Fn<M, N>, fn5: Fn<L, M>, fn6: Fn<K, L>, fn7: Fn<J, K>, fn8: Fn<I, J>, fn9: Fn<H, I>, fn10: Fn<G, H>, fn11: Fn<F, G>, fn12: Fn<E, F>, fn13: Fn<D, E>, fn14: Fn<C, D>, fn15: Fn<B, C>, fn16: Fn<A, B>): (value: A) => Q;
  __tag: 'compose';
}

/**
 * Compose a list of functions from right to left.
 * @param fns - The list of functions to compose.
 * @returns The result of the composition.
 */
const compose: Compose = (...fns: UnknownFn[]) =>
  flow(...(fns.reverse() as [UnknownFn]));

compose.__tag = 'compose';

export default compose;
