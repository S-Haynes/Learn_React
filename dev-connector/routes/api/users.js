const express = require("express");
const router = express.Router();

// route  - GET api/users/test
// desc   - test users route
// access - public
router.get("/test", (req, res) => {
  res.json({ msg: "User route works" });
});

module.exports = router;
