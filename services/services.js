const Book = require("../models/book");

module.exports = {
  findBookById: id => {
    return Book.findById(id)
      .then(foundBook => {
        return foundBook;
      })
      .catch(err => {
        if (err.name == "CastError") {
          throw new Error("The Book Id requested is invalid.");
        }
        if (err.name == "MongoError") {
          throw new Error("Failed to connect to the DB.");
        }
      });
  }
};
