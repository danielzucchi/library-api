const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

const apiRoutes = require("./routes/api-routes");

server.use(apiRoutes);

// mongoose.connect(
//   "mongodb://localhost/library",
//   { useNewUrlParser: true }
// );

mongoose.connect(
  "mongodb://root:password@localhost:27017/library?authSource=admin",
  { useNewUrlParser: true }
);

server.listen(3000, () => {
  console.log("Server in session.");
});

module.exports = server;
