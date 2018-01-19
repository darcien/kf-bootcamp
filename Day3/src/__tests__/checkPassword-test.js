import checkPassword from '../checkPassword';

it('should handle empty string', () => {
  let {success, reason} = checkPassword('');
  // console.log(reason);
  expect(success).toEqual(false);
});

it('should warn short string', () => {
  let {success, reason} = checkPassword('abcd');
  // console.log(reason);
  expect(success).toEqual(false);
});

it('should warn lower case', () => {
  let {success, reason} = checkPassword('COFFEEISNICE');
  // console.log(reason);
  expect(success).toEqual(false);
});

it('should warn upper case', () => {
  let {success, reason} = checkPassword('teaisnotbad');
  // console.log(reason);
  expect(success).toEqual(false);
});

it('should warn lack of number', () => {
  let {success, reason} = checkPassword('abcDEF7');
  // console.log(reason);
  expect(success).toEqual(false);
});

it('should let you pass', () => {
  let {success, reason} = checkPassword('kopiSetiapHari000');
  // console.log(reason);
  expect(success).toEqual(true);
});
