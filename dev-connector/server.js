const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./keys/keys");

// initialize app
const app = express();

//establish mongoDB connection
const db = keys.mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(res => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

// test route
app.get("/", (req, res) => {
  res.send("hello");
});

// define port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on port " + port);
});
