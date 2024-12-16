/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import colorsTheme from "./config/colors.js";
import connectDB from "./config/connect.js";
import injectMiddleware from "./middlewares/index.js";

/**======================
 *    INIT
 *========================**/
/**
 * Creates the app instance;
 * The init function injects the app with the middleware routes, and initializes the database connection.
 */
const app = express();
const init = () => {
  // initialize the database connection.
  connectDB();

  // Inject middlewares
  injectMiddleware(app);

  // Inject routes

  return app;
};

export default init;
