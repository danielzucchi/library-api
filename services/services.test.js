const mockBook = {
  _id: "3j2oiujt1rhui4grioweg",
  title: "my title"
};

const updatedMockBook = {
  title: "updated title"
};

const updatedMockBookWithId = {
  _id: "3j2oiujt1rhui4grioweg",
  title: "updated title"
};

const updatedMockBookId = "3j2oiujt1rhui4grioweg";

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
      mockModelCreateRejectWith(
        "ValidationError",
        "Required field not fulfilled"
      );

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
    it("Book model findById is called with a passed ID", async () => {
      const mockModelFindById = jest.fn(() => Promise.resolve());
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      await bookService.findBookById("3j2oiujt1rhui4grioweg");

      expect(mockModelFindById).toHaveBeenCalledWith("3j2oiujt1rhui4grioweg");
    });

    it("Given the findByID service is called with a passed ID then it returns the book provided by the Book Model findByID", async () => {
      const mockModelFindById = jest.fn(() => Promise.resolve(mockBook));
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      const foundBook = await bookService.findBookById("anything");

      expect(foundBook).toMatchObject(mockBook);
    });

    it("Given the findById service is called with a passed ID that is not found then it returns null", async () => {
      const mockModelFindById = jest.fn(() => Promise.resolve(null));
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      const foundBook = await bookService.findBookById("anything");

      expect(foundBook).toBe(null);
    });

    it("Given the findById service is called with a passed ID in an incorrect format, then service throws a CastError", async () => {
      expect.assertions(1);

      mockModelFindByIdRejectWith("CastError");
      const bookService = require("./services");

      try {
        await bookService.findBookById("anything");
      } catch (err) {
        expect(err.message).toBe("INVALID_ID");
      }
    });

    it("When Book model findById throws exception then the service throws generic error.", async () => {
      expect.assertions(1);

      mockModelFindByIdRejectWith("Generic error");
      const bookService = require("./services");

      try {
        await bookService.findBookById("anything");
      } catch (err) {
        expect(err.message).toBe("GENERIC_ERROR");
      }
    });
  });
  describe("updateBook service", () => {
    it("Given the updateBook service is called with a passed book then the findByIdAndUpdate is called", async () => {
      const mockUpdateBook = jest.fn(() => Promise.resolve());
      jest.setMock("../models/book", {
        findByIdAndUpdate: mockUpdateBook
      });
      const bookService = require("./services");

      await bookService.updateBook(updatedMockBookId, updatedMockBook);

      expect(mockUpdateBook).toHaveBeenCalledWith(
        updatedMockBookId,
        updatedMockBook,
        {
          new: true
        }
      );
    });

    it("When updateBook service is called with a book, then service returns an updated book", async () => {
      const bookService = mockModelUpdateResolveWith(updatedMockBookWithId);

      const updatedBook = await bookService.updateBook(
        mockBook._id,
        updatedMockBook,
        { new: true }
      );

      expect(updatedBook).toEqual(updatedMockBookWithId);
    });

    it("When an updateBook is called with an invalid Id, then service throws a CastError", async () => {
      expect.assertions(1);

      mockModelUpdateRejectWith("CastError");
      const bookService = require("./services");

      try {
        await bookService.updateBook("random", updatedMockBook);
      } catch (err) {
        expect(err.message).toBe("INVALID_ID");
      }
    });

    it("When updateBook is called with an invalid Id, then service throws a generic error", async () => {
      expect.assertions(1);

      mockModelUpdateRejectWith("Generic error");
      const bookService = require("./services");

      try {
        await bookService.updateBook("anything", updatedMockBook);
      } catch (err) {
        expect(err.message).toBe("GENERIC_ERROR");
      }
    });
  });

  const mockModelFindByIdRejectWith = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;

    jest.setMock("../models/book", {
      findById: jest.fn(() => Promise.reject(error))
    });
  };

  const mockModelCreateRejectWith = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;

    jest.setMock("../models/book", {
      create: jest.fn(() => Promise.reject(error))
    });
  };

  const mockModelUpdateResolveWith = updatedMockBook => {
    jest.setMock("../models/book", {
      findByIdAndUpdate: jest.fn(() => Promise.resolve(updatedMockBook))
    });
    return require("./services");
  };

  const mockModelUpdateRejectWith = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;

    jest.setMock("../models/book", {
      findByIdAndUpdate: jest.fn(() => Promise.reject(error))
    });
    return require("./services");
  };

  const mockModelCreateResolveWith = mockBook => {
    jest.setMock("../models/book", {
      create: jest.fn(() => Promise.resolve(mockBook))
    });
    return require("./services");
  };
});
