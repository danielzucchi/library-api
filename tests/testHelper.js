const Book = require("../models/book");

const testHelper = {
  createBook: async book => {
    const createdBook = await Book.create(book);
    return createdBook._id;
  },

  deleteBooksByIDs: function(bookList) {
    Book.deleteMany({ _id: { $in: bookList } }).exec();
  }
};
module.exports = testHelper;
