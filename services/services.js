const Book = require("../models/book");

module.exports = {
  findBookById: id => {
    return Book.findOne({ _id: id }).exec();
  },

  save: function(book) {
    return book.save();
  },

  delete: function(title) {
    Book.find({ title: title })
      .deleteOne()
      .exec();
    console.log("Book successfully Deleted");
  }
};
