//@flow

import {randomId} from '../helpers/randomId';
import {validationResult} from 'express-validator/check';

import type {$Request as Req, $Response as Res} from 'express';

type Product = {
  id: string,
  name: string,
  description: string,
  price: number,
  photo: string,
};

type ReqBody = {
  body: {
    name: string,
    description: string,
    price: number,
    photo: string,
  },
  params: {
    id: string,
  },
};

type PostReq = ReqBody & Req;

let mockData: Array<Product> = [
  {
    id: '27sjdip6yaq',
    name: 'Banana',
    description: 'yellow',
    price: 1,
    photo: 'urlblabla',
  },
  {
    id: 'oftsyhxys0',
    name: 'Apple',
    description: 'red',
    price: 20,
    photo: 'urlblabla',
  },
  {
    id: '1icx88sos9m',
    name: 'Cupcake',
    description: 'white',
    price: 100,
    photo: 'urlblabla',
  },
];

async function getProduct(req: Req, res: Res) {
  res.status(200).json(mockData);
}

async function getProductById(req: Req, res: Res) {
  for (let product of mockData) {
    if (product.id === req.params.id) {
      res.status(200).json(product);
    }
  }
  res.status(400).send({status: 'ERROR', message: 'Product not found'});
}

async function postProduct(req: PostReq, res: Res) {
  let {name, description, price, photo} = req.body;
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  } else {
    mockData.push({
      id: randomId(),
      name,
      description,
      price,
      photo,
    });
    res.status(201).json({
      status: 'OK',
      message: 'Product saved',
    });
  }
}

async function putProduct(req: PostReq, res: Res) {
  let {name, description, price, photo} = req.body;
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()});
  } else {
    for (let i = 0; i < mockData.length; i++) {
      let product = mockData[i];
      if (product.id === req.params.id) {
        mockData[i] = {
          ...mockData[i],
          name,
          description,
          price,
          photo,
        };
        res.status(200).json({
          status: 'OK',
          message: 'Product updated',
        });
        return;
      }
    }
    res.status(400).send({status: 'ERROR', message: 'Product not found'});
  }
}

async function deleteProduct(req: Req, res: Res) {
  let originalLength = mockData.length;

  mockData = mockData.filter((product) => {
    return product.id !== req.params.id;
  });

  if (mockData.length < originalLength) {
    res.status(200).json({
      status: 'OK',
      message: 'Product removed',
    });
    return;
  }

  res.status(400).send({status: 'ERROR', message: 'Product not found'});
}

const productsController = {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};

export default productsController;
