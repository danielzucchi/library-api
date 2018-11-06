const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const service = require("../services/services");

router.post("/books-library/books", function (req, res) {
  let book = new Book({
    title: req.body.book.title,
    author: req.body.book.author,
    copyrightYear: req.body.book.copyrightYear,
    about: req.body.book.about,
    publisher: req.body.book.publisher,
    available: true,
    genre: req.body.book.genre
  });
  
  try {
    service.save(book);
  } catch(error) {
    console.error(error);
  }
  res.send(book);
});

module.exports = router;
