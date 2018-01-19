import pluck from '../pluck';

it('should return empty string', () => {
  let peoples = [];
  expect(pluck(peoples, '')).toEqual([]);
});

it('should pluck values', () => {
  let peoples = [
    { name: 'Simon', age: 36 },
    { name: 'Paul', age: 33 },
    { name: 'Nixon', age: 3 }
  ];
  expect(pluck(peoples, 'name')).toEqual(['Simon', 'Paul', 'Nixon']);
});

it('should handle non-existent property', () => {
  let peoples = [
    { name: 'Simon', age: 36 },
    { name: 'Paul', age: 33 },
    { name: 'Nixon', age: 3 }
  ];
  expect(pluck(peoples, 'asdf')).toEqual([]);
});
