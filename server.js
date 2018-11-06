const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const Book = require("./models/book");
const apiRoutes = require("./routes/api-routes");
const services = require("./services/services");

app.use(apiRoutes);

mongoose.connect(
  "mongodb://localhost/library",
  { useNewUrlParser: true }
);

app.listen(3000, () => {
  console.log("Server in session.");
});

module.exports = app;
