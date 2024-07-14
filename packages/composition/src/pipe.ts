import { UnknownFn, Fn } from './types';
import flow from './flow';

// prettier-ignore
interface Pipe {
  <A, B>(value: A, fn1: Fn<A, B>): B;
  <A, B, C>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>): C;
  <A, B, C, D>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>): D;
  <A, B, C, D, E>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>): E;
  <A, B, C, D, E, F>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>): F;
  <A, B, C, D, E, F, G>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>): G;
  <A, B, C, D, E, F, G, H>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>): H;
  <A, B, C, D, E, F, G, H, I>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>): I;
  <A, B, C, D, E, F, G, H, I, J>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>): J;
  <A, B, C, D, E, F, G, H, I, J, K>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>): K;
  <A, B, C, D, E, F, G, H, I, J, K, L>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>): L;
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>): M;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>): N;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>): O;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>, fn15: Fn<O, P>): P;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(value: A, fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>, fn4: Fn<D, E>, fn5: Fn<E, F>, fn6: Fn<F, G>, fn7: Fn<G, H>, fn8: Fn<H, I>, fn9: Fn<I, J>, fn10: Fn<J, K>, fn11: Fn<K, L>, fn12: Fn<L, M>, fn13: Fn<M, N>, fn14: Fn<N, O>, fn15: Fn<O, P>, fn16: Fn<P, Q>): Q;
  __tag: 'pipe';
}

/**
 * This function takes a value and a list of functions and applies the functions
 * to the value from left to right.
 *
 * @returns The result of the composition.
 */
const pipe: Pipe = (value: unknown, ...fns: UnknownFn[]) =>
  flow(...(fns as [UnknownFn]))(value);

pipe.__tag = 'pipe';

export default pipe;
