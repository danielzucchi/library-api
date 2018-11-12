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
  },

  findByName: title => {
    return Book.find({ title: title })
      .then(foundBook => {
        return foundBook;
      })
      .catch(error => {
        if ((error.message = "Topology was destroyed")) {
          throw new Error("Failed to connect to DB.");
        }
      });
  },

  save: function(book) {
    book.save(function(err) {
      if (err) throw err;
      console.log("User saved successfully!");
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
