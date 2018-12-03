const express = require("express");
const router = express.Router();
const httpStatus = require("http-status-codes");
const services = require("../services/services");
const Validator = require("jsonschema").Validator;
const v = new Validator();

const schema = {
  id: "/Book",
  type: "object",
  properties: {
    isbn: { type: "string", required: true },
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    edition: { type: "number", required: true },
    numOfCopies: { type: "number", required: true },
    active: { type: "boolean", required: true }
  }
};

const validateAgainstBookSchema = body => {
  const val = v.validate(body, schema);

  return val.errors.map(error => {
    let index = error.stack.indexOf(".");
    return error.stack.substring(index + 1);
  });
};

router.post("/library/books", (req, res) => {
  const validationResult = validateAgainstBookSchema(req.body);
  if (validationResult.length > 0) {
    return res.status(httpStatus.PRECONDITION_FAILED).send(validationResult);
  }

  services
    .createBook(req.body)
    .then(createdBook => {
      res.status(httpStatus.CREATED).send(createdBook);
    })
    .catch(err => {
      if (err.name == "ValidationError") {
        res.status(httpStatus.BAD_REQUEST).send(err.message);
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send("Something went wrong");
      }
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

router.put("/library/books/:id", (req, res) => {
  const validationResult = validateAgainstBookSchema(req.body);
  if (validationResult.length > 0) {
    return res.status(httpStatus.PRECONDITION_FAILED).send(validationResult);
  }

  services
    .updateBook(req.params.id, req.body)
    .then(updatedBook => {
      if (!updatedBook) {
        res.status(httpStatus.NOT_FOUND).send("Book not found.");
      } else {
        res.status(httpStatus.OK).send(updatedBook);
      }
    })
    .catch(err => {
      if (err.name == "CastError") {
        res.status(httpStatus.BAD_REQUEST).send("INVALID_ID");
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send("Something went wrong.");
      }
    });
});

module.exports = router;
