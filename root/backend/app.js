/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import colorsTheme from "./config/colors.js";
import connectDB from "./config/database.js";
import injectMiddleware from "./middlewares/index.js";
import injectRoute from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

/**======================
 *    INIT
 *========================**/
/**
 * Creates the app instance;
 * The init function injects the app with the middleware routes, and initializes the database connection.
 */
const app = express();
const init = async () => {
  try {
    // initialize the database connection.
    await connectDB(process.env.DATABASE_URI);

    // Inject middlewares
    await injectMiddleware(app);

    // Inject routes
    await injectRoute(app);

    return app;
  } catch (error) {
    console.error(`Error: ${error.message}`.failure);
    process.exit(1);
  }
};

export { app, init };
