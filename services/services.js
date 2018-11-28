const Book = require("../models/book");

const bookService = {
  createBook: function(book) {
    return Book.create(book)
      .then(createdBook => createdBook)
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
      .then(foundBook => foundBook)
      .catch(err => {
        if (err.name == "CastError") {
          throw new Error("INVALID_ID");
        } else {
          throw new Error("GENERIC_ERROR");
        }
      });
  },

  updateBook: function(bookId, book) {
    const { _id, ...bookWithoutID } = book;
    return Book.findByIdAndUpdate(bookId, bookWithoutID, { new: true })
      .then(updatedBook => updatedBook)
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
