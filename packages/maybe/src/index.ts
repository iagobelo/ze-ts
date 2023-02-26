interface None {
  __id: 'none';
}

interface Some<T> {
  value: T;
  __id: 'some';
}

export const some = <T>(value: T): Some<T> => ({
  __id: 'some',
  value,
});

export const isSome = <T>(maybe: Maybe<T>): maybe is Some<T> =>
  maybe.__id === 'some';

export const NONE: None = { __id: 'none' } as const;

export const isNone = <T>(maybe: Maybe<T>): maybe is None =>
  maybe.__id === 'none';

type Maybe<T> = None | Some<T>;

type Predicate<T> = (value: T) => boolean;

type Mapper<A, B> = (value: A) => B;

export const fromNullable = <T>(value: T): Maybe<T> =>
  value ? some(value) : NONE;

export const fromPredicate =
  <T>(predicate: Predicate<T>) =>
  (value: T): Maybe<T> =>
    predicate(value) ? some(value) : NONE;

type MMap = <A, B>(mapper: Mapper<A, B>) => (maybe: Maybe<A>) => Maybe<B>;

export const map: MMap = mapper => maybe =>
  isSome(maybe) ? some(mapper(maybe.value)) : maybe;

type Chain = <A, B>(fn: (a: A) => Maybe<B>) => (maybe: Maybe<A>) => Maybe<B>;

export const chain: Chain = fn => maybe =>
  isSome(maybe) ? fn(maybe.value) : maybe;
