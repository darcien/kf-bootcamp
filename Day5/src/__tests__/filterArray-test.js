import filterArray from '../filterArray.js';

it('should return empty array', () => {
  let arr = [];
  expect(filterArray(arr, () => true)).toEqual([]);
});
it('should return filtered array', () => {
  let arr = [1, 2, 3];
  expect(
    filterArray(arr, (i) => {
      if (i === 2) {
        return true;
      }
    }),
  ).toEqual([2]);
});
it('should return string with enough length', () => {
  let arr = ['Apple', 'Banana', 'Citrus', 'Durian'];
  expect(
    filterArray(arr, (i) => {
      if (i.length > 5) {
        return true;
      }
    }),
  ).toEqual(['Banana', 'Citrus', 'Durian']);
});

it('should works? testing mockup function', () => {
  let mockupFunction = jest.fn();
  let arr = ['Apple', 'Banana', 'Citrus', 'Durian'];

  let result = filterArray(arr, mockupFunction);
  expect(mockupFunction.mock.calls.length).toEqual(4);
  expect(mockupFunction.mock.calls[2]).toEqual(['Citrus']);
});
