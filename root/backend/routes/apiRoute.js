/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const router = express.Router();
import { fileURLToPath } from "url";
import path from "path";
/**======================
 *    MIDDLEWARES
 *========================**/
import ensureAuthenticated from "../middlewares/isAuthenticated.js";

const apiRoute = () => {
  /**======================
   *    ENDPOINTS
   *========================**/
  // Dev endpoints
  router.get("/dev-get", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });

  router.post("/dev-post", apiDevPostMiddleware, (req, res) => {
    res
      .status(200)
      .json({ message: "Post route hit! Message: " + req.reversedMessage });
  });

  // Endpoint to serve static pictures | HBD 01/15/2025
  router.get("/uploads/:filename", (req, res) => {
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "../uploads",
      req.params.filename
    );

    // Serve the file if it exists
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error serving file:", err);
        res.status(404).json({ message: "File not found" });
      }
    });
  });

  return router;
};

/**======================
 *    ENDPOINT MIDDLEWARES
 *========================**/
const apiDevPostMiddleware = (req, res, next) => {
  const str = req.body.message;
  const newStr = str.split("").reverse().join("");
  req.reversedMessage = newStr;
  next();
};

export default apiRoute;
