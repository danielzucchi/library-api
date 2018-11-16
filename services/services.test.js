const mockBook = {
  title: "my title"
};

describe("Services", () => {
  // We set the mock specifically for each test because Mongoose doesn't allow for the Model to be mocked separately by Jest https://github.com/facebook/jest/issues/3073
  beforeEach(() => {
    jest.resetModules();
  });

  describe("createBook service", () => {
    it("createBook service is called with a passed Book", async () => {
      const mockCreateBook = jest.fn(() => Promise.resolve());
      jest.setMock("../models/book", {
        create: mockCreateBook
      });

      const bookService = require("./services");

      await bookService.createBook(mockBook);

      expect(mockCreateBook).toHaveBeenCalledWith(mockBook);
    });

    it("createBook service returns the book sent as parameter", async () => {
      const bookService = mockCreationWith(mockBook);

      const createdBook = await bookService.createBook(mockBook);

      expect(createdBook).toEqual(mockBook);
    });

    it("createBook service returns an Validation Error message when required field is missing", async () => {
      expect.assertions(1);

      const error = new Error();
      error.name = "ValidationError";
      error.message = "Required field not fulfilled";

      jest.setMock("../models/book", {
        create: jest.fn(() => Promise.reject(error))
      });

      const bookService = require("./services");

      try {
        await bookService.createBook();
      } catch (err) {
        expect(err.message).toBe("Required field not fulfilled");
      }
    });

    it("createBook service returns a Generic error message when another error has occured", async () => {
      expect.assertions(1);

      const error = new Error();
      error.name = "CastError";

      jest.setMock("../models/book", {
        create: jest.fn(() => Promise.reject(error))
      });

      const bookService = require("./services");

      try {
        await bookService.createBook();
      } catch (err) {
        expect(err.message).toBe("Generic error");
      }
    });

    const mockCreationWith = mockBook => {
      jest.setMock("../models/book", {
        create: jest.fn(() => Promise.resolve(mockBook))
      });
      return require("./services");
    };
  });
});
