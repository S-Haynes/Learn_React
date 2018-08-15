const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

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
      res.status(404).json({ invalid: "No posts were found" });
    });
});

// route  - GET api/posts/:id
// desc   - Get post by id
// access - Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(404).json({ invalid: "No post found with that ID" });
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

// route  - DELETE api/posts/:id
// desc   - Delete post
// access - Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (!post.user.equals(req.user.id)) {
              return res
                .status(401)
                .json({ authorization: "Unauthorized delete declined" });
            }
            post
              .remove()
              .then(() => {
                res.status(200).json({ deleted: "Post successfully deleted" });
              })
              .catch(err =>
                res.status(400).json({ invalid: "Post could not be deleted" })
              );
          })
          .catch(err =>
            res.status(404).json({ invalid: "No post found with that ID" })
          );
      })
      .catch(err =>
        res.status(404).json({ noprofile: "No profile found with that ID" })
      );
  }
);

// route  - POST api/posts/like/:post_id
// desc   - Add like to post
// access - Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.equals(req.user.id)).length >
              0
            ) {
              return res
                .status(400)
                .json({ invalid: "User already liked this post" });
            }

            post.likes.unshift({ user: req.user.id });

            post.save().then(post => {
              res.status(200).json(post);
            });
          })
          .catch(err =>
            res.status(404).json({ invalid: "No post found with that ID" })
          );
      })
      .catch(err =>
        res.status(404).json({ noprofile: "No profile found with that ID" })
      );
  }
);

// route  - DELETE api/posts/unlike/:post_id
// desc   - Remove like from post
// access - Private
router.delete(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.equals(req.user.id))
                .length === 0
            ) {
              return res
                .status(400)
                .json({ invalid: "User hasn't liked this post" });
            }

            // Find index of like to remove
            removeIndex = post.likes.findIndex(like => {
              return like.user.equals(req.user.id);
            });

            // Splice the likes array
            post.likes.splice(removeIndex, 1);

            // Save post
            post.save().then(post => {
              res.status(200).json(post);
            });
          })
          .catch(err =>
            res.status(404).json({ invalid: "No post found with that ID" })
          );
      })
      .catch(err =>
        res.status(404).json({ noprofile: "No profile found with that ID" })
      );
  }
);

// route  - POST api/posts/comment/:post_id
// desc   - Add comment to post
// access - Private

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Initialize Validation Check
    const { errors, isValid } = validatePostInput(req.body);

    // Check if input is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        post.save().then(post => res.status(200).json(post));
      })
      .catch(err => {
        res.status(404).json({ invalid: "No post found with that ID" });
      });
  }
);

// route  - DELETE api/posts/comment/:post_id/:comment_id
// desc   - Remove comment from post
// access - Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.comments.filter(comment => {
            return comment._id.equals(req.params.comment_id);
          }).length === 0
        ) {
          return res.status(404).json({ invalid: "Comment does not exist" });
        }

        // Find index of comment
        const removeIndex = post.comments.findIndex(comment => {
          return comment._id.equals(req.params.comment_id);
        });

        // Check ownership of comment
        if (!post.comments[removeIndex].user.equals(req.user.id)) {
          return res
            .status(400)
            .json({ unauthorized: "Unauthorized user declined" });
        }

        // Splice comments array
        post.comments.splice(removeIndex, 1);

        // Save post
        post.save().then(post => {
          res.json(post);
        });
      })
      .catch(err => {
        res.status(404).json({ invalid: "No post found with that ID" });
      });
  }
);

module.exports = router;
