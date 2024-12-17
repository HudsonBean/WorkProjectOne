/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const router = express.Router();

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
