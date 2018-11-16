const services = require("../services/services");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = require("./api-routes");

app.use(bodyParser.json());
app.use(apiRoutes);

const testBook = {
  isbn: "ISBN1234",
  title: "Title",
  author: "Author",
  edition: 1,
  numOfCopies: 1,
  active: true
};

jest.mock("../services/services");

describe("Book controllers", () => {
  describe("createBook feature", () => {
    it("Given the user requests to add a book, then the controller gets called", () => {
      services.createBook = jest.fn();

      return request(app)
        .post("/library/books")
        .send(testBook)
        .then(() => {
          expect(services.createBook).toHaveBeenCalled();
        });
    });

    it("Given the user requests to add a book, then the controller gets called with the request body", () => {
      services.createBook = jest.fn();

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBook)
        .then(() => {
          expect(services.createBook).toHaveBeenCalledWith(testBook);
        });
    });

    it("Given the user requests to add a book, then the controller returns the same book", () => {
      services.createBook = jest.fn(() => Promise.resolve(testBook));

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBook)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(testBook);
        });
    });

    it("Given the user requests to add a book without a required field (isbn), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingIsbn = {
        title: "Title",
        author: "Author",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingIsbn)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("ISBN is required.");
        });
    });

    it("Given the user requests to add a book without a required field (title), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingTitle = {
        isbn: "ISBN1234",
        author: "Author",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingTitle)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("Title is required.");
        });
    });


    it("Given the user requests to add a book without a required field (author), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingAuthor = {
        isbn: "ISBN1234",
        title: "Title",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingAuthor)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("Author is required.");
        });
    });


    it("Given the user requests to add a book without a required field (edition), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingEdition = {
        isbn: "ISBN1234",
        title: "Title",
        author: "Author",
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingEdition)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("Edition is required.");
        });
    });

    it("Given the user requests to add a book without a required field (numOfCopies), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingNumOfCopies = {
        isbn: "ISBN1234",
        title: "Title",
        author: "Author",
        edition: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingNumOfCopies)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("Number of copies is required.");
        });
    });

    it("Given the user requests to add a book without a required field (active), then the controller returns an error", () => {
      services.createBook = jest.fn();

      const testBookMissingActive = {
        isbn: "ISBN1234",
        title: "Title",
        author: "Author",
        edition: 1,
        numOfCopies: 1
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingActive)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.error.text).toBe("Active property is required.");
        });
    });


    it("Given validation fails, then the createBook service will not be called", () => {
      services.createBook = jest.fn();

      const testBookMissingISBN = {
        title: "Title",
        author: "Author",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingISBN)
        .then(() => {
          expect(services.createBook).not.toHaveBeenCalled();
        });
    });
    
  });
});
