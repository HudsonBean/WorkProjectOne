/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
/**========================================================================
 *                           CONFIGURATION
 *========================================================================**/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "../uploads",
      req.params.filename
    );
    cb(null, filePath); // Directory to save files
  },
  filename: function (req, file, cb) {
    console.log("Test2");
    if (req.isAuthenticated()) {
      // Request comes normally | HBD 01/16/2025
      cb(
        null,
        "profile-picture-" + req.user.email + path.extname(file.originalname)
      ); // Unique filename with extension
    } else {
      // Request comes from Register | HBD 01/16/2025
      const { email } = req.body;
      cb(null, "profile-picture-" + email + path.extname(file.originalname)); // Unique filename with extension
    }
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Allow PNG, JPG, and SVG
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = filetypes.test(file.mimetype); // Check MIME type

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    return cb(new Error("Only image files (JPG, PNG) are allowed!"), false); // Reject the file
  }
};

// Create multer instance with storage config | HBD 01/15/2025
const upload = multer({
  storage: storage, // Use the custom storage configuration
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB file size
  fileFilter: fileFilter, // Apply the file validation
});

// Export an object containing both functions as default export
export default upload;
