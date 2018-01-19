import compareObjects from '../compareObjects';

it('should consider empty objects to be true', () => {
  let result = compareObjects({}, {});
  expect(result).toEqual(true);
});

it('should consider same objects to be true(duh)', () => {
  let result = compareObjects({name: 'K'}, {name: 'K'});
  expect(result).toEqual(true);
});

it('should consider different objects to be false', () => {
  let result = compareObjects({name: 'K'}, {name: 'L'});
  expect(result).toEqual(false);
});

it('should consider same unordered objects to be true', () => {
  let result = compareObjects({name: 'K', age: 2}, {age: 2, name: 'K'});
  expect(result).toEqual(true);
});

it('should consider different unordered objects to be false', () => {
  let result = compareObjects({name: 'K', age: 3}, {age: 2, name: 'K'});
  expect(result).toEqual(false);
});
