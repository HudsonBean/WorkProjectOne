/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import mongoose from "mongoose";
import colorsTheme from "./config/colors.js";

/**======================
 *    DATABASE
 *========================**/
/**
 * Connects to the MongoDB database.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Database is connected on ${process.env.DATABASE_URI}`.info);
  } catch (error) {
    console.error(
      `There was an error connecting to the database: ${error.message}`.failure
    );
    process.exit(1);
  }
};

export default connectDB;
