// MongoDB
const mongoose = require("mongoose");

// Schema
const encryptedSchema = new mongoose.Schema(
  {
    encryptedData: { type: String },
    iv: { type: String },
  },
  { _id: false }
);

module.exports = encryptedSchema;
