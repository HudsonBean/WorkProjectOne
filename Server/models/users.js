// MongoDB
const mongoose = require("mongoose");

// Models
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailAdress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // Can store a URL for the picture after uploading
    default: "Default Profile Picture Path",
  },
  phoneNumber: {
    type: String,
  },
  billingInfo: {
    /// Implement later
    // address: String,
    // lastFourCC: String, // if needed for display
  },
  websites: [
    /// Implement later
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Purchase",
    // },
  ],
  activePlan: {
    /// Implement later
    type: String, // e.g. 'basic', 'pro', 'enterprise'
  },
  accountCreationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  preferences: {
    /// Implement later
    language: {
      type: String,
      required: true,
      default: "en",
    },
  },
});

module.exports = mongoose.model("User", usersSchema);
