const services = require("../services/services");
const request = require("supertest");
const app = require("../server");

jest.mock("../services/services");

describe("API routes", () => {
  it("Given a book Id is called, then findBookById service is called", () => {
    services.findBookById.mockImplementation();
    return request(app)
      .get("/findBookById/:id")
      .then(() => {
        expect(services.findBookById).toHaveBeenCalled();
      });
  });

  it("Given a book Id is called, then findBookById service returns correct Id", () => {
    services.findBookById.mockImplementation(() => {
      return { id: "5be058ff29c7d6c16f779d28" };
    });
    return request(app)
      .get("/findBookById/:id")
      .expect({ id: "5be058ff29c7d6c16f779d28" });
  });
});
