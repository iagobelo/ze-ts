import { isFunction, isPromise } from './guards';

describe('guards', () => {
  it('should check if a value is a promise', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(Promise.reject(new Error()))).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise({})).toBe(false);
    expect(isPromise(1)).toBe(false);
    expect(isPromise('1')).toBe(false);
    expect(isPromise(true)).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });

  it('should check if a value is a function', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(async function () {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('1')).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
  });
});
