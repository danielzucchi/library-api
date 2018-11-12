const services = require("../services/services");
const request = require("supertest");
const app = require("../server");

jest.mock("../services/services");

describe("Find by ID API routes", () => {
  it("Given a book Id is called, then findBookById service is called", () => {
    services.findBookById.mockImplementation(() => {
      return { id: "5be058ff29c7d6c16f779d28" };
    });
    return request(app)
      .get("/books/:id")
      .then(() => {
        expect(services.findBookById).toHaveBeenCalled();
      });
  });

  it("Given a book Id is called, then findBookById service returns correct Id", () => {
    services.findBookById.mockImplementation(() => {
      return { id: "5be058ff29c7d6c16f779d28" };
    });
    return request(app)
      .get("/books/:id")
      .expect({ id: "5be058ff29c7d6c16f779d28" });
  });
});

describe("Find By Name API Routes", () => {
  it("Given the Find Book by Name route is called, the findBookByName service should be called", () => {
    services.findByName.mockImplementation(() => {
      return { bla: "test" };
    });
    return request(app)
      .get("/books-library/books/:book")
      .then(function() {
        expect(services.findByName).toHaveBeenCalled();
      });
  });

  it("Given the Find Book by Name route is called, it should return an object", () => {
    services.findByName.mockImplementation(() => {
      return { bla: "test" };
    });
    return request(app)
      .get("/books-library/books/:book")
      .expect({ bla: "test" });
  });
});
