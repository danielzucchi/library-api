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
const testUpdatedBook = {
  _id: "5be1b8fa0804d7e72c85974f",
  isbn: "ISBN1234",
  title: "Title updated",
  author: "Author",
  edition: 1,
  numOfCopies: 1,
  active: true
};

jest.mock("../services/services");

describe("Book controllers", () => {
  describe("createBook feature", () => {
    it("Given the user requests to add a book, then the service gets called", () => {
      services.createBook = jest.fn();

      return request(app)
        .post("/library/books")
        .send(testBook)
        .then(() => {
          expect(services.createBook).toHaveBeenCalled();
        });
    });

    it("Given the user requests to add a book, then the service gets called with the request body", () => {
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

    it("Given the user requests to add a book, then the controller returns the book provided by the service", () => {
      services.createBook = jest.fn(() =>
        Promise.resolve({
          _id: "jdnkjvbnafjk",
          isbn: "ISBN1234",
          title: "Title",
          author: "Author",
          edition: 1,
          numOfCopies: 1,
          active: true,
          __v: 0
        })
      );

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBook)
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toMatchObject(testBook);
          expect(response.body._id).toBe("jdnkjvbnafjk");
          expect(response.body.__v).toBe(0);
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
          expect(response.body[0]).toBe("isbn is required");
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
          expect(response.body[0]).toBe("title is required");
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
          expect(response.body[0]).toBe("author is required");
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
          expect(response.body[0]).toBe("edition is required");
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
          expect(response.body[0]).toBe("numOfCopies is required");
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
          expect(response.body[0]).toBe("active is required");
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

    it("Given the user attempts to create a book , then the controller returns a validation error ", () => {
      const error = new Error();
      error.name = "ValidationError";
      error.message = "Validation Error";

      services.createBook = jest.fn(() => Promise.reject(error));

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBook)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.text).toBe("Validation Error");
        });
    });
    it("Given the user attempts to create a book , then the controller returns something went wrong ", () => {
      const error = new Error();
      error.name = "Generic error";
      error.message = "Something went wrong";

      services.createBook = jest.fn(() => Promise.reject(error));

      return request(app)
        .post("/library/books")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBook)
        .then(response => {
          expect(response.statusCode).toBe(500);
          expect(response.text).toBe("Something went wrong");
        });
    });
  });

  describe("find book by Id Book feature", () => {
    it("Given the user requests to find  a book, then the service gets called", () => {
      services.findBookById = jest.fn();

      return request(app)
        .get("/library/books/:id")
        .then(() => {
          expect(services.findBookById).toHaveBeenCalled();
        });
    });

    it("Given the user requests to find a book with a given ID, then the controller returns the book provided by the service", () => {
      services.findBookById = jest.fn(() =>
        Promise.resolve({
          _id: "jdnkjvbnafjk",
          isbn: "ISBN1234",
          title: "Title",
          author: "Author",
          edition: 1,
          numOfCopies: 1,
          active: true,
          __v: 0
        })
      );
      return request(app)
        .get("/library/books/:id")
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject(testBook);
          expect(response.body._id).toBe("jdnkjvbnafjk");
          expect(response.body.__v).toBe(0);
        });
    });

    it("Given the user requests to find a book with a given ID, when the service returns null, then return 404 not found", () => {
      services.findBookById = jest.fn(() => Promise.resolve(null));
      return request(app)
        .get("/library/books/:id")
        .then(response => {
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe("Book not found.");
        });
    });

    it("Given the user requests to find a book by ID, when the ID is in the wrong format and the service returns an INVALID_ID error then return an error message with status 400.", () => {
      const error = new Error("INVALID_ID");
      services.findBookById = jest.fn(() => Promise.reject(error));

      return request(app)
        .get("/library/books/:id")
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.text).toBe("Invalid ID.");
        });
    });

    it("Given any other type of error is thrown, then the controller returns ta generic error message with status 500", () => {
      const error = new Error("GENERIC_ERROR");
      services.findBookById = jest.fn(() => Promise.reject(error));

      return request(app)
        .get("/library/books/:id")
        .then(response => {
          expect(response.statusCode).toBe(500);
          expect(response.text).toBe("Something went wrong.");
        });
    });
  });

  describe("update Book feature", () => {
    it("Given the user requests to update a book, then the service gets called", () => {
      return request(app)
        .put("/library/books/:id")
        .send(testUpdatedBook)
        .then(() => {
          expect(services.updateBook).toHaveBeenCalled();
        });
    });

    it("Given the user requests to update a book, then the service gets called with the request body", () => {
      services.updateBook = jest.fn();

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testUpdatedBook)
        .then(() => {
          expect(services.updateBook).toHaveBeenCalledWith(
            testUpdatedBook._id,
            testUpdatedBook
          );
        });
    });

    it("Given the user requests to update a book, then the controller returns the updated book", () => {
      services.updateBook = jest.fn(() => Promise.resolve(testUpdatedBook));

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testUpdatedBook)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(testUpdatedBook);
        });
    });

    it("Given the user attempts to update a book with an inexistent Id, then the controller returns a 404 Not Found error", () => {
      services.updateBook = jest.fn(() => Promise.resolve(null));

      return request(app)
        .put("/library/books/" + "random")
        .send(testUpdatedBook)
        .then(response => {
          expect(response.statusCode).toBe(404);
          expect(response.text).toBe("Book not found.");
        });
    });

    it("Given the user attempts to update a book with an invalid Id format, then the controller returns a Invalid ID error.", () => {
      const error = new Error();
      error.name = "CastError";
      services.updateBook = jest.fn(() => Promise.reject(error));

      return request(app)
        .put("/library/books/" + "12345")
        .send(testUpdatedBook)
        .then(response => {
          expect(response.statusCode).toBe(400);
          expect(response.text).toBe("INVALID_ID");
        });
    });

    it("Given the service returns a generic error, then the controller returns a generic error.", () => {
      const error = new Error();
      error.name = "MongoError";
      services.updateBook = jest.fn(() => Promise.reject(error));

      return request(app)
        .put("/library/books/" + "12345")
        .send(testUpdatedBook)
        .then(response => {
          expect(response.statusCode).toBe(500);
          expect(response.text).toBe("Something went wrong.");
        });
    });

    it("Given the user requests to update a book without a required field (isbn), then the controller returns an error", () => {
      const testBookMissingIsbn = {
        _id: "dfkmnlskdnfg",
        title: "Title",
        author: "Author",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingIsbn)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("isbn is required");
        });
    });

    it("Given the user requests to update a book without a required field (title), then the controller returns an error", () => {
      const testBookMissingTitle = {
        _id: "dfkmnlskdnfg",
        isbn: "vndlsbf",
        author: "Author",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingTitle)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("title is required");
        });
    });

    it("Given the user requests to update a book without a required field (author), then the controller returns an error", () => {
      const testBookMissingAuthor = {
        _id: "dfkmnlskdnfg",
        isbn: "vndlsbf",
        title: "Title",
        edition: 1,
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingAuthor)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("author is required");
        });
    });

    it("Given the user requests to update a book without a required field (edition), then the controller returns an error", () => {
      const testBookMissingEdition = {
        _id: "dfkmnlskdnfg",
        isbn: "vndlsbf",
        title: "Title",
        author: "Author",
        numOfCopies: 1,
        active: true
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingEdition)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("edition is required");
        });
    });

    it("Given the user requests to update a book without a required field (numOfCopies), then the controller returns an error", () => {
      const testBookMissingNumOfCopies = {
        _id: "dfkmnlskdnfg",
        isbn: "vndlsbf",
        title: "Title",
        author: "Author",
        edition: 1,
        active: true
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingNumOfCopies)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("numOfCopies is required");
        });
    });

    it("Given the user requests to update a book without a required field (active), then the controller returns an error", () => {
      const testBookMissingActive = {
        _id: "dfkmnlskdnfg",
        isbn: "vndlsbf",
        title: "Title",
        author: "Author",
        edition: 1,
        numOfCopies: 1
      };

      return request(app)
        .put("/library/books/" + testUpdatedBook._id)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(testBookMissingActive)
        .then(response => {
          expect(response.statusCode).toBe(412);
          expect(response.body[0]).toBe("active is required");
        });
    });
  });
});
