// @flow

import express from 'express';
import bodyParser from 'body-parser';

import mainRoute from './routes/mainRoute';

const PORT = 8080;

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use('/', mainRoute);

app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});

export {app};
