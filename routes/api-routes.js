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

router.get("/library/books/:id", (req, res) => {
    services
        .findBookById(req.params.id)
        .then(foundBook => {
            if (!foundBook) {
                return res.status(404).send("Book not found.");
            }
            res.status(200).send(foundBook);
        })
        .catch(() => {
            res.status(500).send("Something went wrong.");
        });
});

module.exports = router;
