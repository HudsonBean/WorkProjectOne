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
  app.get("/register", async (req, res) => {
    res.status(100).json({ message: "register endpoint hit" });
  });

  // Login
  app.get("/login", passport.authenticate("local"), (req, res) => {
    res.status(100).json({ message: "login endpoint hit" });
  });

  /**======================
   *    MOUNT ROUTES
   *========================**/
  app.use("/", router);
  app.use("/api", apiRoute());
};

export default injectRoute;
