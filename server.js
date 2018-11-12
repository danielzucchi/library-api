const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const apiRoutes = require("./routes/api-routes");

app.use(apiRoutes);

mongoose.connect(
  "mongodb://localhost/books",
  { useNewUrlParser: true }
);

app.listen(3000, () => {
  console.log("Server in session.");
});

module.exports = app;
