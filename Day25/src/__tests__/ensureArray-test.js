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
  it('should return the input', () => {
    let array = ['ab', 'ac'];
    expect(ensureStringArray(array)).toEqual(array);
  });
});

describe('the ensureArrayOf function', () => {
  it('should return the same type', () => {
    expect(
      ensureArrayOf(null, (x: mixed) => (typeof x === 'number' ? x : 0)),
    ).toEqual([]);
    expect(
      ensureArrayOf(
        [12, 3, 123, 12, 31, 23, 12],
        (x: mixed) => (typeof x === 'number' ? x : 0),
      ),
    ).toEqual([12, 3, 123, 12, 31, 23, 12]);
    expect(
      ensureArrayOf(['a', 1], (x: mixed) => (typeof x === 'string' ? x : '')),
    ).toEqual(['a', '']);
    expect(
      ensureArrayOf(
        [true, false, 'true'],
        (x: mixed) => (typeof x === 'boolean' ? x : false),
      ),
    ).toEqual([true, false, false]);
  });
});
