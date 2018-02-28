// @flow

import {checkSchema} from 'express-validator/check';

export default checkSchema({
  name: {
    matches: /([\w\d\s])+/,
    optional: false,
  },
  description: {
    isAlphanumeric: true,
    optional: false,
  },
  price: {
    isFloat: true,
    optional: false,
  },
  photo: {
    isURL: true,
    optional: false,
  },
});
