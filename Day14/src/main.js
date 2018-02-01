// @flow

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
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
