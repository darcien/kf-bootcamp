// @flow

import {ensureStringArray, ensureArrayOf} from '../ensureArray';

describe('the ensureStringArray function', () => {
  it('should return empty array except for array of string', () => {
    expect(ensureStringArray()).toEqual([]);
    expect(ensureStringArray(null)).toEqual([]);
    expect(ensureStringArray(0)).toEqual([]);
    expect(ensureStringArray('a')).toEqual([]);
    expect(ensureStringArray({a: 'b'})).toEqual([]);
  });
  it('should return filtered input', () => {
    let input = ['ab', 123, 'ac'];
    let result = ['ab', 'ac'];
    expect(ensureStringArray(input)).toEqual(result);
  });
  it('should return the input', () => {
    let array = ['ab', 'ac'];
    expect(ensureStringArray(array)).toEqual(array);
  });
});

describe('the ensureArrayOf function', () => {
  it('should return the same type', () => {
    expect(ensureArrayOf(null, (x: mixed) => Number(x))).toEqual([]);
    expect(
      ensureArrayOf([12, 3, 123, 12, 31, 23, 12], (x: mixed) => Number(x)),
    ).toEqual([12, 3, 123, 12, 31, 23, 12]);
    expect(ensureArrayOf(['a', 1], (x: mixed) => String(x))).toEqual([
      'a',
      '1',
    ]);
    expect(
      ensureArrayOf([true, false, 'true'], (x: mixed) => Boolean(x)),
    ).toEqual([true, false, true]);
  });
});
