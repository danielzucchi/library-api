const Book = require("../models/book");
const mongoose = require("mongoose");


module.exports = {
    save: function(book) {
        book.save(function(err) {
          if (err) throw err;
          console.log('User saved successfully!');
        });
        return book;
      },

    delete: function(title) {
        Book.find({ "title": title }).deleteOne().exec();
        console.log("Book successfully Deleted");
      }
};
