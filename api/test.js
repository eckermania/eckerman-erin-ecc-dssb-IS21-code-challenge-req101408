import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import fs from 'fs';
import router from './api/product.js';
import assert from 'assert';

const app = express();
app.use(express.json());
app.use(router);

describe('GET /all', () => {
  it('should return all products', (done) => {
    request(app)
      .get('/all')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        //Assertions
        assert.ok(res.body);
        assert(Array.isArray(res.body), 'Response is not an array');
        assert.strictEqual(res.body.length, 40, 'Response length is not as expected');
        assert.strictEqual(res.body[0].hasOwnProperty('productName'), true, 'Property is not present');

        done();
      });
  });
});

describe('GET /:productId', () => {
  it('should return a product by productId', (done) => {
    const productId = 5

    request(app)
      .get(`/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        //Assertions
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.productId).to.equal(productId);

        done();
      });
  });

  it('should return 400 if productId is not an integer', (done) => {
    const productId = 'abc'; // Provide a non-integer productId

    request(app)
      .get(`/${productId}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assertions
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('productId needs to be an integer');
        done();
      });
  });

  it('should return 404 if productId does not exist in database', (done) => {
    const productId = 999; // Provide a non-existent productId

    request(app)
      .get(`/${productId}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assertions
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('productId not present in database');
        done();
      });
  });
});

describe('POST /', () => {
  it('should create a new product', (done) => {
    const newProduct = {
      productName: 'sassy_yellow_salamander',
      productOwnerName: 'Veronica',
      Developers: ['Ada', 'Erin', 'Ajay'],
      scrumMasterName: 'Tito',
      startDate: '1983/05/04',
      methodology: 'Agile',
      location: 'github.com/bcgov/sassy_yellow_salamander'
    };

    request(app)
      .post('/')
      .send(newProduct)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('DELETE /:productId', () => {
  it('should delete a product by productId', (done) => {
    const productId = 5;

    request(app)
      .delete(`/${productId}`)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 404 if productId does not exist in db', (done) => {
    const productId = 999;

    request(app)
      .delete(`/${productId}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('productId not present in db');
        done();
      });
  });
});

describe('PUT /:productId', () => {
  it('should update a product by productId', (done) => {
    const productId = 1;
    const updatedProduct = {
      productId: 1,
      productName: 'shy_green_giraffe',
      productOwnerName: 'Alex',
      Developers: ['Ada', 'Erin', 'Ajay'],
      scrumMasterName: 'Bogdan',
      startDate: '1983/05/04',
      methodology: 'Agile',
      location: 'github.com/bcgov/shy_green_giraffe'
    };

    request(app)
      .put(`/${productId}`)
      .send(updatedProduct)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 if request body is empty', (done) => {
    const productId = 2;
    const updatedProduct = {};

    request(app)
      .put(`/${productId}`)
      .send(updatedProduct)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Missing request body');
        done();
      });
  });

  it('should return 404 if productId does not exist in db', (done) => {
    const productId = 999;
    const updatedProduct = {
        productName: 'bouncy_pink_elephant',
        productOwnerName: 'Qiang',
        Developers: ['Elena', 'Erin', 'Ajay'],
        scrumMasterName: 'Tito',
        startDate: '1983/05/04',
        methodology: 'Agile',
        location: 'github.com/bcgov/bouncy_pink_elephant'
      };

    request(app)
      .put(`/${productId}`)
      .send(updatedProduct)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('productId not present in db');
        done();
      });
  });
});
