import pipeAsync from './index';

describe('pipeAsync', () => {
  it('should work with promises', async () => {
    const result = await pipeAsync(
      1,
      v => v + 1,
      v => v + 1,
      v => Promise.resolve(v + 1),
      v => `${v}`
    );

    expect(result).toBe('4');
  });

  it('should work with no promises', async () => {
    const result = pipeAsync(
      1,
      v => v + 1,
      v => v + 1,
      v => `${v}`
    );

    expect(result).toBe('3');
  });
});
