// @flow

function isEqual(a: mixed, b: mixed) {
  if (typeof a !== typeof b) {
    return false;
  }

  if (a == null || b == null) {
    return a === b;
  }

  if (
    typeof a === 'string' ||
    typeof a === 'number' ||
    typeof a === 'boolean'
  ) {
    if (a !== b) {
      return false;
    } else {
      return true;
    }
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return isEqualArrays(a, b);
  }

  let objOne: Object;
  let objTwo: Object;

  if (!Array.isArray(a) && typeof a === 'object') {
    objOne = a;
  } else {
    return false;
  }

  if (!Array.isArray(b) && typeof b === 'object') {
    objTwo = b;
  } else {
    return false;
  }

  return isEqualObjects(objOne, objTwo);
}

function isEqualArrays(arr1: Array<mixed>, arr2: Array<mixed>) {
  if (arr1.length !== arr2.length) {
    return false;
  } else if (arr1.length === 0 && arr2.length === 0) {
    return true;
  } else {
    for (let i = 0; i < arr1.length; i++) {
      if (!isEqual(arr1[i], arr2[i])) {
        return false;
      }
    }
  }
  return true;
}

function isEqualObjects(objOne: Object, objTwo: Object) {
  let keysOne = Object.keys(objOne);
  let keysTwo = Object.keys(objTwo);

  if (keysOne.length !== keysTwo.length) {
    return false;
  } else if (keysOne.length === 0 && keysTwo.length === 0) {
    return true;
  } else {
    for (let key of keysOne) {
      if (objTwo.hasOwnProperty(key)) {
        if (!isEqual(objOne[key], objTwo[key])) {
          return false;
        }
      }
    }
    // 2nd check for undefined value in 2nd object
    for (let key of keysTwo) {
      if (objOne.hasOwnProperty(key)) {
        if (!isEqual(objOne[key], objTwo[key])) {
          return false;
        }
      }
    }
    return true;
  }
}
export default isEqual;
