const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const services = require("../services/services");

router.get("/findBookById/:id", (req, res) => {
  const bookId = services.findBookById();
  res.send(bookId);
});

module.exports = router;
