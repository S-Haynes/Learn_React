const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// route  - GET api/profile/test
// desc   - test profile route
// access - public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile route works" });
});

module.exports = router;
