# @ze-ts/promise

A collection of utility functions to work with Promises.

## Installation

```bash
npm install @ze-ts/promise
```

## Usage

### Note

#### ZTSPromise

ZTSPromise is a type alias for a Promise that can resolve to a value of type `T` or reject with an error of type `E`. This is useful to work with the two sides of a Promise.

```typescript
type ZTSPromise<T, E> = Promise<T>;
```

### then

A curried function that takes a function and a Promise and returns a new Promise that will resolve to the result of applying the function to the resolved value of the original Promise. For legibility and semantic reasons, the type of this function enforces that the function passed to it returns a ZTSPromise. If you want to manipulate the value directly, use the `map` function instead.

#### Signature

```typescript
then: <A, B, E>(fn: (value: A) => ZTSPromise<B, E>) =>
  (promise: ZTSPromise<A, E>) =>
    ZTSPromise<B, E>;
```

#### Example

##### Usage with pipe

```typescript
import { then } from '@ze-ts/promise';
import { pipe } from '@ze-ts/composition';

const add = (a: number) => (b: number) => Promise.resolve(a + b);
const multiply = (a: number) => (b: number) => Promise.resolve(a * b);

const add3 = add(3); // (b: number) => Promise<number>
const multiply2 = multiply(2); // (b: number) => Promise<number>
const promise = Promise.resolve(2); // Promise<2>

const result = await pipe(promise, then(add3), then(multiply2)); // Promise<10>
```

### map

A curried function that takes a function and a Promise and returns a new Promise that will resolve to the result of applying the function to the resolved value of the original Promise. This function is useful when you want to manipulate the value directly, without wrapping it in a Promise. As mentioned in the `then` function, the type of the function passed to it enforces that the function returns a value of type `O`. If you want to return a Promise, use the `then` function instead.

#### Signature

```typescript
map: <I, O, E>(fn: (value: I) => O) =>
  (promise: ZTSPromise<I, E>) =>
    ZTSPromise<O, E>;
```

#### Example

##### Usage with pipe

```typescript
import { map } from '@ze-ts/promise';
import { pipe } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const add3 = add(3); // (b: number) => number
const multiply2 = multiply(2); // (b: number) => number
const promise = Promise.resolve(2); // Promise<2>

const result = pipe(promise, map(add3), map(multiply2)); // Promise<10>
```

### otherwise

A curried function that takes a function and a Promise and returns a new Promise that will resolve to the result of applying the function to the rejected value of the original Promise. This function is useful when you want to handle errors in a Promise chain.

#### Signature

```typescript
type Otherwise = <I, E>(
  fn: (e: E) => ZTSPromise<I, E> | I
) => (promise: ZTSPromise<I, E>) => ZTSPromise<I, E>;
```

#### Example

##### Usage with pipe

```typescript
import { otherwise } from '@ze-ts/promise';
import { pipe } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const add3 = add(3); // (b: number) => number
const multiply2 = multiply(2); // (b: number) => number
const promise = Promise.reject('error'); // Promise<error>

const result = pipe(
  promise,
  otherwise(error => Promise.resolve(0))
); // Promise<0>
```

### tryCatch

A curried function that takes two functions and a Promise and returns a new Promise that will resolve to the result of applying the first function to the resolved value of the original Promise or the result of applying the second function to the rejected value of the original Promise. This function is useful when you want to handle errors in a Promise chain.

#### Signature

```typescript
type TryCatch = <I, O, E>(
  trier: (value: I) => O | ZTSPromise<O>,
  onError: (error: E) => O | ZTSPromise<O>
) => (promise: ZTSPromise<I, E>) => ZTSPromise<O, E>;
```

#### Example

##### Usage with pipe

```typescript
import { otherwise } from '@ze-ts/promise';
import { pipe } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const add3 = add(3); // (b: number) => number
const multiply2 = multiply(2); // (b: number) => number

const promise = Promise.reject('error'); // Promise<error>

const result = pipe(
  promise,
  otherwise(
    () => Promise.resolve(0),
    error => Promise.resolve(error)
  )
); // Promise<0>
```
