/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import multer from "multer";

/**========================================================================
 *                           CONFIGURATION
 *========================================================================**/
// Multer middleware for profile picture upload | HBD 01/15/2025
const storage = multer.diskStorage({
  // Destination for the file upload
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the 'uploads/' directory
  },

  // Filename setup
  filename: function (req, file, cb) {
    // Generate a unique filename using the field name and timestamp
    cb(null, file.fieldname + path.extname(file.originalname)); // e.g. 'profilePicture-1630000000000.jpg'
  },
});

// File validation (allowed image types)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Allow PNG, JPG, and SVG
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
  const mimetype = filetypes.test(file.mimetype); // Check MIME type

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    return cb(
      new Error("Only image files (JPG, PNG, SVG) are allowed!"),
      false
    ); // Reject the file
  }
};

// Multer configuration
const upload = multer({
  storage: storage, // Use the custom storage configuration
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB file size
  fileFilter: fileFilter, // Apply the file validation
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
