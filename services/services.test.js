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

const bookWithDeletedFalse = {
  _id: "3j2oiujt1rhui4grioweg",
  deleted: false
};

const bookWithDeletedTrue = {
  _id: "3j2oiujt1rhui4grioweg",
  deleted: true
};

const bookWithDeletedRemoved = {
  _id: "3j2oiujt1rhui4grioweg"
};

const updatedMockBookId = "3j2oiujt1rhui4grioweg";

describe("Services", () => {
  // We set the mock specifically for each test because Mongoose doesn't allow for the Model to be mocked separately by Jest https://github.com/facebook/jest/issues/3073
  beforeEach(() => {
    jest.resetModules();
  });

  describe("createBook service", () => {
    it("Book Model.create is called with a passed Book", async () => {
      const mockModelCreate = jest.fn(() => Promise.resolve(mockBook));
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

    it("Given the createBook service is called, with a book object that contains the deleted property, then the response should not include the deleted property", async () => {
      const mockModelCreate = jest.fn(() =>
        Promise.resolve(bookWithDeletedFalse)
      );
      jest.setMock("../models/book", {
        create: mockModelCreate
      });
      const bookService = require("./services");

      const createdBook = await bookService.createBook(bookWithDeletedFalse);

      expect(createdBook).toEqual(bookWithDeletedRemoved);
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

    it("Given the findById service is called, then service should return a response that excludes the deleted property", async () => {
      const mockModelFindById = jest.fn(() =>
        Promise.resolve(bookWithDeletedFalse)
      );
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      const foundBook = await bookService.findBookById("3j2oiujt1rhui4grioweg");

      expect(foundBook).toMatchObject(bookWithDeletedRemoved);
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

    it("Given a book has been deleted, when the findByID service is called with this deleted book ID, then a null is returned", async () => {
      const mockModelFindById = jest.fn(() =>
        Promise.resolve(bookWithDeletedTrue)
      );
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      const returnedBook = await bookService.findBookById(
        bookWithDeletedTrue._id
      );

      expect(returnedBook).toEqual(null);
    });
  });

  describe("updateBook service", () => {
    it("Given the updateBook service is called with a passed book then the findById is called", async () => {
      const mockFindById = jest.fn(() => Promise.resolve(updatedMockBook));
      const mockFindByIdAndUpdate = jest.fn(() =>
        Promise.resolve(updatedMockBook)
      );

      jest.setMock("../models/book", {
        findById: mockFindById,
        findByIdAndUpdate: mockFindByIdAndUpdate
      });
      const bookService = require("./services");

      await bookService.updateBook(updatedMockBookId, updatedMockBook);

      expect(mockFindById).toHaveBeenCalledWith(updatedMockBookId);
    });

    it("When updateBook service is called with a book, then service returns an updated book excluding the deleted parameter", async () => {
      const mockBookWithDelete = {
        _id: "3j2oiujt1rhui4grioweg",
        title: "my title",
        deleted: false
      };
      const mockBookWithUpdatedID = {
        _id: "3j2oiujt1rhui4grioweg",
        title: "updated title",
        deleted: false
      };

      const updatedMockBookWithoutDeleted = {
        _id: "3j2oiujt1rhui4grioweg",
        title: "updated title"
      };

      const mockFindById = jest.fn(() => Promise.resolve(mockBookWithDelete));
      const mockFindByIdAndUpdate = jest.fn(() =>
        Promise.resolve(mockBookWithUpdatedID)
      );

      jest.setMock("../models/book", {
        findById: mockFindById,
        findByIdAndUpdate: mockFindByIdAndUpdate
      });
      const bookService = require("./services");

      const updatedBook = await bookService.updateBook(
        mockBook._id,
        updatedMockBook
      );

      expect(updatedBook).toEqual(updatedMockBookWithoutDeleted);
    });

    it("When an updateBook is called with an invalid Id, then service throws a CastError", async () => {
      expect.assertions(1);

      mockModelUpdateRejectOnFind("CastError");
      const bookService = require("./services");

      try {
        await bookService.updateBook("random", updatedMockBook);
      } catch (err) {
        expect(err.message).toBe("INVALID_ID");
      }
    });

    it("When updateBook is called with an invalid Id, then service throws a generic error", async () => {
      expect.assertions(1);

      mockModelUpdateRejectOnFind("Generic error");
      const bookService = require("./services");

      try {
        await bookService.updateBook("anything", updatedMockBook);
      } catch (err) {
        expect(err.message).toBe("GENERIC_ERROR");
      }
    });

    it("Given a book has been deleted, when the updateBook is called with this deleted book, then a null is returned", async () => {
      const mockModelFindById = jest.fn(() =>
        Promise.resolve(bookWithDeletedTrue)
      );
      jest.setMock("../models/book", {
        findById: mockModelFindById
      });
      const bookService = require("./services");

      const returnedBook = await bookService.updateBook(
        bookWithDeletedTrue._id,
        bookWithDeletedTrue
      );

      expect(returnedBook).toEqual(null);
    });
  });

  describe("delete service", () => {
    it("Given the delete service is called with a book id, then the findByIdAndUpdate function is called with the given id.", async () => {
      const mockFindByIdAndUpdate = jest.fn(() => Promise.resolve(mockBook));
      jest.setMock("../models/book", {
        findByIdAndUpdate: mockFindByIdAndUpdate
      });
      const bookService = require("./services");

      await bookService.deleteBook(updatedMockBookId);

      expect(mockFindByIdAndUpdate).toBeCalledWith(
        updatedMockBookId,
        { deleted: true },
        { new: true }
      );
    });

    it("Given the delete service is called with a book id, then it returns the deleted book message.", async () => {
      const bookService = mockModelUpdateResolveWith(bookWithDeletedTrue);

      const deletedBook = await bookService.deleteBook(
        bookWithDeletedFalse._id
      );

      expect(deletedBook).toEqual(bookWithDeletedTrue);
    });

    it("Given the delete service is called with an incorrect book id, then it throws a CastError.", async () => {
      expect.assertions(1);

      mockModelUpdateRejectWith("CastError");
      const bookService = require("./services");

      try {
        await bookService.deleteBook("anything");
      } catch (err) {
        expect(err.message).toBe("INVALID_ID");
      }
    });

    it("When mongoose throws any other type of error when trying to delete a book, then the service throws a generic error", async () => {
      expect.assertions(1);

      mockModelUpdateRejectWith("Generic error");
      const bookService = require("./services");

      try {
        await bookService.deleteBook("anything");
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
      findById: jest.fn(() => Promise.resolve(updatedMockBook)),
      findByIdAndUpdate: jest.fn(() => Promise.resolve(updatedMockBook))
    });
    return require("./services");
  };

  const mockModelUpdateRejectOnFind = (name, message) => {
    const error = new Error();
    error.name = name;
    error.message = message;

    jest.setMock("../models/book", {
      findById: jest.fn(() => Promise.reject(error))
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
