const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  copyrightYear: Number,
  about: String,
  publisher: String,
  available: Boolean,
  genre: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
