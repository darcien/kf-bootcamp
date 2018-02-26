// @flow

import {Router} from 'express';
import productsController from '../controllers/productsController';

let mainRoute = Router();

// get
mainRoute.get('/products', productsController.getProduct);
mainRoute.get('/products/:id', productsController.getProductById);

// post
mainRoute.post('/products', productsController.postProduct);

// put
mainRoute.put('/products/:id', productsController.putProduct);

// delete
mainRoute.delete('/products/:id', productsController.deleteProduct);

export default mainRoute;
