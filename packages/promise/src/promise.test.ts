import {
  then,
  pCatch,
  tryCatch,
  map,
  catchAndResolve,
  pFinally,
} from './promise';

describe('ZTSPromise', () => {
  it('should resolve with the correct value', async () => {
    const result = await then((value: string) => Promise.resolve(value.length))(
      Promise.resolve('Hello, World!')
    );

    expect(result).toBe('Hello, World!');
  });

  it('pCatch() - should reject with the correct error', async () => {
    const result = await pCatch((error: Error) =>
      Promise.resolve(error.message)
    )(Promise.reject(new Error('Something went wrong')));

    expect(result).toBe('Something went wrong');
  });

  it('map() - should resolve with the correct value', async () => {
    const result = await map((value: string) => value.length)(
      Promise.resolve('Hello, World!')
    );

    expect(result).toBe('Hello, World!');
  });

  it('catchAndResolve() - should resolve with the correct value', async () => {
    const result = await catchAndResolve((error: Error) => error.message)(
      Promise.reject(new Error('Something went wrong'))
    );

    expect(result).toBe('Something went wrong');
  });

  it('tryCatch() - should resolve with the correct value', async () => {
    const result = await tryCatch(
      (value: string) => value.length,
      (error: Error) => error.message
    )(Promise.resolve('Hello, World!'));

    expect(result).toBe('Hello, World!');
  });
});
