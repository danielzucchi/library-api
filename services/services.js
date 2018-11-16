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
  }
};

module.exports = bookService;
