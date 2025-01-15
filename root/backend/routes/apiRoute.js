/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import express from "express";
const router = express.Router();
import path from "path";
/**======================
 *    MIDDLEWARES
 *========================**/
import { upload, handleProfilePictureUpload } from "../config/multer-config.js";
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

  // Profile picture upload | HBD 01/15/2025
  router.post(
    "/profile-picture",
    ensureAuthenticated,
    upload.single("profilePicture"),
    async (req, res) => {
      try {
        const filePath = await handleProfilePictureUpload(req);

        if (!filePath) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        // Update the user's profile picture in the DB
        await User.findByIdAndUpdate(req.user.id, { profilePicture: filePath });

        res.status(200).json({
          message: "Profile picture uploaded successfully",
          filePath,
        });
      } catch (error) {
        console.error(`Error uploading profile picture: ${error.message}`);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  // Endpoint to serve profile pictures | HBD 01/15/2025
  app.get("/profile-picture/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);

    // Ensure the file exists
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
