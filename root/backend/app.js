/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const connectDB = require("./config/db");
const loadMiddleware = require("./middleware");
const loadRoutes = require("./routes");

const app = express();

const init = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully!");

    // Load middlewares
    loadMiddleware(app);

    // Load routes
    loadRoutes(app);

    console.log("Middlewares and routes loaded!");
  } catch (err) {
    console.error("Error initializing app:", err);
    process.exit(1); // Exit the process if initialization fails
  }
};

module.exports = { app, init };
