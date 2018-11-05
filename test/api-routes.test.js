
const request = require('supertest');
const app = require('../server');

describe('GET /books-library/books', function () {
  it("returns status 200", function() {
    request('/books-library/books', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
});
