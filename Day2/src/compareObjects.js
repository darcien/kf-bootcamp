// @flow

function compareObjects(objOne: Object, objTwo: Object) {
  let keysOne: Array<string> = Object.keys(objOne);
  let keysTwo: Array<string> = Object.keys(objTwo);

  if (keysOne.length !== keysTwo.length) {
    return false;
  } else {
    for (let key of keysOne) {
      if (objTwo.hasOwnProperty(key)) {
        if (objOne[key] !== objTwo[key]) {
          return false;
        }
      }
    }
    // 2nd check for undefined value in 2nd object
    for (let key of keysTwo) {
      if (objOne.hasOwnProperty(key)) {
        if (objOne[key] !== objTwo[key]) {
          return false;
        }
      }
    }
  }
  return true;
}

export default compareObjects;
