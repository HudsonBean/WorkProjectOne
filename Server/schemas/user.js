// MongoDB
const mongoose = require("mongoose");

// Schema
const usersSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Not required
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    required: true,
    default: "user",
  },
  profilePicture: {
    // Implement later
    type: String,
    default: "default-pic-url",
  },
  phoneNumber: {
    type: String,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  preferences: {
    language: {
      type: String,
      default: "en",
    },
  },

  // Security
  loginAttempts: { type: Number, default: 0 }, // Keep track of login attempts
  lockUntil: { type: Date }, // Lock the login until implement later
});

module.exports = mongoose.model("User", usersSchema);
