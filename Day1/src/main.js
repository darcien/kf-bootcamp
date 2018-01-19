let toEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }
  return true;
};

function pluck(arr, propName) {
  let newArray = [];
  for (var item of arr) {
    if (item.hasOwnProperty(propName)) {
      newArray.push(item[propName]);
    }
  }
  return newArray;
}

it('should return empty string', () => {
  let peoples = [];
  expect(pluck(peoples, '')).toEqual([]);
});

it('should pluck values', () => {
  let peoples = [
    {name: 'Simon', age: 36},
    {name: 'Paul', age: 33},
    {name: 'Nixon', age: 3}
  ];
  expect(pluck(peoples, 'name')).toEqual(['Simon', 'Paul', 'Nixon']);
});

it('should handle non-existent property', () => {
  let peoples = [
    {name: 'Simon', age: 36},
    {name: 'Paul', age: 33},
    {name: 'Nixon', age: 3}
  ];
  expect(pluck(peoples, 'asdf')).toEqual([]);
});
