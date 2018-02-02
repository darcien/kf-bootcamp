// @flow
//
// function sleep(ms: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Time passed: ${ms}ms`);
//       resolve();
//     }, ms);
//   });
// }
//
// sleep(500).then(() => {
//   console.log('Done');
// });
//
// console.log('Hi');
//
// it('should', (done) => {
//   // call done() when done testing with async
//   // like setTimeout, resolve and then done().
// });

function* fib() {
  let previousValue = 0;
  let currentValue = 1;
  let nextValue;

  while (true) {
    yield previousValue;
    nextValue = previousValue + currentValue;
    previousValue = currentValue;
    currentValue = nextValue;
  }
}

let button = document.createElement('button');

button.appendChild(document.createTextNode('N-next'));

if (document.body) {
  document.body.appendChild(button);
}
let generator = fib();

button.addEventListener('click', () => {
  console.log(generator.next().value);
});
