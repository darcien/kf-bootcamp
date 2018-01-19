// @flow

function filterArray<T>(array: Array<T>, fn: (T) => boolean) {
  let filteredArray = [];
  for (let item of array) {
    if (fn(item)) {
      filteredArray.push(item);
    }
  }
  return filteredArray;
}

export default filterArray;
