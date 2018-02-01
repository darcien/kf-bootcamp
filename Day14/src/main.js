// @flow

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Time passed: ${ms}ms`);
      resolve();
    }, ms);
  });
}

sleep(500).then(() => {
  console.log('Done');
});

console.log('Hi');

it('should', (done) => {
  // call done() when done testing with async
  // like setTimeout, resolve and then done().
});
