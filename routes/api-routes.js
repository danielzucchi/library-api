const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const services = require("../services/services");

router.get("/findBookById/:id", async (req, res) => {
  const foundBook = await services.findBookById(req.params.id);
  res.send(foundBook);
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

module.exports = router;
