// @flow

import request from 'request-promise-native';

describe('The product controller', () => {
  it('should GET all products', () => {
    var options = {
      uri: 'http://localhost:8080/products',
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };

    request(options)
      .then((products) => {
        expect(Array.isArray(products)).toEqual(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should GET single product', () => {
    var options = {
      uri: 'http://localhost:8080/products/27sjdip6yaq',
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };

    request(options)
      .then((product) => {
        expect(product).toEqual({
          id: '27sjdip6yaq',
          name: 'Banana',
          description: 'yellow',
          price: 1,
          photo: 'urlblabla',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should POST single product', () => {
    let newProduct = {
      name: 'Eggplant',
      description: 'purple',
      price: 1000,
      photo: 'https://hotemoji.com/images/emoji/m/2jszn9v52e2m.png',
    };

    let options = {
      method: 'POST',
      uri: 'http://localhost:8080/products',
      body: newProduct,
      json: true, // Automatically stringifies the body to JSON
    };

    request(options)
      .then((parsedBody) => {
        expect(parsedBody).toEqual({status: 'OK', message: 'Product saved'});
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it('should PUT single product', () => {
    let newProduct = {
      name: 'Black Cupcake',
      description: 'black',
      price: 10000,
      photo: 'cupcake.png',
    };

    let options = {
      method: 'PUT',
      uri: 'http://localhost:8080/products/oftsyhxys0',
      body: newProduct,
      json: true, // Automatically stringifies the body to JSON
    };

    request(options)
      .then((parsedBody) => {
        expect(parsedBody).toEqual({status: 'OK', message: 'Product updated'});
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it('should DELETE single product', () => {
    let options = {
      method: 'DELETE',
      uri: 'http://localhost:8080/products/27sjdip6yaq',
      json: true, // Automatically stringifies the body to JSON
    };

    request(options)
      .then((parsedBody) => {
        expect(parsedBody).toEqual({status: 'OK', message: 'Product removed'});
      })
      .catch((err) => {
        console.error('Something happened', err);
      });
  });
});
