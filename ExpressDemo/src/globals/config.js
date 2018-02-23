// @flow

require('dotenv').config();

let PORT = process.env.PORT || 6060;
let CONNECTION_STRING = process.env.CONNECTION_STRING;
let SECRET = process.env.SECRET;
// let SALT = process.env.SALT || bcrypt.genSaltSync(10);

export {PORT, CONNECTION_STRING, SECRET};
