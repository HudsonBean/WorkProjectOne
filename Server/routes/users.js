// Global Variables
const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Get user by id
router.get("/:id", getUser, async (req, res) => {
  res.send(res.user.firstName);
});

// Middlewares
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      res.status(404).json({ message: "Couldn't find the user!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
