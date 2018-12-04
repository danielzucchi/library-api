const Book = require("../models/book");

const testHelper = {
  insertBookInDB: async book => {
    const createdBook = await Book.create(book);
    return createdBook._id;
  },

  deleteBooksByIDs: function(bookList) {
    Book.deleteMany({ _id: { $in: bookList } }).exec();
  },

  getNonDeletedBooksFromDB: function() {
    return Book.find({ deleted: false }).exec();
  }
};
module.exports = testHelper;
