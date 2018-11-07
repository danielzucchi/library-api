var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://root:password@localhost:27017/library?authSource=admin', { useNewUrlParser: true });

var bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: String,
    available: Boolean,
    language: String
});

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
