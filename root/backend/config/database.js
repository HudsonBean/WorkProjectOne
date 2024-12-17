/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import mongoose from "mongoose";
import colorsTheme from "./colors.js";

/**======================
 *    DATABASE
 *========================**/
/**
 * Connects to the MongoDB database.
 * @param {String} databaseURI
 */
const connectDB = async (databaseURI) => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`Database is connected on ${process.env.DATABASE_URI}`.info);
  } catch (error) {
    console.error(
      `There was an error connecting to the database: ${error.message}`.failure
    );
    process.exit(1);
  }
};

export default connectDB;
