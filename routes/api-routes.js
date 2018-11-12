const express = require("express");
const router = express.Router();
const services = require("../services/services");
const Book = require("../models/book");

router.get("/books/:id", async (req, res) => {
  const foundBook = await services.findBookById(req.params.id);
  res.send(foundBook);
});

router.get("/books-library/books/:title", async (req, res) => {
  console.log("req", req.params.title);
  const book = await services.findByName(req.params.title);
  console.log("book", book);
  res.send(book);
});

router.post("/books-library/books", function(req, res) {
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    copyrightYear: req.body.copyrightYear,
    about: req.body.about,
    publisher: req.body.publisher,
    available: true,
    genre: req.body.genre
  });

  try {
    services.save(book);
  } catch (error) {
    console.error(error);
  }
  res.send(book);
});

router.delete("/books-library/books/:title", (req, res) => {
  services.delete(req.params.title);
  res.send("Book was deleted.");
});

module.exports = router;
