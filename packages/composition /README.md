# @ze-ts/composition

This package provides a set of utilities to help you compose your functions.

## Installation

```bash
npm install @ze-ts/composition
```

## Usage

### pipe
Pipe is a function with arity `n` that the first argument is a value and the rest are functions that will be applied to the value in sequence.

#### Signature

```typescript
pipe: (value: any, ...fns: Function[]) => any
```

#### Example

```typescript
import { pipe } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const addAndMultiply = pipe(add(3), multiply(2));
```

### flow
Flow is a function with arity `n` that takes a list of functions and returns a new function that receives a value and applies the functions in sequence.

#### Signature

```typescript
flow: (...fns: Function[]) => (value: any) => any
```

#### Example

```typescript
import { flow } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const addAndMultiply = flow(add(3), multiply(2));
```

### compose
Compose is a function with arity `n` that takes a list of functions and returns a new function that receives a value and applies the functions in reverse order (rigth-to-left). 

#### Signature

```typescript
// fns will be applied in reverse order
compose: (...fns: Function[]) => (value: any) => any
```

#### Example

```typescript
import { compose } from '@ze-ts/composition';

const add = (a: number) => (b: number) => a + b;
const multiply = (a: number) => (b: number) => a * b;

const addAndMultiply = compose(multiply(2), add(3));

addAndMultiply(2, 3); // 8
```
