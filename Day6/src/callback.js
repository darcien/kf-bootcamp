let timer = setTimeout(() => {
  console.log('World');
}, 2000);

console.log('Hello');
clearTimeout(timer);
