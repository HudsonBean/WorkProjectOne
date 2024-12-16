/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import colorsTheme from "./utils/colors";
//todo  Convert to imports
// const connectDB = require("./config/db");
// const loadMiddleware = require("./middleware");
// const loadRoutes = require("./routes");

const app = express();

const init = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully!".success);

    // Load middlewares
    injectMiddleware(app);

    // Load routes
    injectRoutes(app);

    console.log(
      colors.green.underline.bold("Middlewares and routes loaded!".success)
    );
  } catch (err) {
    console.error("Error initializing app:", err);
    process.exit(1); // Exit the process if initialization fails
  }
};

module.exports = { app, init };
