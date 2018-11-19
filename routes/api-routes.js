const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");
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
    return res.status(httpStatus.PRECONDITION_FAILED).send(validationResult);
  }

  services.createBook(req.body).then(createdBook => {
    res.status(httpStatus.CREATED).send(createdBook);
  });
});

router.get("/library/books/:id", (req, res) => {
  services
    .findBookById(req.params.id)
    .then(foundBook => {
      if (!foundBook) {
        return res.status(httpStatus.NOT_FOUND).send("Book not found.");
      }
      res.status(httpStatus.OK).send(foundBook);
    })
    .catch(err => {
      if (err.message == "INVALID_ID") {
        res.status(httpStatus.BAD_REQUEST).send("Invalid ID.");
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send("Something went wrong.");
      }
    });
});

module.exports = router;
