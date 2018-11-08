const Book = require("../models/book");

module.exports = {
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
  }
};
