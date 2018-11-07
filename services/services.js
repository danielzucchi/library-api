const Book = require("../models/book");

module.exports = {
  findBookById: id => {
    return Book.findOne({ _id: id }).exec();
  }
};
