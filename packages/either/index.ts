interface Right<R> {
  readonly id: 'right';
  value: R;
}

interface Left<L> {
  readonly id: 'left';
  value: L;
}

type Either<R, L> = Right<R> | Left<L>;

type Chain = <R, L>(
  fn: (value: R) => Either<R, L>
) => (either: Either<R, L>) => Either<R, L>;

type MapRight = <R, L, R2>(
  fn: (left: R) => Either<R2, L>
) => (either: Either<R, L>) => Either<R2, L>;

type MapLeft = <R, L, L2>(
  fn: (value: L) => Either<R, L2>
) => (either: Either<R, L>) => Either<R, L2>;

type FromPredicate = <A, L>(
  predicate: (value: A) => boolean,
  onLeft: (value: A) => L
) => (value: A) => Either<A, L>;

type GetOrElse = <R, L>(onLeft: (value: L) => R) => (either: Either<R, L>) => R;

export const right = <R>(value: R): Right<R> => ({
  id: 'right',
  value,
});

export const left = <L>(value: L): Left<L> => ({
  id: 'left',
  value,
});

export const mapLeft: MapLeft = fn => either =>
  either.id === 'left' ? fn(either.value) : either;

export const mapRight: MapRight = fn => either =>
  either.id === 'right' ? fn(either.value) : either;

export const fromPredicate: FromPredicate = (predicate, onLeft) => value =>
  predicate(value) ? right(value) : left(onLeft(value));

export const getOrElse: GetOrElse = onLeft => either =>
  either.id === 'left' ? onLeft(either.value) : either.value;

export const chain: Chain = fn => either =>
  either.id === 'left' ? either : fn(either.value);
