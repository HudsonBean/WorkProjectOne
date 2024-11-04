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
