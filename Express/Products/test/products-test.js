import chai from 'chai';

import chaiHttp from 'chai-http';

/*eslint-disable*/

chai.should();
chai.use(chaiHttp);

// To run the test, either run the server in localhost:8080.
// Or import it and pass it to request().

// import {app as server} from '../src/main';

describe('The products controller', () => {
  it('should GET all products', (done) => {
    chai
      .request('http://localhost:8080')
      .get('/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });

  it('should GET single product', (done) => {
    chai
      .request('http://localhost:8080')
      .get('/products/oftsyhxys0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Apple');
        done();
      });
  });

  it('should POST single product', (done) => {
    let newProduct = {
      name: 'Eggplant',
      description: 'purple',
      price: 1000,
      photo: 'https://hotemoji.com/images/emoji/m/2jszn9v52e2m.png',
    };

    chai
      .request('http://localhost:8080')
      .post('/products')
      .send(newProduct)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('OK');
        done();
      });
  });
  it('should PUT single product', (done) => {
    let newProduct = {
      name: 'Black Cupcake',
      description: 'black',
      price: 10000,
      photo: 'cupcake.png',
    };

    chai
      .request('http://localhost:8080')
      .put('/products/1icx88sos9m')
      .send(newProduct)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('OK');
        done();
      });
  });
  it('should DELETE single product', (done) => {
    chai
      .request('http://localhost:8080')
      .delete('/products/27sjdip6yaq')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('OK');
        done();
      });
  });
});
