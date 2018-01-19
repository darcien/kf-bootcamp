import createCounter from '../counter';

it('should start at zero', () => {
  let counter = createCounter();
  expect(counter.getCount()).toEqual(0);
});

it('should increment', () => {
  let counter = createCounter();
  let counter2 = createCounter();
  counter.inc();
  counter.inc();
  counter2.inc();
  expect(counter.getCount()).toEqual(2);
  expect(counter2.getCount()).toEqual(1);
});

it('should decrement', () => {
  let counter = createCounter();
  let counter2 = createCounter();
  counter.inc();
  counter.dec();
  counter2.dec();
  expect(counter.getCount()).toEqual(0);
  expect(counter2.getCount()).toEqual(-1);
});
