const Book = require("../models/book");

const bookService = {
  createBook: function(book) {
    return Book.create(book)
      .then(createdBook => {
        let bookToReturn = createdBook.toObject();
        delete bookToReturn.deleted;
        return bookToReturn;
      })
      .catch(err => {
        if (err.name == "ValidationError") {
          throw new Error(err.message);
        } else {
          throw new Error("Generic error");
        }
      });
  },

  findBookById: function(id) {
    return Book.findById(id)
      .then(foundBook => {
        if (!foundBook || foundBook.deleted) {
          return null;
        }
        let bookToReturn = foundBook.toObject();
        delete bookToReturn.deleted;
        return bookToReturn;
      })
      .catch(err => {
        if (err.name == "CastError") {
          throw new Error("INVALID_ID");
        } else {
          throw new Error("GENERIC_ERROR");
        }
      });
  },

  updateBook: function(bookId, book) {
    return Book.findById(bookId)
      .then(returnedBook => {
        if (returnedBook.deleted) {
          return null;
        } else {
          delete book.id;
          return Book.findByIdAndUpdate(bookId, book, {
            new: true
          }).then(updatedBook => {
            let bookToReturn = updatedBook.toObject();
            delete bookToReturn.deleted;
            return bookToReturn;
          });
        }
      })
      .catch(err => {
        if (err.name == "CastError") {
          throw new Error("INVALID_ID");
        } else {
          throw new Error("GENERIC_ERROR");
        }
      });
  },

  deleteBook: function(bookId) {
    return Book.findByIdAndUpdate(bookId, { deleted: true }, { new: true })
      .then(deletedBook => deletedBook)
      .catch(err => {
        if (err.name == "CastError") {
          throw new Error("INVALID_ID");
        } else {
          throw new Error("GENERIC_ERROR");
        }
      });
  }
};

module.exports = bookService;
