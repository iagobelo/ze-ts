/**
 * A type alias for a function that takes a value of type `A`
 * and returns a value of type `B`.
 */
export type Fn<A, B> = (a: A) => B;

/**
 * A type that represents a function that takes a value of
 * type `A` checks if it is a promise and if so unwraps it.
 */
export type UnwrapPromiseFn<A, B> = (
  a: A extends Promise<infer T> ? T : A
) => B;

/**
 * A type alias for a function that takes an unknown value
 * and returns an unknown value.
 */
export type UnknownFn = UnwrapPromiseFn<unknown, unknown>;
