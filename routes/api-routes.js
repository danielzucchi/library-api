const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const services = require("../services/services");

// example route
router.get("/books-library/books", (req, res) => {
  // console.log("This works");
  // res.sendStatus(200);
  const book = services.findByName();
  res.send(book);
});

// router.get("/books-library/books/:book", (req, res) => {
//   const book = services.findByName();
//   res.send(book);
// });

module.exports = router;
