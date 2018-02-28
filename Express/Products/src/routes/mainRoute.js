// @flow

import {Router} from 'express';

import validateProduct from '../validateProduct';
import productsController from '../controllers/productsController';

let mainRoute = Router();

// get
mainRoute.get('/products', productsController.getProduct);
mainRoute.get('/products/:id', productsController.getProductById);

// post
mainRoute.post('/products', validateProduct, productsController.postProduct);

// put
mainRoute.put('/products/:id', validateProduct, productsController.putProduct);

// delete
mainRoute.delete('/products/:id', productsController.deleteProduct);

export default mainRoute;
