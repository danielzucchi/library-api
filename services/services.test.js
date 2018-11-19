const mockBook = {
  id: "3j2oiujt1rhui4grioweg",
  title: "my title"
};

describe("Services", () => {
  // We set the mock specifically for each test because Mongoose doesn't allow for the Model to be mocked separately by Jest https://github.com/facebook/jest/issues/3073
  beforeEach(() => {
    jest.resetModules();
  });

  describe("createBook service", () => {
    it("Book Model.create is called with a passed Book", async () => {
      const mockModelCreate = jest.fn(() => Promise.resolve());
      jest.setMock("../models/book", {
        create: mockModelCreate
      });
      const bookService = require("./services");

      await bookService.createBook(mockBook);

      expect(mockModelCreate).toHaveBeenCalledWith(mockBook);
    });

    it("createBook service returns the book sent as parameter", async () => {
      const bookService = mockModelCreateResolveWith(mockBook);

      const createdBook = await bookService.createBook(mockBook);

      expect(createdBook).toEqual(mockBook);
    });

    it("createBook service returns an Validation Error message when required field is missing", async () => {
      mockModelCreateRejectWith("ValidationError", "Required field not fulfilled");

      const bookService = require("./services");

      try {
        await bookService.createBook();
      } catch (err) {
        expect(err.message).toBe("Required field not fulfilled");
      }
    });

    it("createBook service returns a Generic error message when another error has occured", async () => {
      expect.assertions(1);

      mockModelCreateRejectWith("Generic error");

      const bookService = require("./services");

      try {
        await bookService.createBook();
      } catch (err) {
        expect(err.message).toBe("Generic error");
      }
    });
  });

  describe("findById service", () => {
    it("findByID service is called with a passed ID", async () => {});
  });

  const mockModelCreateRejectWith = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;

    jest.setMock("../models/book", {
      create: jest.fn(() => Promise.reject(error))
    });
  };

  const mockModelCreateResolveWith = mockBook => {
    jest.setMock("../models/book", {
      create: jest.fn(() => Promise.resolve(mockBook))
    });
    return require("./services");
  };
});
