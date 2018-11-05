const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const services = require("../services/services");

// example route
router.get("/books-library/books", (req, res) => {
  console.log("This works");
  res.sendStatus(200);
});



module.exports = router;
