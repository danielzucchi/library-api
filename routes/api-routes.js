const express = require("express");
const router = express.Router();

const services = require("../services/services");

const validateBook = book => {
  if (!book.isbn) {
    return "ISBN is required.";
  }
  if (!book.title) {
    return "Title is required.";
  }
  if (!book.author) {
    return "Author is required.";
  }
  if (!book.edition) {
    return "Edition is required.";
  }
  if (!book.numOfCopies) {
    return "Number of copies is required.";
  }
  if (!book.active) {
    return "Active property is required.";
  }
};

router.post("/library/books", (req, res) => {
  const validationResult = validateBook(req.body);
  if (validationResult) {
    return res.status(412).send(validationResult);
  }

  services.createBook(req.body).then(createdBook => {
    res.status(201).send(createdBook);
  });
});

module.exports = router;
