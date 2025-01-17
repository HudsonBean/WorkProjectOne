/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import apiRoute from "./apiRoute.js";
import passport from "passport";
import upload from "../config/multer-config.js";

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
  // Register Route
  app.post("/register", upload.single("file"), async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create the new user in the database
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // await newUser.save(); // Save user to DB | HBD 01/16/2025

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
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
