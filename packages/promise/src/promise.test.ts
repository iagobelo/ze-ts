import { then, map, otherwise, tryCatch } from './promise';

describe('Promise', () => {
  it('then() - should resolve with the correct value', async () => {
    const result = await then((value: string) => Promise.resolve(value.length))(
      Promise.resolve('Hello, World!')
    );

    expect(result).toBe(13);
  });

  it('then() - should reject with the correct error', async () => {
    const result = await then((value: string) =>
      Promise.reject(new Error(value))
    )(Promise.resolve('Something went wrong')).catch(
      (error: Error) => error.message
    );

    expect(result).toBe('Something went wrong');
  });

  it('map() - should resolve with the correct value', async () => {
    const result = await map((value: string) => value.length)(
      Promise.resolve('Hello, World!')
    );

    expect(result).toBe(13);
  });

  it('map() - should reject with the correct error', async () => {
    const result = await map((value: string) => {
      throw new Error(value);
    })(Promise.resolve('Something went wrong')).catch(
      (error: Error) => error.message
    );

    expect(result).toBe('Something went wrong');
  });

  it('otherwise() - should resolve with the correct value', async () => {
    const result = await otherwise((error: Error) => error.message)(
      Promise.reject(new Error('Something went wrong'))
    );

    expect(result).toBe('Something went wrong');
  });

  it('otherwise() - should reject with the correct error', async () => {
    const result = await otherwise((error: Error) => {
      throw new Error(error.message);
    })(Promise.reject(new Error('Something went wrong'))).catch(
      (error: Error) => error.message
    );

    expect(result).toBe('Something went wrong');
  });

  it('tryCatch() - should resolve with the correct value', async () => {
    const result = await tryCatch(
      (value: string) => Promise.resolve(value),
      (error: Error) => Promise.resolve(error.message)
    )(Promise.resolve('Hello, World!'));

    expect(result).toBe('Hello, World!');
  });
});
