import compose from './compose';

describe('Compose', () => {
  it('should apply a single function', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;

    const composed = compose(double);
    expect(composed(2)).toBe(4);

    const composed2 = compose(addOne);
    expect(composed2(2)).toBe(3);
  });

  it('should apply multiple functions in order', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;
    const square = (x: number) => x * x;

    const composed = compose(double, addOne, square);
    expect(composed(2)).toBe(10);

    const composed2 = compose(addOne, square, double);
    expect(composed2(2)).toBe(17);
  });

  it('should handle different argument and return types', () => {
    const toUpperCase = (str: string) => str.toUpperCase();
    const getLength = (str: string) => str.length;
    const isEven = (num: number) => num % 2 === 0;

    const composed = compose(isEven, getLength, toUpperCase);

    expect(composed('hello')).toBe(false);
  });
});
