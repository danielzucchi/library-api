const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const service = require("../services/services");



router.post("/books-library/books", function (req, res) {
    let book = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        available: true,
        language: req.body.language
    };
    service.save(book);
    res.json(book);
});

router.get("/books-library/books", async function (req, res) {
    let books = await service.findAll();
    res.json(books);
});

router.get("/books-library/books/:title", async function (req, res) {
    let books = await service.findByTitle(req.params.title);
    res.json(books);
});

router.delete("/books-library/books/:title", async function (req, res) {
    service.delete(req.params.title);
    res.sendStatus(200);
});



module.exports = router;
