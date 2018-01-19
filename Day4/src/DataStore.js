// @flow

type ForEachFunction = (key: string, value: mixed) => void;

class DataStore {
  data: {[string]: mixed} = {};
  set(key: string, value: mixed) {
    this.data[key] = value;
  }
  get(key: string) {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key];
    } else {
      return false;
    }
  }
  forEach(fn: ForEachFunction) {
    let keys: Array<string> = Object.keys(this.data);
    for (let key of keys) {
      fn(key, this.data[key]);
    }
  }
}

// let d = new DataStore();
//
// d.set('apple', 100);
// d.set('bnn', 555);
//
// d.forEach((key, value) => {
//   console.log(key, ':', value);
// });

export default DataStore;
