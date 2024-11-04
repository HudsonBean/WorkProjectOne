// Global Variables
const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passport = require("passport");

// Models
const User = require("../models/users");

// Express Router
const router = express.Router();

// Get all users NO PAGE DATA
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get user by id PAGE DATA
router.get("/:id", getUser, async (req, res) => {
  res.send(res.user.firstName);
});
// Update user
// Delete a user
// Test decryption
router.post("/:id/test", getUser, async (req, res) => {
  const user = res.user;
  // Decrypt phoneNumber
  const email = user.email;
  const phoneNumber = await decrypt(
    user.phoneNumber.encryptedData,
    user.phoneNumber.iv
  );
  // Check password
  bcrypt.compare(req.body.myPassword, user.password, (err, response) => {
    res.send(
      "email: " +
        email +
        "\nphoneNumber: " +
        phoneNumber +
        "\nIs password right: " +
        response
    );
  });
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
// Encryption functions
async function encrypt(text) {
  try {
    // Create new IV, decode key from .env file
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(process.env.CRYPT_KEY, "hex");

    // Create encrypted message
    const cipher = crypto.createCipheriv(process.env.CRYPT_ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    // Save iv and encrypted data as hex strings
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  } catch (err) {
    console.error("OOPS!\n" + err.message);
  }
}
async function decrypt(encryptedData, ivHex) {
  try {
    // Decrypt iv and key
    const iv = Buffer.from(ivHex, "hex");
    const key = Buffer.from(process.env.CRYPT_KEY, "hex");

    // Decrypt data
    const decipher = crypto.createDecipheriv(
      process.env.CRYPT_ALGORITHM,
      key,
      iv
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  } catch (err) {
    console.error("OOPS!\n" + err.message);
  }
}

module.exports = router;
