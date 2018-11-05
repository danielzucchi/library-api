
const request = require('supertest');
const app = require('../server');

describe('GET /books-library/books', function () {
  it('respond with json containing a list of all users', function (done) {
      request(app)
          .get('/books-library/books')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
