// @flow

class Counter {
  count: number;
  constructor(initialCount: number = 0) {
    this.count = initialCount;
  }

  inc() {
    this.count += 1;
  }
  dec() {
    this.count += 1;
  }

  getCount() {
    return this.count;
  }
}

let c = new Counter(10);
let d = new Counter(10);

c.inc(); //expect 11

console.log(c.inc === d.inc);
// Actually it's true, since it's the same function from the Counter class.
// It would be false if using factories, function createCounter().
