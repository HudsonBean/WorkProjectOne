/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import apiRoute from "./apiRoute.js";
import passport from "passport";
import { upload, handleProfilePictureUpload } from "../config/multer-config.js";

const router = express.Router();

/**======================
 *    UTILITIES
 *========================**/
import bcrypt from "bcrypt";

/**======================
 *    MODELS
 *========================**/
import User from "../models/user.js";
/**============================================
 *               INJECT ROUTES
 *=============================================**/
/**
 * Inject the routes into the app instance.
 * @param {Object} app
 */
const injectRoute = (app) => {
  /**======================
   *    ENDPOINTS
   *========================**/
  // Register
  app.post("/register", upload.single("profilePicture"), async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Save profile picture if uploaded | HBD 01/15/2025
      const profilePicture =
        (await handleProfilePictureUpload(req)) ||
        process.env.DEFAULT_PROFILE_PIC;

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicture,
      });
      await newUser.save();
      res.status(200).json("Register successful! Welcome " + firstName);
    } catch (error) {
      console.error(`Error registering user: ${error.message}`);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Login
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({
      message: "Successfully logged in!",
    });
  });

  /**======================
   *    MOUNT ROUTES
   *========================**/
  app.use("/", router);
  app.use("/api", apiRoute());
};

export default injectRoute;
