// @flow

function double(n: number) {
  return n * 2;
}

type Car = {
  manufacturer: string,
  productionYear: number,
  isExist: boolean | null,
};

let c: Car = {
  manufacturer: 'Ford',
  productionYear: 2006,
  isExist: true,
};

function checkCarExistance(c: Car) {
  console.log(c.isExist);
}

checkCarExistance(c);
