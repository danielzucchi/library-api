const Book = require("../models/book");
const mongoose = require("mongoose");

module.exports = {
  findBookById: id => {
    return Book.find({ _id: id }).exec();
  },

  save: function(book) {
    book.save(function(err) {
      if (err) throw err;
      console.log("Book saved successfully!");
    });
    return book;
  },

  delete: function(title) {
    Book.find({ title: title })
      .deleteOne()
      .exec();
    console.log("Book successfully Deleted");
  }
};
