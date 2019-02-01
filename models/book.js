const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  edition: { type: Number, required: true },
  numOfCopies: { type: Number, required: true },
  about: String,
  numOfPages: Number,
  illustrator: String,
  copyrightYear: Number,
  editor: String,
  genre: String,
  publisher: String,
  coverImage: String,
  deleted: { type: Boolean, default: false }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
