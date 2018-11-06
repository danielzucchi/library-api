const service = require("../services/services");
const request = require("supertest");
const app = require("../server");

jest.mock("../services/services");

describe("API Routes", () => {
  it("Given the Find Book by Name route is called, the findBookByName service should be called", () => {
    service.findByName.mockImplementation({ bla: "test" });
    return request(app)
      .get("/books-library/books/:book")
      .then(function() {
        expect(service.findByName).toHaveBeenCalled();
      });
  });

  it("Given the Find Book by Name route is called, it should return an object", () => {
    service.findByName.mockImplementation(() => {
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
