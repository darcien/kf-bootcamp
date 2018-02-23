//@flow

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import mainRoute from './routes/mainRoute';

import {PORT, CONNECTION_STRING} from './globals/config';

let app = express();

mongoose.connect(CONNECTION_STRING);

mongoose.Promise = global.Promise;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use('/api', mainRoute);

app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
