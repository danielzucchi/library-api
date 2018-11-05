const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/library");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  copyrightYear: Number,
  about: String,
  publisher: String,
  available: Boolean,
  genre: String
});

const Boook = mongoose.model("Book", bookSchema);

module.exports = Book;
