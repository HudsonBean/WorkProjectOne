/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import apiRoute from "./apiRoute.js";

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

  /**======================
   *    MOUNT ROUTES
   *========================**/
  app.use("/", router);
  app.use("/api", apiRoute());
};

export default injectRoute;
