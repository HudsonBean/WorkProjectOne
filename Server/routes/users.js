// Express
const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Getting all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting one
router.get("/:id", getUser, async (req, res) => {
  res.send(res.user.firstName);
});
// Creating one
router.post("/", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    emailAdress: req.body.emailAdress,
    password: req.body.password,
    // Not required
    profilePicture: req.body.firstName,
    phoneNumber: req.body.phoneNumber,
    billingInfo: req.body.billingInfo, // Implement later
    websites: req.body.websites, // Implement later
    activePlan: req.body.activePlan,
    accountCreationDate: req.body.accountCreationDate,
    preferences: req.body.preferences,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating one
// Removing one

// Middleware
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
