const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://root:password@localhost:27017/library?authSource=admin', { useNewUrlParser: true }, function(err, db) {
      if (err) {
          console.log('Unable to connect to the server. Please start the server. Error:', err);
      } else {
          console.log('Connected to Server successfully!');
      }
  });

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



app.listen(3000, () => {
  console.log("Server in session.");
});

module.exports = app;
