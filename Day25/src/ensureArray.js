//@flow

export function ensureStringArray(input: mixed): Array<string> {
  if (!Array.isArray(input)) {
    return [];
  } else {
    let stringArray: Array<string> = [];
    for (let item of input) {
      if (typeof item !== 'string') {
        // Or push empty string instead?
        return [];
      } else {
        stringArray.push(item);
      }
    }
    return stringArray;
  }
}

export function ensureArrayOf<T>(
  input: mixed,
  mapFunction: (mixed) => T,
): Array<T> {
  if (!Array.isArray(input)) {
    return [];
  } else {
    let array: Array<T> = [];
    for (let item of input) {
      array.push(mapFunction(item));
    }
    return array;
  }
}
