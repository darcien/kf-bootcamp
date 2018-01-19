import compareArrays from '../compareArrays';

it('should consider empty arrays to be true', () => {
  let result = compareArrays([], []);
  expect(result).toEqual(true);
});

it('should consider same arrays to be true', () => {
  let result = compareArrays([1, 2], [1, 2]);
  expect(result).toEqual(true);
});

it('should consider same unordered to be false', () => {
  let result = compareArrays([1, 2], [2, 1]);
  expect(result).toEqual(false);
});

it('should consider different length to be false', () => {
  let result = compareArrays([1], [2, 1]);
  expect(result).toEqual(false);
});
