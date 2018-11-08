const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const services = require("../services/services");

// example route
router.get("/books-library/books", (req, res) => {
  console.log("This works");
  res.sendStatus(200);
});

router.get("/books-library/books/:title", async (req, res) => {
  console.log("req", req.params.title);
  const book = await services.findByName(req.params.title);
  console.log("book", book);
  res.send(book);
});

module.exports = router;
