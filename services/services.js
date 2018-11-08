const Book = require("../models/book");

module.exports = {
  findBookById: id => {
    return Book.findById(id)
      .then(foundBook => {
        return foundBook;
      })
      .catch(err => {
        throw new Error("The Book Id requested is invalid.");
      });
  }
};
