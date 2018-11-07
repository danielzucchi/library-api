const request = require("supertest");
const apiRoute=require('./api-routes')
const express = require('express')
const app= express();
const bodyParser = require("body-parser");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(apiRoute); 
jest.mock("../services/services");

const service = require("../services/services");

describe("API Routes", () => {


  it("post books is called ", () => {
    service.save = jest.fn(() => ({ test: "test" }));
    return request(app)
      .post("/books-library/books")
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .then(function() {
        expect(service.save).toHaveBeenCalled();
      });
  });

  it("get books is called ", () => {
    service.findAll = jest.fn(() => ({ test: "test" }));
    return request(app)
      .get("/books-library/books")
      .then(function() {
        expect(service.findAll).toHaveBeenCalled();
      });
  });

  it("get books return books  ", () => {
    service.findAll = jest.fn(() => ({ test: "test" }));
    return request(app)
      .get("/books-library/books")
      .then(function() {
        expect(service.findAll).toHaveBeenCalled();
      });
  });

  it("Given the Find Book by Name route is called, the findBookByName service should be called", () => {
    service.findByTitle = jest.fn(() => ({ test: "test" }));
    return request(app)
      .get("/books-library/books/:book")
      .expect({ test: "test" });
  });



  it("Given the Find Book by Name route is called, it should return an object", () => {
    service.findByTitle.mockImplementation(() => {
      return { bla: "test" };
    });
    return request(app)
      .get("/books-library/books/:book")
      .expect({ bla: "test" });
  });
});

// title: { type: String, required: true },
// author: { type: String, required: true },
// copyrightYear: Number,
// about: String,
// publisher: String,
// available: Boolean,
// genre: String
