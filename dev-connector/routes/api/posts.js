const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const Post = require("../../models/Post");

// Load Validations
const validatePostInput = require("../../validation/post");

// route  - GET api/posts/test
// desc   - test post route
// access - public
router.get("/test", (req, res) => {
  res.json({ msg: "Post route works" });
});

// route  - GET api/posts
// desc   - Get posts
// access - Public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// route  - POST api/posts
// desc   - Create post
// access - Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(404).json({ invalid: "Post could not be created" });
      });
  }
);

module.exports = router;
