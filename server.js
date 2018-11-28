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

// To connect to local database, uncomment this:
mongoose.connect(
  "mongodb://localhost/library",
  { useNewUrlParser: true }
);

// To connect to a database running on a Docker container, uncomment this:
// mongoose.connect(
//   "mongodb://root:password@localhost:27017/library?authSource=admin",
//   { useNewUrlParser: true }
// );

server.listen(3000, () => {
  console.log("Server in session.");
});

module.exports = server;
