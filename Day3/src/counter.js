// @flow

function createCounter() {
  let count = 0;
  let counter = {
    inc: () => {
      count++;
    },
    dec: () => {
      count--;
    },
    getCount: () => {
      return count;
    },
  };

  return counter;
}

export default createCounter;
