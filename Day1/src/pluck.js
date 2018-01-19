function pluck(arr, propName) {
  let newArray = [];
  for (var item of arr) {
    if (item.hasOwnProperty(propName)) {
      newArray.push(item[propName]);
    }
  }
  return newArray;
}

export default pluck;
