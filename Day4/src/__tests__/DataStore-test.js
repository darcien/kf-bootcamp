import DataStore from '../DataStore';

it('should return false if the key doesnt exist', () => {
  let d = new DataStore();
  expect(d.get('something')).toEqual(false);
});

it('should handle primitive value', () => {
  let d = new DataStore();
  d.set('something', 1);
  d.set('apple', 'red');
  d.set('bnn', false);
  expect(d.get('something')).toEqual(1);
  expect(d.get('apple')).toEqual('red');
  expect(d.get('bnn')).toEqual(false);
  d.set('apple', 'blue');
  expect(d.get('apple')).toEqual('blue');
  d.forEach((key, value) => {
    console.log(key, ':', value);
  });
});

it('should handle function passed to forEach', () => {
  let d = new DataStore();
  d.set('something', 1);
  d.set('apple', 'red');
  d.set('bnn', false);

  let mockFunction = jest.fn();

  d.forEach(mockFunction);

  expect(mockFunction.mock.calls.length).toEqual(3);
  expect(mockFunction.mock.calls[0]).toEqual(['something', 1]);
});
