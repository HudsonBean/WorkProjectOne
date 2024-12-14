/**============================================
 *               IMPORTS
 *=============================================**/
const mongoose = require("mongoose");

/**=======================
 * *       User Schema
 *========================**/
const userSchema = new mongoose.Schema({
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

  /**=======================
   * todo      Create Payment Info Stuff
   * todo      Make Sure to Update the Register Function
   * todo      Add 2FA And Implement It In The Main as well as 2FA Prompt Count
   *========================**/

  // Security
  loginAttempts: { type: Number, default: 0 }, // Keep track of login attempts
  lockUntil: { type: Date }, // Lock the login until implement later
  twoFactorAuth: { type: Boolean },
  twoFactorAuthPrompt: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
