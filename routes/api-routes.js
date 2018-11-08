const express = require("express");
const router = express.Router();
const services = require("../services/services");

router.get("/books/:id", async (req, res) => {
  const foundBook = await services.findBookById(req.params.id);
  res.send(foundBook);
});

module.exports = router;
