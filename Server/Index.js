/**============================================
 *               IMPORTS
 *=============================================**/
const express = require("express");
const expressFlash = require("express-flash");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const colors = require("colors");
const passport = require("passport");
// const passportLocal = require("passport-local");

/**============================================
 *               START SERVER & BACKEND
 *=============================================**/

/**======================
 *    Start Server
 *========================**/

const app = express();
app.listen(process.env.PORT, () => {
  console.log(
    colors.blue.italic("Server is open on:\n") +
      colors.blue.bgBlack.bold.underline(
        `http://localhost:${process.env.PORT}/`
      )
  );
});

/**======================
 *    Start Database
 *========================**/
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

/**============================================
 *               APP MIDDLEWARE
 *=============================================**/
app.use(express.json()); // Json parsing for incoming payloads
app.use(
  express.urlencoded({
    // Parsing URL-Encoded data typically sent from traditional HTML forms
    extended: false,
  })
);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET, // Session Data
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
); // Express Session Library for Managing Session
app.use(expressFlash());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
// passport
app.use(passport.session());
app.use(passport.initialize());

/**============================================
 *               ROUTES
 *=============================================**/
app.use("/users", require("./routes/users"));

/**============================================
 *               ENDPOINTS
 *=============================================**/

//* Testing endpoint
app.get("/dev", async (req, res) => {
  res.status(202).send("Hello World!");
});

/**=======================
 * *       REGISTER USER
 *
 *
 *========================**/
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
});

/**======================
 *    PASSPORT ENDPOINTS
 *========================**/
