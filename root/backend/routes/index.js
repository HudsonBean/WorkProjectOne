/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const router = express.Router();
import apiDevPost from "./apiDevPost.js";

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
    res.status(200).json({ message: "Hello World!" });
  });

  router.post("/api/dev-post", apiDevPost, (req, res) => {
    res.status(200).json({ message: "Post route hit!" });
  });

  /**======================
   *    MOUNT ROUTES
   *========================**/
  app.use("/", router);
};

export default injectRoute;
