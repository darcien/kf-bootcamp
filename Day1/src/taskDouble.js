let double = num => num * 2;

let doubling = input => {
  result = [];
  for (val of input) {
    result.push(val * 2);
  }

  return result;
};

function mapArray(arr, fn) {
  newArray = [];
  for (val of arr) {
    newArray.push(fn(val));
  }
  return newArray;
}

let shallowCompare = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
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

let testCase = (description, actual, expected) => {
  if (shallowCompare(actual, expected)) {
    console.log('✔ - ', description);
    return true;
  } else {
    console.log('✗ - ', description);
    return false;
  }
};

let resultOne = [].map(double);
testCase('Empty array', resultOne, []);

let resultTwo = mapArray([1, 2, 3], double);
testCase('Multiple value', resultTwo, [2, 4, 6]);

// testCase(
//   'Falsy',
//   [4],
//   [6]
// )
