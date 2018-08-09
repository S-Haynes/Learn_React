const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");

const userRoutes = require("./routes/api/users");
const postRoutes = require("./routes/api/posts");
const profileRoutes = require("./routes/api/profile");

// initialize app
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// establish mongoDB connection
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

// use routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

// define port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on port " + port);
});
