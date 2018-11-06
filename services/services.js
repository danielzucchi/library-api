const Book = require("../models/book");

module.exports = {
  findBookById: (req, res) => {
    Book.findById({ id: req.params._id }).exec();
  }
};
