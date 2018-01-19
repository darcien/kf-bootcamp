//@flow

function arrayFrom(anything) {
  let array = [];
  for (let element of Object.entries(anything)) {
    array.push(element);
  }
  return array;
}

let s = new Set();

s.add('1');
s.add('2');
s.add('3');

// You could deconstruct from an iterator
// let [satu, ...sisa] = s;
// console.log(satu);
//
// let o = new Map();
//
// o.set('a', '1');
// o.set('b', '2');
// o.set('c', '3');
//
// // let array = arrayFrom(o);
//
// let [first, ...rest] = o; // it works, but flow complaints
// console.log(first);
