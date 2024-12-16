/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const router = express.Router();
import apiDevPost from "./apiDevPost";

/**============================================
 *               INJECT ROUTES
 *=============================================**/
/**
 * Inject the routes into the app instance.
 * @param {Object} app
 */
const injectRoute = (app) => {
  // Dev routes
  router.get("/api/dev-get", (req, res) => {
    res.json({ message: "Hello World!" });
  });
  router.post("/api/dev-post", apiDevPost, (req, res) => {});
};

export default injectRoute;
