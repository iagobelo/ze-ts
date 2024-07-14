import pipe from './pipe';

describe('Pipe', () => {
  it('should return the result of the composition', () => {
    const add = (a: number) => (b: number) => a + b;
    const multiplyBy = (a: number) => (b: number) => a * b;
    const subtractBy = (a: number) => (b: number) => a - b;

    const result = pipe(5, add(5), multiplyBy(2), subtractBy(3));

    expect(result).toBe(-17);
  });

  it('should work with different types', () => {
    const toUpperCase = (str: string) => str.toUpperCase();
    const getLength = (str: string) => str.length;
    const double = (num: number) => num * 2;

    const result = pipe('hello', toUpperCase, getLength, double);

    expect(result).toBe(10);
  });
});
