// @flow

import {Router} from 'express';
import {loginController, signupController} from '../controllers/authController';

let mainRoute = Router();

// auth
mainRoute.post('/auth/signup', signupController);
mainRoute.post('/auth/login', loginController);
//
// // users
// mainRoute.get('/users', /* users controller */);

export default mainRoute;
