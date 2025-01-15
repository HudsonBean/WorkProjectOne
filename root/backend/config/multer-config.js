/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import multer from "multer";

/**========================================================================
 *                           CONFIGURATION
 *========================================================================**/
// Multer middleware for profile picture upload | HBD 01/15/2025
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
// Configure multer for profile picture upload | HBD 01/15/2025
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

/**
 * Handle profile picture upload | HBD 01/15/2025
 * @param {Object} req
 * @returns {Promise<string>}
 */
const handleProfilePictureUpload = async (req) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return null; // No file uploaded
    }

    // Return the uploaded file's path
    return `/uploads/${req.file.filename}`;
  } catch (error) {
    console.error(`Error handling profile picture: ${error.message}`);
    throw new Error("Error saving profile picture");
  }
};

export { upload, handleProfilePictureUpload };
