/* eslint-disable @typescript-eslint/explicit-function-return-type */
import pipeAsync from '../src/index';

describe('PipeAsync', () => {
  it('should return the correct result when composing synchronous functions', () => {
    const addOne = (v: number) => v + 1;
    const double = (v: number) => v * 2;
    const subtractThree = (v: number) => v - 3;

    const result = pipeAsync(1, addOne, double, subtractThree);

    expect(result).toBe(1);
  });

  it('should return the correct result when composing asynchronous functions', async () => {
    const addOneAsync = async (v: number) => v + 1;
    const doubleAsync = async (v: number) => v * 2;
    const subtractThreeAsync = async (v: number) => v - 3;

    const result = await pipeAsync(
      1,
      addOneAsync,
      doubleAsync,
      subtractThreeAsync
    );

    expect(result).toBe(1);
  });

  it('should return the correct result when composing a mix of synchronous and asynchronous functions', async () => {
    const addOne = (v: number) => v + 1;
    const doubleAsync = async (v: number) => v * 2;
    const subtractThree = (v: number) => v - 3;

    const result = await pipeAsync(1, addOne, doubleAsync, subtractThree);

    expect(result).toBe(1);
  });

  it('should return the correct result when the input value is a promise', async () => {
    const addOne = (v: number) => v + 1;
    const double = (v: number) => v * 2;
    const subtractThree = (v: number) => v - 3;

    const result = await pipeAsync(
      Promise.resolve(1),
      addOne,
      double,
      subtractThree
    );

    expect(result).toBe(1);
  });
});
