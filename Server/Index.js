/// Global Variables
// Imports
const express = require("express");
const expressFlash = require("express-flash");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const passportLocal = require("passport-local");

// Start Express Server
const app = express();
app.listen(process.env.PORT, () => {
  console.log(
    colors.blue.italic("Server is open on:\n") +
      colors.blue.bgBlack.bold.underline(
        `http://localhost:${process.env.PORT}/`
      )
  );
});

// Start mongodb
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log(
    colors.yellow(
      "Database is open on:\n" +
        colors.bold.bgBlack.yellow.underline(process.env.DATABASE_URL)
    )
  );
});
