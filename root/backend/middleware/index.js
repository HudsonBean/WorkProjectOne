/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import compression from "compression";
import rateLimit from "express-rate-limit";
import colorsTheme from "../config/colors.js";

/**======================
 *    INJECT MIDDLEWARES
 *========================**/
/**
 * Injects middlewares into the app instance.
 * @param {Object} app
 */
const injectMiddleware = (app) => {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
        httpOnly: true, // Prevent client-side JavaScript from accessing cookies
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  //   error handling middleware
  app.use((error, req, res, next) => {
    console.error(`Error: ${error.message}`.failure);
    res.status(500).json({ message: "Server error" });
  });
};

export default injectMiddleware;
