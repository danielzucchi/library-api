const Book = require('../models/book');

const bookService = {
    save: function(book) {
        return Book.create(book);
    },

    findAll: function() {
        return Book.find({}).limit(100).exec();
    },

    findByTitle: function(title) {
        return Book.find({"title": title}).limit(100).exec();
    },

    delete: function(title) {
        let book = Book.find({ "title": title }).deleteOne().exec();
        console.log("Book successfully Deleted");
    }
};

module.exports = bookService;
