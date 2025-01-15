/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import apiRoute from "./apiRoute.js";
import passport from "passport";

const router = express.Router();

/**============================================
 *               INJECT ROUTES
 *=============================================**/
/**
 * Inject the routes into the app instance.
 * @param {Object} app
 */
const injectRoute = (app) => {
  /**======================
   *    DEFAULT ENDPOINTS
   *========================**/
  // Register
  app.post("/register", async (req, res) => {
    res.status(200).json("Register successful! Welcome " + req.body.firstName);
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
