import isEqual from '../isEqual';

it('should compare different types', () => {
  expect(isEqual(1, '1')).toEqual(false);
  expect(isEqual(1, undefined)).toEqual(false);
  expect(isEqual([1], ['1'])).toEqual(false);
  expect(isEqual([], {})).toEqual(false);
  expect(isEqual({}, null)).toEqual(false);
});

it('should compare same types', () => {
  expect(isEqual(1, 1)).toEqual(true);
  expect(isEqual(1, 2)).toEqual(false);
  expect(isEqual('1', '1')).toEqual(true);
  expect(isEqual('1', '2')).toEqual(false);
  expect(isEqual([], [])).toEqual(true);
  expect(isEqual({}, {})).toEqual(true);
});

it('should compare nested things', () => {
  expect(isEqual([[]], [[]])).toEqual(true);
  expect(isEqual({a: []}, {a: []})).toEqual(true);
  expect(isEqual([{}], [{}])).toEqual(true);
  expect(isEqual([1, ['2']], [1, ['2']])).toEqual(true);
  expect(isEqual([2, [1]], [1, [2]])).toEqual(false);
  expect(isEqual({a: {b: 'c'}}, {a: {b: 'c'}})).toEqual(true);
  expect(isEqual({a: {b: undefined}}, {a: {b: 'c'}})).toEqual(false);
});

it('should consider different objects, but deeper, to be false', () => {
  let result = isEqual(
    {
      name: {
        firstName: 'Adam',
        lastName: 'L',
      },
    },
    {
      name: {
        firstName: 'Adam',
        lastName: 'LLLL',
      },
    },
  );
  expect(result).toEqual(false);
});
it('should consider same unordered objects, but deeper, to be true', () => {
  let result = isEqual(
    {
      name: {
        firstName: 'Adam',
        lastName: 'L',
      },
      age: [3, [12, 1]],
      size: undefined,
    },
    {
      age: [3, [12, 1]],
      size: undefined,
      name: {
        firstName: 'Adam',
        lastName: 'L',
      },
    },
  );
  expect(result).toEqual(true);
});

it('should consider mixed items recursively', () => {
  let result = isEqual(
    {
      name: 'A',
      hobbies: ['fishing', 1, true, null, undefined, [], {name: 'B'}],
    },
    {
      name: 'A',
      hobbies: ['fishing', 1, true, null, undefined, [], {name: 'C'}],
    },
  );
  expect(result).toEqual(false);
});
